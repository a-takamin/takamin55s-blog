import Main from "./pageTemplates/Main.tsx";
import { CategoryCard } from "../CategoryCard.tsx";

export default function CategoryListPage(props: {categories: string[]}) {
  return (
    <Main 
      title={"カテゴリ"} 
      children={
        <div class="mt-8 grid gap-2 grid-cols-2 md:grid-cols-3">
          {props.categories.map((category) => <CategoryCard category={category} height="h-44" width=""/>)}
        </div>
      }
    />
  );
}