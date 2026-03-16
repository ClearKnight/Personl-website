import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { mdxComponents } from "@/components/mdx/MdxComponents";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white px-8 md:px-20 py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        {/* Navigation back */}
        <Link 
          href="/#blog" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-black transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-mono">Back to list</span>
        </Link>

        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-6 mb-8 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Calendar size={12} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={12} />
              <span>{post.readTime} read</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight leading-tight mb-8 italic">
            {post.title}
          </h1>
          <p className="text-xl text-zinc-500 font-light leading-relaxed border-l-2 border-zinc-100 pl-8 py-2">
            {post.summary}
          </p>
        </header>

        {/* Content Section - Markdown Rendering */}
        <article className="prose prose-zinc prose-lg max-w-none prose-img:rounded-2xl prose-headings:font-serif prose-headings:italic">
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>

        {/* Footer Navigation */}
        <footer className="mt-32 pt-16 border-t border-zinc-100">
          <div className="flex justify-between items-center text-xs text-zinc-400 font-mono uppercase tracking-[0.2em]">
            <span>© CLEAR 2024</span>
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
