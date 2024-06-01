import { Handlers, PageProps } from "$fresh/server.ts";
import { AppCard, AppCardProps } from "../components/AppCard.tsx";

export const handler: Handlers<string[]> = {
  async GET(_req, ctx) {
    return ctx.render();
  },
};

export default function BlogAppsPage(props: PageProps<string[]>) {
  const tags = props.data;
  // fixme: ここで定義しなくても自動化できそう
  const apps: AppCardProps[] = [
    {
      name: "Problem Solving App",
      path: "/apps/ProblemSolving",
      description: "問題解決のためのフレームワーク",
      imgPath: "/apps/problemSolving.jpg",
      imgBy: <a href="https://www.freepik.com/free-vector/people-cooperating-make-puzzle_3951668.htm#fromView=search&page=1&position=10&uuid=35e998b9-8177-43ae-9073-6d561f759862">Image by freepik</a>
    }
  ];

  return (
    <main class="mb-auto">
      <div class="flex flex-col gap-x-12 mb-6 xl:mb-12 xl:flex-row">
        <div class="max-w-3xl pt-6">
          <h1 class="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            アプリ
          </h1>
          <h2 class="prose text-lg text-gray-600 dark:text-gray-400">
            The apps.
          </h2>
        </div>
      </div>
      <div class="grid md:grid-cols-2">
        {apps.map(app => <AppCard app={app} />)}
      </div>
    </main>
  );
}
