import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<string[]> = {
  async GET(_req, ctx) {
    return ctx.render();
  },
};

export default function BlogAppsPage(props: PageProps<string[]>) {
  const tags = props.data;
  return (
    <main class="mb-auto">
      <div class="flex flex-col gap-x-12 xl:mb-12 xl:flex-row">
        <div class="max-w-3xl pt-6">
          <h1 class="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            アプリ
          </h1>
          <h2 class="prose text-lg text-gray-600 dark:text-gray-400">
            The apps.
          </h2>
        </div>
      </div>
      <div class="mt-8 flex gap-2 flex-wrap">
        <a href="/apps/problemSolving">■（てすと）問題解決アプリ</a>
      </div>
    </main>
  );
}
