import { CSS as gmfCSS } from "@deno/gfm";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>takamin55's blog</title>
        <link rel="stylesheet" href="/styles.css" />
        <style dangerouslySetInnerHTML={{ __html: gmfCSS }} />
      </head>
      <body>
        <section class="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
          <Header />
          <Component />
          <Footer />
        </section>
      </body>
    </html>
  );
}
