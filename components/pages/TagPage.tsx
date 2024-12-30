import Main from "./pageTemplates/Main.tsx";

export default function TagPage(props: {title: string, children: any}) {
  return (
    <Main title={props.title} children={props.children}/>
  );
}