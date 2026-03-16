import { getWorkBySlug, getAllWorks } from "@/lib/works";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import Image from "next/image";

export async function generateStaticParams() {
  const works = getAllWorks();
  return works.map((work) => ({
    slug: work.slug,
  }));
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white px-8 md:px-20 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Navigation back */}
        <Link 
          href="/#works" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-black transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-mono">Back to works</span>
        </Link>

        {/* Header Section */}
        <header className="mb-20">
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                <span>{work.category}</span>
                <span className="text-zinc-200">/</span>
                <span>{work.year}</span>
                {work.status && (
                  <>
                    <span className="text-zinc-200">/</span>
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1 h-1 rounded-full ${work.status.toLowerCase() === 'active' ? 'bg-green-500 animate-pulse' : 'bg-zinc-300'}`} />
                      {work.status}
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-none italic">
                {work.title}
              </h1>
            </div>
            {/* External link button - only shows if link is provided in MDX */}
            {work.link && (
              <a 
                href={work.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 border border-zinc-100 rounded-full hover:bg-black hover:text-white transition-all group/link"
              >
                <ExternalLink size={20} className="group-hover/link:scale-110 transition-transform" />
              </a>
            )}
          </div>
          
          {/* Main Showcase Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-12 bg-zinc-50 border border-zinc-100 shadow-sm group">
            <Image 
              fill
              src={work.image} 
              alt={work.title}
              className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              priority
            />
          </div>

          <p className="text-2xl text-zinc-500 font-light leading-relaxed max-w-2xl">
            {work.summary}
          </p>
        </header>

        {/* Content Section - Markdown Rendering */}
        <article className="prose prose-zinc prose-lg max-w-none prose-img:rounded-2xl prose-headings:font-serif prose-headings:italic">
          <MDXRemote source={work.content} components={mdxComponents} />
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
