import fs from "fs";
import path from "path";
import matter from "gray-matter";

const WORKS_PATH = path.join(process.cwd(), "content/works");

export interface ProjectWork {
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
  summary: string;
  link?: string;
  status?: string;
  content: string;
}

export function getAllWorks(): ProjectWork[] {
  if (!fs.existsSync(WORKS_PATH)) return [];
  
  const fileNames = fs.readdirSync(WORKS_PATH);

  const works = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(WORKS_PATH, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        category: data.category,
        year: data.year,
        image: data.image,
        summary: data.summary,
        link: data.link,
        status: data.status,
        content,
      };
    });

  // Sort by year (descending)
  return works.sort((a, b) => Number(b.year) - Number(a.year));
}

export function getNextPrevWorks(currentSlug: string) {
  const works = getAllWorks();
  const currentIndex = works.findIndex((work) => work.slug === currentSlug);

  return {
    next: currentIndex > 0 ? works[currentIndex - 1] : null,
    prev: currentIndex < works.length - 1 ? works[currentIndex + 1] : null,
  };
}

export function getWorkBySlug(slug: string): ProjectWork | null {
  try {
    const fullPath = path.join(WORKS_PATH, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      category: data.category,
      year: data.year,
      image: data.image,
      summary: data.summary,
      link: data.link,
      status: data.status,
      content,
    };
  } catch (error) {
    return null;
  }
}
