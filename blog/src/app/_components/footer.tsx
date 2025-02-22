import Container from "@/app/_components/container";
import LinkIcon from "./link-icon";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="mt-16 flex flex-col items-center">
          <div className="mb-3 flex space-x-4">
            <LinkIcon href="https://github.com/a-takamin" src="/github.svg" />
            <LinkIcon href="https://zenn.dev/takamin55" src="/zenn.svg" />
            <LinkIcon href="https://twitter.com/takamin_55" src="/x.svg" />
          </div>
          <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div>takamin55's blog</div>
            <div>/</div>
            <div>© 2024 by takamin55</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
