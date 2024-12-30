import { Handlers, PageProps } from "$fresh/server.ts";
import { getTags } from "../utils/postUtil.ts";
import TagListPage from "../components/pages/TagListPage.tsx";

export const handler: Handlers<string[]> = {
  async GET(_req, ctx) {
    const tags = await getTags();
    return ctx.render(tags);
  },
};

export default function BlogTagsPage(props: PageProps<string[]>) {
  const tags = props.data;
  return (
    <TagListPage tags={tags}/>
  );
}
