import { useState } from "preact/hooks";
import { renderMarkdown } from "$fresh/www/utils/markdown.ts";

export default function MarkdownEditor() {
  const [previewText, setPreviewText] = useState("");

  function makePreview(text: string) { 
    
    const {html} = renderMarkdown(text, {inline: false})
    setPreviewText(html)
  }

  return (
    <div class="grid md:grid-cols-2 gap-5">
      <textarea 
        class="border border-gray-200 rounded-md p-2 focus:outline-none w-full h-96"
        onInput={e => makePreview((e.target as HTMLTextAreaElement).value)} />
      <div dangerouslySetInnerHTML={{ __html: previewText }} />
    </div>
  )
}