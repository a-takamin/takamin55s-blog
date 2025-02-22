import { HamburgerMenu } from "./nav";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <a href="/">
          <div>
            <div className="flex items-center justify-between mr-3">
              <img src="/cake.png" className="w-10 h-10 mr-1" />
              <div className="h-8 text-2xl font-semibold">takamin55's blog</div>
            </div>
          </div>
        </a>
      </div>
      <HamburgerMenu />
    </header>
  );
};

export default Header;

