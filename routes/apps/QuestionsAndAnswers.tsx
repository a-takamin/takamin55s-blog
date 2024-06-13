
import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { App } from "../../islands/QuestionsAndAnswers.tsx";

export const handler: Handlers = {
  GET: async function(_req, ctx) {
    
    const cookie = getCookies(_req.headers);

    if (!cookie.auth) {
      return new Response(null, { status: 403})
    }
    
    const isInSession = await getSession(cookie.auth)
    if (isInSession) {
      return ctx.render();
    }
      
    const header = new Headers()
    return new Response(null, { status: 403})
  },
}

export default function QuestionsAndAnswers() {
  return (
    <main class="mb-auto">
      <div class="flex flex-col gap-x-12 mb-4 xl:mb-12 xl:flex-row">
        <div class="max-w-3xl pt-6">
          <h1 class="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Questions & Answers App
          </h1>
          <h2>一問一答で学習するアプリです</h2>
        </div>
      </div>
      <App />
    </main>
  );
}

const getSession = async( sessionId: string) => {
  const sessionStore = await Deno.openKv()
  return await sessionStore.get(["session", sessionId])
}