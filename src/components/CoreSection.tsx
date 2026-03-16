import { getCoreContent } from "@/lib/core";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/MdxComponents";

export default async function CoreSection() {
  const core = getCoreContent();

  return (
    <div className="prose prose-zinc prose-invert max-w-none prose-headings:font-serif prose-headings:italic">
      <MDXRemote source={core.content} components={mdxComponents} />
    </div>
  );
}
