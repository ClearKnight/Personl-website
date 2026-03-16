import { getAboutContent } from "@/lib/about";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import { motion } from "framer-motion";

export default async function AboutSection() {
  const about = getAboutContent();

  return (
    <div className="prose prose-zinc prose-invert max-w-none prose-headings:font-serif prose-headings:italic">
      <MDXRemote source={about.content} components={mdxComponents} />
    </div>
  );
}
