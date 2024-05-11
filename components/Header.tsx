export const Header = () => {
  return (
    <header class="flex items-center justify-between py-10">
      <div>
        <a href="/">
          <div>
            <div class="flex items-center justify-between mr-3">
              <img src="/cake.png" class="w-10 h-10 mr-1" />
              <div class="h-8 text-2xl font-semibold">takamin55's blog</div>
            </div>
          </div>
        </a>
      </div>
      <div class="flex items-center leading-5 space-x-4 sm:space-x-6">
        <a
          class="hidden sm:block font-medium text-gray-900 dark:text-gray-100"
          href="/categories"
        >
          Categories
        </a>
        <a
          class="hidden sm:block font-medium text-gray-900 dark:text-gray-100"
          href="/tags"
        >
          Tags
        </a>
        <a
          class="hidden sm:block font-medium text-gray-900 dark:text-gray-100"
          href="/about"
        >
          About
        </a>
        <button aria-label="Search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="text-gray-900 dark:text-gray-100 h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            >
            </path>
          </svg>
        </button>
        <button aria-label="Toggle Menu" class="sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="text-gray-900 dark:text-gray-100 h-8 w-8"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            >
            </path>
          </svg>
        </button>
        {/* translate-x-full, translate-x-0 を切り替えることでハンバーガーメニューを出し入れできる */}
        <div class="fixed left-0 top-0 z-10 h-full w-full transform opacity-95 dark:opacity-[0.98] bg-white duration-300 ease-in-out dark:bg-gray-950 translate-x-full">
          <div class="flex justify-end">
            <button class="mr-8 mt-11 h-8 w-8" aria-label="Toggle Menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="text-gray-900 dark:text-gray-100"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                >
                </path>
              </svg>
            </button>
          </div>
          <nav class="fixed mt-8 h-full">
            <div class="px-12 py-4">
              <a
                class="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                href="/blog"
              >
                Blog
              </a>
            </div>
            <div class="px-12 py-4">
              <a
                class="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                href="/tags"
              >
                Tags
              </a>
            </div>
            <div class="px-12 py-4">
              <a
                class="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                href="/about"
              >
                About
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
