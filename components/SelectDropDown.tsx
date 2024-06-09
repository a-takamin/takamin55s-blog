export function SelectDropDown (props: {id: string, label: string, options: string[], onChange: () => void}) {
  const { id, label, options, onChange } = props;
  options.push("選択してください")
  return (
    <div class="mb-4">
      <p><label for={id} class="ml-1 text-sm text-gray-700">{label}</label></p>
      <select class="border rounded-lg p-2 h-10 w-full" id={id} name={id} onChange={onChange}>
        {options.map((option) => <option class="" value={option}>{option}</option>)}
      </select>
    </div>
  );
}
