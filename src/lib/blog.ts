import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_PATH = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(BLOG_PATH);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(BLOG_PATH, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        readTime: data.readTime,
        summary: data.summary,
        content,
      };
    });

  // Sort posts by date in descending order
  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(BLOG_PATH, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      readTime: data.readTime,
      summary: data.summary,
      content,
    };
  } catch (error) {
    return null;
  }
}
