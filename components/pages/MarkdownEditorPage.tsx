import Main from "./pageTemplates/Main.tsx";
import MarkdownEditor from "../../islands/MarkdownEditor.tsx";

export default function MarkdownEditorPage() {
  
  return (
    <Main 
      title={"Markdown Editor"}
      children={
        <div class="mt-8">
          <MarkdownEditor />
        </div>
      }
    />
  );
}