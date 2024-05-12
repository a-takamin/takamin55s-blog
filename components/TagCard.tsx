export function TagCard(props: { tag: string }) {
  const { tag } = props;
  return (
    <div class="h-12 border rounded-xl bg-slate-50 flex items-center">
      <a class="box-border p-4" href={`tags/${tag}`}>
        {tag}
      </a>
    </div>
  );
}
