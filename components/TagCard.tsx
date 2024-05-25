export function TagCard(props: { tag: string }) {
  const { tag } = props;
  return (
    <div class="h-12 border rounded-xl bg-slate-50 flex items-center p-2 flex-shrink-0">
      <a class="box-border" href={`/tags/${tag}`}>
        {tag}
      </a>
    </div>
  );
}
