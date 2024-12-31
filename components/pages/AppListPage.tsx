import Main from "./pageTemplates/Main.tsx";
import { AppCard } from "../AppCard.tsx";

export default function AppListPage() {

  const myApps = [{
    name: "Markdown Editor",
    path: "/apps/markdowneditor",
    description: "マークダウンエディター",
    imgPath: "/apps/markdownEditor.png",
    imgBy: "any;"
  }]

  return (
    <Main 
      title={"アプリ"} 
      children={
        <div class="grid md:grid-cols-2 gap-2">
          {myApps.map((app) => <AppCard app={app}/>)}
        </div>
      }
    />
  );
}