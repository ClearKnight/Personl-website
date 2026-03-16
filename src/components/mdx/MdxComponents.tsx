import Image from "next/image";
import Link from "next/link";
import { AlertCircle, Info, Lightbulb } from "lucide-react";

export const mdxComponents = {
  // Custom Callout Component
  Callout: ({ children, type = "info" }: { children: React.ReactNode, type?: "info" | "warning" | "idea" }) => {
    const icons = {
      info: <Info size={18} className="text-blue-500" />,
      warning: <AlertCircle size={18} className="text-amber-500" />,
      idea: <Lightbulb size={18} className="text-emerald-500" />,
    };
    const bgColors = {
      info: "bg-blue-50/50 border-blue-100",
      warning: "bg-amber-50/50 border-amber-100",
      idea: "bg-emerald-50/50 border-emerald-100",
    };
    
    return (
      <div className={`my-8 p-6 rounded-2xl border ${bgColors[type]} flex gap-4 items-start`}>
        <div className="mt-1 shrink-0">{icons[type]}</div>
        <div className="text-sm leading-relaxed text-zinc-800 italic font-sans not-prose">
          {children}
        </div>
      </div>
    );
  },

  // Optimized Image Component for MDX
  img: (props: any) => (
    <span className="block my-12 relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-100 shadow-sm bg-zinc-50 grayscale hover:grayscale-0 transition-all duration-700">
      <Image
        fill
        src={props.src}
        alt={props.alt || ""}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </span>
  ),

  // Custom Link Component
  a: ({ href, children, ...props }: any) => {
    const isInternal = href && href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className="font-medium underline decoration-zinc-400/30 underline-offset-4 hover:decoration-current transition-colors" {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="font-medium underline decoration-zinc-400/30 underline-offset-4 hover:decoration-current transition-colors inline-flex items-center gap-1 group" 
        {...props}
      >
        {children}
        <span className="inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
      </a>
    );
  },

  // Layout Components
  Grid: ({ children, cols = 2, gap = 8 }: { children: React.ReactNode, cols?: number, gap?: number }) => (
    <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-${gap} my-12`}>
      {children}
    </div>
  ),

  Card:({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 group">
      <h4 className="text-sm font-serif italic mb-2 text-white/90">{title}</h4>
      <div className="text-xs text-zinc-300 leading-relaxed">{children}</div>
    </div>
  ),
};
