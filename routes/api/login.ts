import { Handlers } from "$fresh/server.ts";
import { setCookie }  from "@std/http";
import { v1 } from "@std/uuid";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url)
    const secret = Deno.env.get("PASSWORD") // FIXME: make it more secure

    const data = await req.formData()
    const password = data.get("password")
    if (password !== secret) {
      return new Response("Invalid password")
    }
    
    const uuid = v1.generate() as string
    const headers = new Headers()
    setCookie(headers, {
      name: "auth",
      value: uuid,
      maxAge: 60*60*24*30,
      httpOnly: true,
      sameSite: "Lax", // 他サイトからうちのサイトにアクセスするときにクッキーをセットするのが Lax 
      domain: url.hostname,
      path: "/", // リクエストを送ったパス以下のパスでのみクッキーを送信する
      secure: true // https のみクッキーを送信する
    })
  
    saveSession(uuid)
    
    headers.append("Location", "/")
    return new Response(null, { status: 302, headers: headers })
  }

}

export const saveSession = async( sessionId: string) => {
  const sessionStore = await Deno.openKv()
  sessionStore.set(["session", sessionId], true, { expireIn: 60*60*20*1000 })
}