export function CheckboxWithLabel(props: {id: string, label: string, q: string, onClick: () => void}) {
  const { q, id, label, onClick } = props;
  return (
    <div class="mb-4">
      <p class="block text-gray-700 text-sm font-bold mb-2">{q}</p>
      <input id={id} type="checkbox" class="rounded-lg" onClick={onClick}/>
      <label for={id} class="ml-1 text-sm text-gray-700">{label}</label>
    </div>
  );
}
