import { Handlers, PageProps } from "$fresh/server.ts";
import { getCategoryPosts, Post } from "../../utils/postUtil.ts";
import { PostCard } from "../../components/PostCard.tsx";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getCategoryPosts(ctx.params.category);
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
      <div class="flex flex-col gap-x-12 xl:mb-12 xl:flex-row">
        <div class="max-w-3xl pt-6">
          <h1 class="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            「{decodeURI(props.params.category)}」カテゴリの記事
          </h1>
        </div>
      </div>
      <div class="mt-8">
        {posts.map((post) => <PostCard post={post} />)}
      </div>
    </main>
  );
}

