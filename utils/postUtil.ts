import { extract } from "$std/front_matter/yaml.ts";
import { join } from "$std/path/mod.ts";

export interface Post {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
  description: string;
  categories: string[];
  tags: string[];
}

export async function getCategories(): Promise<string[]> {
  const postPaths = await collectPostPaths("./posts");
  const categories = new Set<string>();
  for (const postPath of postPaths) {
    const slug = postPath.replace(".md", "");
    const post = await getPost(slug);
    if (post) {
      post.categories.forEach((category) => categories.add(category));
    }
  }

  return Array.from(categories).sort((a,b) => a.localeCompare(b));
}

export async function getTags(): Promise<string[]> {
  const postPaths = await collectPostPaths("./posts");
  const tags = new Set<string>();
  for (const postPath of postPaths) {
    const slug = postPath.replace(".md", "");
    const post = await getPost(slug);
    if (post) {
      post.tags.forEach((tag) => tags.add(tag));
    }
  }
  return Array.from(tags).sort((a,b) => a.localeCompare(b));
}

export async function getCategoryPosts(category: string): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.categories.includes(decodeURI(category)));
}

export async function getTagPosts(tag: string): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.tags.includes(decodeURI(tag)));
}

export async function getPosts(): Promise<Post[]> {
  const postPaths = await collectPostPaths("./posts");
  const promises = [];
  for (const postPath of postPaths) {
    const slug = postPath.replace(".md", "");
    promises.push(getPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
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
    categories: extractor.attrs.categories,
    tags: extractor.attrs.tags,
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
