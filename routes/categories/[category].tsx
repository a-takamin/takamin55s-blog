import { Handlers, PageProps } from "$fresh/server.ts";
import { getCategoryPosts, Post } from "../../utils/postUtil.ts";
import { PostCard } from "../../components/PostCard.tsx";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getCategoryPosts(ctx.params.slug);
    return ctx.render(posts);
  },
};

export default function BlogCategoryPage(props: PageProps<Post[]>) {
  let posts = props.data;
  if (!posts) {
    posts = []
  }
  return (
    <main class="mb-auto">
      <div class="flex flex-col items-center gap-x-12 xl:mb-12 xl:flex-row">
        <div class="max-w-3xl pt-6">
          <h1 class="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {decodeURI(props.params.category)} の記事
          </h1>
          <h2 class="prose text-lg text-gray-600 dark:text-gray-400">
            A software engineer who likes beautiful CI/CD pipelines.
          </h2>
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
        <div class="flex flex-col items-center space-x-2 pt-8">
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
      <div class="mt-8">
        {posts.map((post) => <PostCard post={post} />)}
      </div>
    </main>
  );
}

