import { Handlers, PageProps } from "$fresh/server.ts";
import { getCategories, Post } from "../utils/postUtil.ts";
import { CategoryCard } from "../components/CategoryCard.tsx";

export const handler: Handlers<string[]> = {
  async GET(_req, ctx) {
    const categories = await getCategories();
    return ctx.render(categories);
  },
};

export default function BlogCategoriesPage(props: PageProps<string[]>) {
  const categories = props.data;
  return (
    <main class="mb-auto">
      <div class="flex flex-col gap-x-12 xl:mb-12 xl:flex-row">
        <div class="max-w-3xl pt-6">
          <h1 class="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Categories
          </h1>
          <h2 class="prose text-lg text-gray-600 dark:text-gray-400">
            The categories of blog posts.
          </h2>
        </div>
      </div>
      <div class="mt-8 grid gap-2 grid-cols-2 md:grid-cols-3">
        {categories.map((category) => <CategoryCard category={category} />)}
      </div>
    </main>
  );
}
