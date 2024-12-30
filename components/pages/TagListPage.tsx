import Main from "./pageTemplates/Main.tsx";
import { TagCard } from "../TagCard.tsx";

export default function TagPage(props: {tags: string[]}) {
  return (
    <Main 
      title={"タグ"} 
      children={
        <div class="mt-8 flex gap-2 flex-wrap">
          {props.tags.map((tag) => <TagCard tag={tag} />)} 
        </div>
      }
    />
  );
}