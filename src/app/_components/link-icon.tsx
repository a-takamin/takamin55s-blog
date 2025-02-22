export default function LinkIcon(props: { href: string, src: string }) {
  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={props.href}
    >
      <img className="fill-current text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400 h-6 w-6" src={props.src} />
    </a>
  )
}
