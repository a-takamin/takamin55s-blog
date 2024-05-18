import { Handlers, PageProps } from "$fresh/server.ts";
import { getTags, Post } from "../utils/postUtil.ts";
import { TagCard } from "../components/TagCard.tsx";

export const handler: Handlers<string[]> = {
  async GET(_req, ctx) {
    const tags = await getTags();
    return ctx.render(tags);
  },
};

export default function BlogTagsPage(props: PageProps<string[]>) {
  const tags = props.data;
  return (
    <main class="mb-auto">
      <div class="flex flex-col gap-x-12 xl:mb-12 xl:flex-row">
        <div class="max-w-3xl pt-6">
          <h1 class="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            タグ
          </h1>
          <h2 class="prose text-lg text-gray-600 dark:text-gray-400">
            The tags of blog posts.
          </h2>
        </div>
      </div>
      <div class="mt-8 flex gap-2">
        {tags.map((tag) => <TagCard tag={tag} />)}
      </div>
    </main>
  );
}
