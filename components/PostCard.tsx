import { Post } from "../utils/postUtil.ts";
export function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div class="py-8 border-t gray-200)">
      <a class="sm:col-span-2" href={`/posts/${post.slug}`}>
        <h3 class="text-xl md:text-3xl text-gray-900 font-bold">
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
