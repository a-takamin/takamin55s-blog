import { extract } from "$std/front_matter/yaml.ts";
import { join } from "$std/path/mod.ts";

export interface Post {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
  description: string;
}

export async function getPost(slug: string): Promise<Post | null> {
  if (slug.startsWith("posts/")) {
    slug = slug.slice(6);
  }
  const text = await Deno.readTextFile(join("./posts", `${slug}.md`));
  const extractor = extract<Post>(text);
  return {
    slug,
    title: extractor.attrs.title,
    publishedAt: new Date(extractor.attrs.publishedAt),
    content: extractor.body,
    description: extractor.attrs.description,
  };
}

export async function collectPostPaths(dir: string): Promise<string[]> {
  let paths: string[] = [];
  const files = Deno.readDir(dir);
  for await (const file of files) {
    if (file.isDirectory) {
      paths = paths.concat(await collectPostPaths(join("./posts", file.name)));
    } else {
      paths = paths.concat(join(dir, "/", file.name));
    }
  }
  return paths;
}
