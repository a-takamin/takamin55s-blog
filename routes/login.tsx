import { Handlers, PageProps } from "$fresh/server.ts";
import { LoginForm } from "../islands/LoginForm.tsx";

export const handler: Handlers<string[]> = {
  GET(_req, ctx) {
    return ctx.render();
  }
}

export default function LoginPage(props: PageProps<string[]>) {
  return (
    <main class="mb-auto">
      <div class="flex flex-col gap-x-12 xl:mb-12 xl:flex-row">
        <div class="max-w-3xl pt-6">
          <h1 class="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Login
          </h1>
          <h2>管理者用</h2>
        </div>
      </div>
      <LoginForm action="/api/login"/>
    </main>
  );
}
