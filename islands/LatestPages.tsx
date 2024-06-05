import { Post } from "../utils/postUtil.ts";
import { PostCard } from "../components/PostCard.tsx";
import { useSignal, computed } from "@preact/signals";

export function LatestPages(props: {posts: Post[], displayUnit: number}) {
  const { posts, displayUnit } = props;
  const numPosts = posts.length;
  let numPostsToDisplay = useSignal(displayUnit);
  let showPosts = computed(() => {
    return posts.slice(0, numPostsToDisplay.value);
  })
  let showedAllArticles = computed(() => {
    return numPostsToDisplay.value >= numPosts;
  })

  return (
    <>
      <div class="mt-10">
        <h3 class="text-lg font-bold mb-1">Latest Articles</h3>
        {showPosts.value.map((post) => <PostCard post={post} />)}
      </div>
      <button hidden={showedAllArticles.value} class="mt-3 text-gray-600" onClick={(() => {
        if (numPostsToDisplay.value + displayUnit >= numPosts) {
          return numPostsToDisplay.value = numPosts;
        }
          numPostsToDisplay.value += displayUnit
        })}>show more...</button>
    </>
  )
}