import Main from "./pageTemplates/Main.tsx";
import { Post } from "../../utils/postUtil.ts";
import { PostCard } from "../../components/PostCard.tsx";

export default function TagPage(props: {title: string, posts: Post[]}) {
  let posts = props.posts;
  if (!posts) {
    posts = []
  }
  return (
    <Main 
      title={props.title}
      children={
        <div class="mt-8">
          {posts.map((post) => <PostCard post={post} />)}
        </div>
      }
    />
  );
}