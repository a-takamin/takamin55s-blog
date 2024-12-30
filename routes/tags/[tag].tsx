import { Handlers, PageProps } from "$fresh/server.ts";
import { getTagPosts, Post } from "../../utils/postUtil.ts";
import TagPage from "../../components/pages/TagPage.tsx";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getTagPosts(ctx.params.tag);
    return ctx.render(posts);
  },
};

export default function BlogTagPage(props: PageProps<Post[]>) {
  let posts = props.data;
  if (!posts) {
    posts = []
  }
  const title = `「${decodeURI(props.params.tag)}」タグの記事`
  return (
    <TagPage title={title} posts={posts}/>
  );
}

