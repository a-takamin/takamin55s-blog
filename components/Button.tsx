import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="shadow px-3 py-2 text-gray-700 border-gray-300 border rounded-lg bg-white hover:bg-gray-200 transition-colors"
    />
  );
}
