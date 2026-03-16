import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CORE_PATH = path.join(process.cwd(), "content/core/index.mdx");

export interface CoreContent {
  title: string;
  description: string;
  content: string;
}

export function getCoreContent(): CoreContent {
  if (!fs.existsSync(CORE_PATH)) {
    return {
      title: "Core / 核心身份",
      description: "",
      content: "",
    };
  }
  const fileContents = fs.readFileSync(CORE_PATH, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    description: data.description,
    content,
  };
}
