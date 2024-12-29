import LinkIcon from "./ui/LinkIcon.tsx";

export const Footer = () => {
  return (
    <footer>
      <div class="mt-16 flex flex-col items-center">
        <div class="mb-3 flex space-x-4">
          <LinkIcon href="https://github.com/a-takamin" src="/github.svg" />
          <LinkIcon href="https://zenn.dev/takamin55" src="/zenn.svg" />
          <LinkIcon href="https://twitter.com/takamin_55" src="/x.svg" />
        </div>
        <div class="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>takamin55's blog</div>
          <div>/</div>
          <div>© 2024 by takamin55</div>
        </div>
      </div>
    </footer>
  );
};
