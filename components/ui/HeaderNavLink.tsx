export default function HeaderNavLink(props: { relativeHRef: string, displayName: string, mode: string }) {
  // TODO: text color は上位レイヤーでまとめて統一したい
  if (props.mode === "sp") {
    return (
      <a
        class="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
        href={props.relativeHRef}
      >
        {props.displayName}
      </a>
    )
  } 
  if (props.mode === "pc") {
    return (
      <a
        class="hidden sm:block font-medium text-gray-900 dark:text-gray-100"
        href={props.relativeHRef}
      >
        {props.displayName}
      </a>
    )
  }
  return (<></>);
}