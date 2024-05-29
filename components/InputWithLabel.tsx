import { JSX } from "preact";
export function InputWithLabel(props: JSX.HTMLAttributes<HTMLInputElement>) {
  const { id, label, placeholder } = props;
  return (
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for={label}>
        {label}
      </label>
      <input
        class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...props}
      >
      </input>
    </div>
  );
}
