import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ABOUT_PATH = path.join(process.cwd(), "content/about/index.mdx");

export interface AboutContent {
  title: string;
  description: string;
  content: string;
}

export function getAboutContent(): AboutContent {
  if (!fs.existsSync(ABOUT_PATH)) {
    return {
      title: "About Me",
      description: "",
      content: "",
    };
  }
  const fileContents = fs.readFileSync(ABOUT_PATH, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    description: data.description,
    content,
  };
}
