// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_login from "./routes/api/login.ts";
import * as $api_qanda_card_index from "./routes/api/qanda/card/index.ts";
import * as $api_qanda_deck_index from "./routes/api/qanda/deck/index.ts";
import * as $api_qanda_deck_list from "./routes/api/qanda/deck/list.ts";
import * as $apps from "./routes/apps.tsx";
import * as $apps_ProblemSolving from "./routes/apps/ProblemSolving.tsx";
import * as $apps_QuestionsAndAnswers from "./routes/apps/QuestionsAndAnswers.tsx";
import * as $apps_SimpleNotepad from "./routes/apps/SimpleNotepad.tsx";
import * as $categories from "./routes/categories.tsx";
import * as $categories_category_ from "./routes/categories/[category].tsx";
import * as $index from "./routes/index.tsx";
import * as $login from "./routes/login.tsx";
import * as $posts_slug_ from "./routes/posts/[...slug].tsx";
import * as $tags from "./routes/tags.tsx";
import * as $tags_tag_ from "./routes/tags/[tag].tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $HamburgerMenu from "./islands/HamburgerMenu.tsx";
import * as $LatestPages from "./islands/LatestPages.tsx";
import * as $LoginForm from "./islands/LoginForm.tsx";
import * as $ProblemSolvingApp from "./islands/ProblemSolvingApp.tsx";
import * as $QuestionsAndAnswers from "./islands/QuestionsAndAnswers.tsx";
import * as $SimpleNotepad from "./islands/SimpleNotepad.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/login.ts": $api_login,
    "./routes/api/qanda/card/index.ts": $api_qanda_card_index,
    "./routes/api/qanda/deck/index.ts": $api_qanda_deck_index,
    "./routes/api/qanda/deck/list.ts": $api_qanda_deck_list,
    "./routes/apps.tsx": $apps,
    "./routes/apps/ProblemSolving.tsx": $apps_ProblemSolving,
    "./routes/apps/QuestionsAndAnswers.tsx": $apps_QuestionsAndAnswers,
    "./routes/apps/SimpleNotepad.tsx": $apps_SimpleNotepad,
    "./routes/categories.tsx": $categories,
    "./routes/categories/[category].tsx": $categories_category_,
    "./routes/index.tsx": $index,
    "./routes/login.tsx": $login,
    "./routes/posts/[...slug].tsx": $posts_slug_,
    "./routes/tags.tsx": $tags,
    "./routes/tags/[tag].tsx": $tags_tag_,
  },
  islands: {
    "./islands/Counter.tsx": $Counter,
    "./islands/HamburgerMenu.tsx": $HamburgerMenu,
    "./islands/LatestPages.tsx": $LatestPages,
    "./islands/LoginForm.tsx": $LoginForm,
    "./islands/ProblemSolvingApp.tsx": $ProblemSolvingApp,
    "./islands/QuestionsAndAnswers.tsx": $QuestionsAndAnswers,
    "./islands/SimpleNotepad.tsx": $SimpleNotepad,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
