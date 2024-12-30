import { Handlers, PageProps } from "$fresh/server.ts";
import { getCategoryPosts, Post } from "../../utils/postUtil.ts";
import CategoryPage from "../../components/pages/CategoryPage.tsx";

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
  const title = `「${decodeURI(props.params.category)}」カテゴリの記事`
  return (
    <CategoryPage title={title} posts={posts}/>
  );
}

