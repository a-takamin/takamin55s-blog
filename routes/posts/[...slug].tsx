import { Handlers } from "$fresh/server.ts";
import { getPost, Post } from "../../utils/posts.ts";
import { render as gfmRender } from "$gfm";

export const handler: Handlers<Post> = {
  async GET(_, ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) {
      return ctx.renderNotFound();
    }
    return ctx.render(post);
  },
};

import { PageProps } from "$fresh/server.ts";

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <main class="max-w-screen-md px-4 pt-16">
      <h1 class="text-5xl font-bold">{post.title}</h1>
      <time class="text-gray-500">
        {new Date(post.publishedAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <div
        class="mt-8 markdown-body"
        dangerouslySetInnerHTML={{
          __html: gfmRender(post.content, {
            allowIframes: true,
            disableHtmlSanitization: true,
          }),
        }}
      />
    </main>
  );
}
