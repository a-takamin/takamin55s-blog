import { getCategories, getTags } from "../utils/postUtil.ts"; 

const dirs: string[] = [];
const dirEntries = Deno.readDir("./posts")
for await (const dirEntry of dirEntries) {
  console.log(dirEntry.name);
  dirs.push(dirEntry.name);
}

// ファイルを作成する先のディレクトリの決定
const dirName = prompt("ディレクトリ名: ")
if (dirName === null) {
  Deno.exit(1);
}
if (!dirs.includes(dirName)) {
  Deno.mkdir(`./posts'/${dirName}`);
}

// ファイル名の決定
const fileName = prompt("ファイル名: ");
if (fileName === null) {
  Deno.exit(1);
}

// ブログのタイトルの決定
const title = prompt("title: ");
if (title === null) {
  Deno.exit(1);
}

// 説明の決定
const description = prompt("description: ");
if (description === null) {
  Deno.exit(1);
}

// カテゴリの決定
const categories = await getCategories();
for (const category of categories) {
  console.log(category);
}
const category = prompt("categories with comma: ");
if (category === null) {
  Deno.exit(1);
}
const categoryArray = category.split(",");
const categoryArrayTrimmed = categoryArray.map((category) => category.trim());

// タグの決定
const tags = await getTags();
for (const tag of tags) {
  console.log(tag);
}
const tag = prompt("tags with comma: ");
if (tag === null) {
  Deno.exit(1);
}
const tagsArray = tag.split(",");
const tagsArrayTrimmed = tagsArray.map((tag) => tag.trim());

// ファイルに書き込む
const categoriesPart = createCategoriesPart(categoryArrayTrimmed);
const tagsPart = createTagsPart(tagsArrayTrimmed);
const content = 
`---
title: ${title}
description: ${description}
categories: 
${categoriesPart}
tags:
${tagsPart}
publishedAt: ${new Date().toISOString()}
---
`;


Deno.writeTextFile(`./posts/${dirName}/${fileName}.md`, content);


function createCategoriesPart(categories: string[]): string {
  let categoriesPart = "";
  categories.forEach(c => {
    categoriesPart += `  - ${c}\n`;
  })
  categoriesPart = categoriesPart.slice(0, -1);
  return categoriesPart;
}

function createTagsPart(tags: string[]): string {
  let tagsPart = "";
  tags.forEach(t => {
    tagsPart += `  - ${t}\n`;
  })
  tagsPart = tagsPart.slice(0, -1);
  return tagsPart;
}