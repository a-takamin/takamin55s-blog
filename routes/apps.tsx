import { Handlers } from "$fresh/server.ts";
import AppListPage from "../components/pages/AppListPage.tsx";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render();
  },
};

export default function Apps() {
  return (
    <AppListPage />
  );
}
