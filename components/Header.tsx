import { HamburgerMenu } from "../islands/HamburgerMenu.tsx";

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
      <HamburgerMenu />
    </header>
  );
};
