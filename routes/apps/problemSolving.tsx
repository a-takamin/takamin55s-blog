import { Handlers } from "$fresh/server.ts";
import { App } from "../../islands/ProblemSolvingApp.tsx";

export const handler: Handlers<string> = {
  GET: function(_req, ctx) {
    return ctx.render("ProblemSolving");
  }
}

export default function ProblemSolvingPage() {
  return (
    <main class="mb-auto">
      <div class="flex flex-col gap-x-12 xl:mb-12 xl:flex-row">
        <div class="max-w-3xl pt-6">
          <h1 class="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Problem Solving App
          </h1>
          <h2>問題解決のためのフレームワークを提供します。</h2>
        </div>
      </div>
      <App />
    </main>
  );
}