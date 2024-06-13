import { Handlers } from "$fresh/server.ts"
export const handler: Handlers = {
  // デッキの追加
  async POST(req) {
    const deckName = (await req.json()).deckName as string
    const deckStore = await Deno.openKv()
    await deckStore.set(["deck", deckName], [])
    return new Response(deckName, { status: 201 })
  },
  // デッキの削除
  async DELETE(req) {
    const deckName = (await req.json()).deckName as string
    const deckStore = await Deno.openKv()
    await deckStore.delete(["deck", deckName])
    return new Response(null, { status: 204 })
  }
}