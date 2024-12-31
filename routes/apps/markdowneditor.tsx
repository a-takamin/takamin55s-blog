import { Handlers } from "$fresh/server.ts";
import MarkdownEditorPage from "../../components/pages/MarkdownEditorPage.tsx";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render();
  },
};

export default function BlogMarkdownEditorPage() {
  return (
    <MarkdownEditorPage />
  );
}
