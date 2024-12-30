import { Handlers, PageProps } from "$fresh/server.ts";
import { getCategories } from "../utils/postUtil.ts";
import CategoryListPage from "../components/pages/CategoryListPage.tsx";

export const handler: Handlers<string[]> = {
  async GET(_req, ctx) {
    const categories = await getCategories();
    return ctx.render(categories);
  },
};

export default function BlogCategoriesPage(props: PageProps<string[]>) {
  const categories = props.data;
  return (
    <CategoryListPage categories={categories}/>
  );
}
