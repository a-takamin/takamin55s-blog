import { Handlers, PageProps } from "$fresh/server.ts";
import { getIndexPosts, getCategories, getTags, Post } from "../utils/postUtil.ts";
import { LatestPages } from "../islands/LatestPages.tsx";
import { CategoryCard } from "../components/CategoryCard.tsx";
import { TagCard } from "../components/TagCard.tsx";

type IndexPageData = {
  posts: Post[];
  categories: string[];
  tags: string[];
}

export const handler: Handlers<IndexPageData> = {
  async GET(_req, ctx) {
    const posts = await getIndexPosts();
    const categories = await getCategories();
    const tags = await getTags();
    const indexPageData: IndexPageData = {
      posts: posts,
      categories: categories,
      tags: tags,
    }
    return ctx.render(indexPageData);
  },
};

export default function BlogIndexPage(props: PageProps<IndexPageData>) {
  let posts = props.data.posts;
  if (!posts) {
    posts = []
  }

  return (
    <main class="mb-auto">
      <div class="flex flex-col items-center gap-x-12 xl:flex-row">
        <div class="max-w-3xl pt-6">
          <div class="grid grid-cols-3">
            <div class="col-span-2">
              <h1 class="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                Hi, I'm takamin55
              </h1>
              <h2 class="prose text-lg text-gray-600 dark:text-gray-400">
              A software engineer who likes beautiful CI/CD pipelines.
              </h2>
            </div>
            <div class="col-span-1 flex flex-col items-center justify-center space-x-2 xl:hidden">
              <img
                alt="avatar"
                loading="lazy"
                decoding="async"
                data-nimg="1"
                class="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full"
                src="avatar.png"
                style="color: transparent;"
              >
              </img>
            </div>
          </div>
          
          <div class="mt-8">
            <h3 class="text-lg font-bold">Work</h3>
            <div class="mb-4">
              <span class="mr-3 inline-block whitespace-nowrap pt-2">
                💎 Golang
              </span>
              <span class="mr-3 inline-block whitespace-nowrap pt-2">
                ☕ Java
              </span>
              <span class="mr-3 inline-block whitespace-nowrap pt-2">
                🏅 TypeScript
              </span>
              <span class="mr-3 inline-block whitespace-nowrap pt-2">
                🐈‍⬛ GitHub Actions
              </span>
              <span class="mr-3 inline-block whitespace-nowrap pt-2">
                🎋 Terraform
              </span>
              <span class="mr-3 inline-block whitespace-nowrap pt-2">
                🐳 Docker
              </span>
              <span class="mr-3 inline-block whitespace-nowrap pt-2">
                🍊 AWS
              </span>
              <span class="mr-3 inline-block whitespace-nowrap pt-2">
                🧊 GCP
              </span>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold">Hobby</h3>
            <div class="mb-4">
              <span class="mr-3 inline-block whitespace-nowrap pt-2">
                <a href="/">🌵 Deno</a>
              </span>
              <span class="mr-3 inline-block whitespace-nowrap pt-2">
                🧑‍💻 Competitive Programming
              </span>
              <span class="mr-3 inline-block whitespace-nowrap pt-2">
                ♟️ Chess
              </span>
              <span class="mr-3 inline-block whitespace-nowrap pt-2">
                🍔 Hamburger
              </span>
              <span class="mr-3 inline-block whitespace-nowrap pt-2">
                🏝️ Traveling
              </span>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center space-x-2 pt-8 hidden xl:block">
          <img
            alt="avatar"
            loading="lazy"
            width="192"
            height="192"
            decoding="async"
            data-nimg="1"
            class="h-32 w-32 sm:h-48 sm:w-48 rounded-full"
            src="avatar.png"
            style="color: transparent;"
          >
          </img>
        </div>
      </div>
      <div>
        <div class="mt-8">
          <h3 class="text-lg font-bold">Categories</h3>
          <div class="flex flex-row mb-4 gap-2 overflow-x-auto">
            {props.data.categories.map((category) => <CategoryCard category={category} height="h-24" width="w-36 md:w-52" />)}              
          </div>
        </div>
        <div>
          <h3 class="text-lg font-bold">Tags</h3>
          <div class="mb-4 gap-2 flex flex-row overflow-x-auto">
            {props.data.tags.map((tag) => <TagCard tag={tag} />)}              
          </div>
        </div>
      </div>
      <LatestPages posts={posts} displayUnit={5} />
    </main>
  );  
}

