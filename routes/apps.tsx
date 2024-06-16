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
    },
    {
      name: "Simple Notepad App",
      path: "/apps/SimpleNotepad",
      description: "シンプルなプライベートメモ帳",
      imgPath: "/apps/SimpleNotepad.jpg",
      imgBy: <a href="https://www.freepik.com/free-vector/gray-lined-notepaper-journal-sticker-vector_25256333.htm#fromView=search&page=1&position=40&uuid=32268b0c-fa3d-4492-b3de-35288b03f7a3">Image by rawpixel.com on Freepik</a>
    },
    {
      name: "Questions & Answers App",
      path: "/apps/QuestionsAndAnswers",
      description: "一問一答アプリ（非公開）",
      imgPath: "/apps/QuestionsAndAnswers.jpg",
      imgBy: <a href="https://www.freepik.com/free-vector/people-searching-solutions-asking-help-men-women-discussing-huge-question-mark-vector-illustration-communication-assistance-consulting-concept_10579703.htm#fromView=search&page=1&position=8&uuid=e94a4e33-5e1d-41af-bc1a-f2b66bc9edb0">Image by pch.vector on Freepik</a>
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
      <div class="grid md:grid-cols-2 gap-2">
        {apps.map(app => <AppCard app={app} />)}
      </div>
    </main>
  );
}
