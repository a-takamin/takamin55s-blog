import { useId } from "preact/hooks";
import TextInput from "./TextInput.tsx";

export default function TextInputWithLabel(props: {
  label: string,
  placeholder: string, 
  value: string,
  onChange: (value: string) => void,
  onBlur: (value: string) => void
}) {

  const id = useId()

  return (
    <>
      <label
        for={id}
        class="block text-gray-700 text-sm font-bold mb-2"
      >
        {props.label}
      </label>
      <TextInput 
        id={id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </>
  )
}