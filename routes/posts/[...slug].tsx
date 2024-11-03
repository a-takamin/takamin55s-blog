import { Handlers } from "$fresh/server.ts";
import { getPost, Post } from "../../utils/postUtil.ts";
import { TagCard } from "../../components/TagCard.tsx";
import { render as gfmRender } from "@deno/gfm";
import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { RelatedPostCard } from "../../components/RelatedPostCard.tsx";

export const handler: Handlers<Post> = {
  async GET(_, ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) {
      return ctx.renderNotFound();
    }
    return ctx.render(post);
  },
};


export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <>
    <Head>
      <title>{post.title}</title>
      <meta name="description" content={post.description}></meta>
    </Head>
    <main class="max-w-screen-md px-4 pt-16">
      <h1 class="text-3xl md:text-5xl font-bold">{post.title}</h1>
      <time class="text-gray-500">
        {new Date(post.publishedAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <div class="mt-2 mb-2 gap-2 flex flex-row overflow-x-auto">
        {post.tags.map((tag) => <TagCard tag={tag} />)}              
      </div>
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
    </>
  );
}
