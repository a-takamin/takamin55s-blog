import { useSignal } from "@preact/signals";
import HeaderNavLink from "../components/ui/HeaderNavLink.tsx";

export function HamburgerMenu() {
  const isOpen = useSignal(false);

  // TODO: NavLink はまとめて別ファイルに定義したい。例えば json など。
  return (
    <div class="flex items-center leading-5 space-x-4 sm:space-x-6">
      <HeaderNavLink relativeHRef="/categories" displayName="Categories" mode="pc"/>
      <HeaderNavLink relativeHRef="/tags" displayName="Tags" mode="pc"/>
      <HeaderNavLink relativeHRef="/about" displayName="About" mode="pc"/>
      <button aria-label="Search">
        <img class="text-gray-900 dark:text-gray-100 h-6 w-6" src="/search.svg" alt="Search"/>
      </button>
      <button aria-label="Toggle Menu" class="sm:hidden" onClick={() => (isOpen.value = true)}>
        <img class="text-gray-900 dark:text-gray-100 h-8 w-8" src="/hamburgerMenu.svg" alt="HamburgerMenu"/>
      </button>

    <div class={`fixed left-0 top-0 z-10 h-full w-full transform opacity-95 dark:opacity-[0.98] bg-white duration-300 ease-in-out dark:bg-gray-950 ${isOpen.value ? "translate-x-0" : "translate-x-full"}`} onClick={() => (isOpen.value = !isOpen.value)}>
      <div class="flex justify-end">
        <button class="mr-8 mt-11 h-8 w-8" aria-label="Toggle Menu">
          <img class="text-gray-900 dark:text-gray-100" src="/close.svg" alt="closeButton" />
        </button>
      </div>
      <nav class="fixed mt-8 h-full">
        <div class="px-12 py-4">
          <HeaderNavLink relativeHRef="/categories" displayName="Categories" mode="sp"/>
        </div>
        <div class="px-12 py-4">
          <HeaderNavLink relativeHRef="/tags" displayName="Tags" mode="sp"/>
        </div>
        <div class="px-12 py-4">
          <HeaderNavLink relativeHRef="/about" displayName="About" mode="sp"/>
        </div>
      </nav>
    </div>
  </div>
  );
}
