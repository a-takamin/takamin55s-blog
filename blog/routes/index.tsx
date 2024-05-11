import { Handlers } from "$fresh/server.ts";
import { getPost, Post } from "../utils/posts.ts";
import { collectPostPaths } from "../utils/posts.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

async function getPosts(): Promise<Post[]> {
  const postPaths = await collectPostPaths("./posts");
  const promises = [];
  for (const postPath of postPaths) {
    const slug = postPath.replace(".md", "");
    promises.push(getPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}

import { PageProps } from "$fresh/server.ts";

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <main class="mb-auto">
      <div class="flex flex-col items-center gap-x-12 xl:mb-12 xl:flex-row">
        <div class="max-w-3xl pt-6">
          <h1 class="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Hi, I'm takamin55
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

function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div class="py-8 border-t gray-200)">
      <a class="sm:col-span-2" href={`/posts/${post.slug}`}>
        <h3 class="text-3xl text-gray-900 font-bold">
          {post.title}
        </h3>
        <time class="text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div class="mt-4 text-gray-900">
          {post.description}
        </div>
      </a>
    </div>
  );
}
