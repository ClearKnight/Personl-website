"use client";

import { motion, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, Globe, Github, Twitter, Linkedin, ExternalLink, Book, Code, PenTool, Activity, MessageCircle, Mail, Download, Rss } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import { ProjectWork } from "@/lib/works";
import { AnimatePresence } from "framer-motion";
import { NOW_ITEMS, STACK_ITEMS } from "@/lib/config";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- Interactive Components ---

const PostcardCard = ({ 
  svgPath, 
  label = "SVG Powered",
  shootingStar = true 
}: { 
  svgPath: string, 
  label?: string,
  shootingStar?: boolean 
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 30 });

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  return (
    <motion.div
      style={{ perspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative w-full max-w-[420px] mx-auto group cursor-none"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative aspect-[3/4] bg-black rounded-[2rem] overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10"
      >
        <div className="absolute inset-0 select-none">
          <img 
            src={svgPath} 
            alt="Postcard" 
            className="w-full h-full object-cover"
          />
          
          {shootingStar && (
            <motion.div 
              animate={{ 
                opacity: [0, 1, 0],
                x: [-100, 300],
                y: [100, -300]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                repeatDelay: 3,
                ease: "linear"
              }}
              className="absolute top-1/4 left-0 w-[150px] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent rotate-[-35deg] blur-[1px] z-10"
            />
          )}
        </div>
      </motion.div>
      
      <div className="absolute -right-4 -bottom-4 bg-[#FF7A00] text-white text-[11px] font-mono px-3 py-1.5 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500 uppercase tracking-widest z-20">
        {label}
      </div>
    </motion.div>
  );
};

const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic strength
    const strength = 40;
    const deltaX = (clientX - centerX) / strength;
    const deltaY = (clientY - centerY) / strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={`magnetic-wrap ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- Main Page Component ---

export default function HomePageClient({ 
  posts, 
  works, 
  children 
}: { 
  posts: BlogPost[], 
  works: ProjectWork[], 
  children: React.ReactNode 
}) {
  const { scrollYProgress } = useScroll();
  const [showWeChat, setShowWeChat] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyWeChat = () => {
    navigator.clipboard.writeText("Clearchenxi"); // 已更新为您的微信号
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovered(true);
        document.body.classList.add('hover-active');
      } else {
        setIsHovered(false);
        document.body.classList.remove('hover-active');
      }
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black font-sans selection:bg-white selection:text-black scroll-smooth">
      {/* WeChat Modal */}
      <AnimatePresence>
        {showWeChat && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWeChat(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10001] flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-white/5 p-10 rounded-[2.5rem] max-w-sm w-full text-center cursor-default relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
            >
              <h3 className="text-xl font-serif italic mb-10 text-white/90 tracking-tight">Connect with me</h3>
              
              {/* QR Code */}
              <div className="w-64 mx-auto bg-white rounded-3xl mb-10 flex items-center justify-center overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-500">
                <img src="/wechat-qr.png" alt="WeChat QR Code" className="w-full h-auto block" />
              </div>

              <button 
                onClick={copyWeChat}
                className="w-full py-5 bg-white text-black rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all active:scale-95 shadow-xl"
              >
                {copied ? "ID Copied!" : "Copy WeChat ID"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />
      
      {/* Subtle Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9997] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Hero Section - Black Background */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={stagger}
        className="relative min-h-screen flex flex-col justify-center bg-black text-white px-8 md:px-20 py-24"
      >
        {/* Navigation */}
        <nav className="absolute top-0 left-0 w-full p-6 md:p-12 flex justify-between items-center z-50">
          <motion.div 
            variants={fadeIn} 
            className="text-xl md:text-2xl font-art italic tracking-widest text-white/90 group cursor-pointer flex items-baseline"
          >
            Clear <span className="font-art-cn not-italic text-sm md:text-base tracking-[0.3em] ml-2 md:ml-3 transition-all group-hover:italic group-hover:ml-4 opacity-70 group-hover:opacity-100">晨曦</span>
          </motion.div>
          <motion.div variants={fadeIn} className="flex gap-4 md:gap-8 text-[11px] md:text-sm text-white/90 font-light uppercase tracking-widest">
            <a href="#works" className="hover:text-white transition-colors py-2">Works</a>
            <a href="#core" className="hover:text-white transition-colors py-2">Core</a>
            <a href="#blog" className="hover:text-white transition-colors py-2">Blog</a>
            <a href="#special" className="hover:text-white transition-colors py-2">Special</a>
            <a href="#contact" className="hover:text-white transition-colors py-2">Contact</a>
          </motion.div>
        </nav>

        {/* Hero Content - Split Layout (Photo and Text) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center max-w-5xl mx-auto w-full relative z-10 mt-20 md:mt-12">
          
          {/* Left: Text Content (60% on large screens) */}
          <div className="md:col-span-7 flex flex-col items-start text-left order-2 md:order-1 px-4 md:px-0">
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 md:mb-10 tracking-tight leading-[1.1]"
            >
              Strategist. <br /> 
              <span className="italic text-zinc-400">Creator. Writer.</span>
            </motion.h1>
            
            <motion.div 
              variants={fadeIn}
              className="space-y-4 mb-8 md:mb-12"
            >
              <p className="text-zinc-400 font-art italic text-lg md:text-xl tracking-wide">Clear 晨曦</p>
              <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-lg max-w-sm opacity-80">
                于逻辑与灵犀交汇处，寻一抹数字晨曦。
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <MagneticButton>
                <a href="#contact" className="px-8 md:px-12 py-4 md:py-5 bg-white text-black rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold hover:bg-zinc-200 transition-all shadow-2xl active:scale-95 inline-block">
                  Get in touch
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right: Photo (40% on large screens) */}
          <div className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2 px-4 md:px-0">
            <motion.div 
              variants={fadeIn}
              whileHover={{ scale: 1.03 }}
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ 
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                duration: 1
              }}
              className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] bg-zinc-900 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-zinc-800 grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_0_80px_-15px_rgba(255,255,255,0.15)] group cursor-none"
            >
              {/* Subtle Glow behind photo */}
              <div className="absolute inset-0 bg-white/5 rounded-full blur-[60px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="w-full h-full bg-[url('/me.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-1000 relative z-10" />
            </motion.div>
          </div>
        </div>

        {/* Hero Footer */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex justify-between items-center text-[10px] tracking-[0.4em] text-white/80 uppercase">
          <motion.span variants={fadeIn}>Homepage {new Date().getFullYear()}</motion.span>
          <motion.span variants={fadeIn}>©CLEAR {new Date().getFullYear()}</motion.span>
        </div>
      </motion.section>

      {/* 01. Works Section - White Background */}
      <div id="works" className="bg-white text-black selection:bg-black selection:text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-8 md:px-20 py-32 md:py-64">
          <motion.section 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <div className="flex items-center gap-4 mb-24 overflow-hidden">
              <motion.span variants={fadeIn} className="text-black font-mono text-sm tracking-tighter">01.</motion.span>
              <motion.h2 variants={fadeIn} className="text-4xl font-serif tracking-tight italic">Works / <span className="font-art-cn not-italic">项目作品</span></motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
              {works.map((work, idx) => (
                <Link key={idx} href={`/works/${work.slug}`} className="block group cursor-none">
                  <motion.div variants={fadeIn}>
                    <div className="relative aspect-[4/3] bg-zinc-100 rounded-lg overflow-hidden mb-6 border border-zinc-100/50 shadow-sm transition-transform duration-700 group-hover:-translate-y-1">
                      <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" style={{ backgroundImage: `url(${work.image})` }} />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-[11px] text-black/60 uppercase tracking-widest font-medium">{work.category}</p>
                        <span className="text-[10px] font-mono text-black/40">{work.year}</span>
                      </div>
                      <h3 className="text-lg font-serif tracking-tight group-hover:italic transition-all duration-500">{work.title}</h3>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {/* 02. Core Section - Black Background (Moved Up) */}
      <div id="core" className="bg-black text-white selection:bg-white selection:text-black overflow-hidden relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-8 md:px-20 py-24 md:py-32">
          <motion.section 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <div className="flex items-center gap-4 mb-20 overflow-hidden">
              <motion.span variants={fadeIn} className="text-white/90 font-mono text-sm tracking-tighter">02.</motion.span>
              <motion.h2 variants={fadeIn} className="text-3xl font-serif tracking-tight italic">Core / <span className="font-art-cn not-italic">核心身份</span></motion.h2>
            </div>

            <motion.div variants={fadeIn}>
              {children}
            </motion.div>
          </motion.section>
        </div>
      </div>

      {/* 03. Blog Section - White Background (Moved Down and Color Changed) */}
      <div id="blog" className="bg-white text-black selection:bg-black selection:text-white overflow-hidden relative border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-6 py-32 md:py-64">
          <motion.section 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <div className="flex items-center gap-4 mb-16 overflow-hidden">
              <motion.span variants={fadeIn} className="text-black font-mono text-sm tracking-tighter">03.</motion.span>
              <motion.h2 variants={fadeIn} className="text-3xl font-serif tracking-tight italic">Blog / <span className="font-art-cn not-italic">思考札记</span></motion.h2>
            </div>

            <div className="space-y-4">
              {posts.map((post, idx) => (
                <Link key={idx} href={`/blog/${post.slug}`} className="block group">
                  <motion.div variants={fadeIn} className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-zinc-200/50 cursor-none relative overflow-hidden">
                    <div className="absolute inset-0 bg-zinc-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 relative z-10 px-4 md:px-0 transition-transform duration-500 group-hover:translate-x-4">
                      <span className="text-[11px] font-mono text-black/40 uppercase tracking-widest">{post.date}</span>
                      <h3 className="text-xl font-serif group-hover:italic transition-all duration-500">{post.title}</h3>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-2 text-sm text-black/30 font-light px-4 md:px-0 transition-all duration-500 group-hover:text-black group-hover:-translate-x-4">
                      <span>{post.readTime} read</span>
                      <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {/* 04. Now & Stack Section - Black Background */}
      <div id="status" className="bg-black text-white selection:bg-white selection:text-black overflow-hidden relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-8 md:px-20 py-24 md:py-32">
          <motion.section 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <div className="grid md:grid-cols-2 gap-24">
              <motion.section variants={stagger}>
                <div className="flex items-center gap-3 mb-12 overflow-hidden">
                  <Activity size={18} className="text-white/40" />
                  <motion.h2 variants={fadeIn} className="text-xl font-serif italic tracking-tight text-white/90">Now / <span className="font-art-cn not-italic">正在忙什么</span></motion.h2>
                </div>
                <ul className="space-y-6 text-sm text-white/90 font-light leading-relaxed">
                  {NOW_ITEMS.map((item, i) => (
                    <motion.li key={i} variants={fadeIn} className="flex gap-4 group">
                      <span className="text-white/20 group-hover:text-white transition-colors mt-1">•</span> 
                      <span className="group-hover:translate-x-1 transition-transform group-hover:text-white/90">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>

              <motion.section variants={stagger}>
                <div className="flex items-center gap-3 mb-12 overflow-hidden">
                  <Code size={18} className="text-white/40" />
                  <motion.h2 variants={fadeIn} className="text-xl font-serif italic tracking-tight text-white/90">Stack / <span className="font-art-cn not-italic">技术栈</span></motion.h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {STACK_ITEMS.map((tech, idx) => (
                    <motion.span 
                      key={idx} 
                      variants={fadeIn}
                      whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000", borderColor: "#fff" }}
                      className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono uppercase tracking-widest text-white/60 transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.section>
            </div>
          </motion.section>
        </div>
      </div>

      {/* 05. Special Moment Section - Soft Dark/Grey Transition (Fifth Part) */}
      <div id="special" className="bg-zinc-50 overflow-hidden relative border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-8 md:px-20 py-32 md:py-48 space-y-32">
          {[
            {
              id: "05.",
              title: "Special / 记念",
              quote: '"Adventure Begins."',
              description: "这不仅是一张明信片，更是 2025 年夏天在杭州 AdventureX 留下的足迹。艺术与代码的碰撞，从这里开始。",
              location: "Hangzhou",
              event: "AdventureX 2025",
              svgPath: "/Clear晨曦流星.svg",
              label: "SVG Powered"
            }
          ].map((moment, idx) => (
            <div key={idx} className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <span className="text-black/40 font-mono text-sm tracking-tighter">{moment.id}</span>
                  <h2 className="text-3xl font-serif tracking-tight italic">
                    {moment.title.split(' / ')[0]} / <span className="font-art-cn not-italic">{moment.title.split(' / ')[1]}</span>
                  </h2>
                </div>
                <p className="text-zinc-500 font-light leading-relaxed text-lg italic font-serif">
                  {moment.quote} <br />
                  {moment.description}
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-mono text-black/40 uppercase tracking-widest">Location</span>
                    <span className="text-sm font-serif italic">{moment.location}</span>
                  </div>
                  <div className="w-[1px] h-8 bg-zinc-200" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-mono text-black/40 uppercase tracking-widest">Event</span>
                    <span className="text-sm font-serif italic">{moment.event}</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <PostcardCard svgPath={moment.svgPath} label={moment.label} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section in Dark Theme */}
      <div className="bg-black text-white selection:bg-white selection:text-black overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.footer 
            id="contact"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="pt-24 pb-32 border-t border-zinc-900"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
              <div className="space-y-6">
                <motion.h3 variants={fadeIn} className="text-xl font-serif italic tracking-tight text-white/90">Let's build something beautiful.</motion.h3>
                <motion.div variants={fadeIn}>
                  <MagneticButton>
                    <a 
                      href="mailto:jchenxi13@gmail.com" 
                      className="text-2xl md:text-4xl font-serif border-b border-zinc-800 pb-2 hover:border-white transition-all inline-block group text-white/90"
                    >
                      jchenxi13@gmail.com
                    </a>
                  </MagneticButton>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-[11px] font-mono tracking-[0.2em] uppercase text-white/90">
                {[
                  { name: "WeChat", onClick: () => setShowWeChat(true), icon: MessageCircle },
                  { name: "Github", href: "https://github.com/ClearKnight", icon: Github },
                  { name: "X", href: "https://x.com/Clear_Chenxi", icon: Twitter },
                  { name: "Resume", href: "/Resume.pdf", icon: Download }
                ].map((social, i) => (
                  social.onClick ? (
                    <button key={i} onClick={social.onClick} className="flex items-center gap-2 group hover:text-white transition-colors cursor-none text-left uppercase">
                      <social.icon size={12} className="opacity-70 group-hover:opacity-100" />
                      {social.name}
                      <ArrowUpRight size={10} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group hover:text-white transition-colors">
                      <social.icon size={12} className="opacity-70 group-hover:opacity-100" />
                      {social.name} 
                      <ArrowUpRight size={10} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )
                ))}
              </div>
            </div>
            
            <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-zinc-900/50 pt-12">
              <motion.p
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 1.2 }}
                className="text-[10px] font-sans tracking-[0.4em] uppercase text-white/60"
              >
              CONCEIVED IN THOUGHT & REALIZED IN DAWN. © 2026
              </motion.p>

              <motion.div
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="flex gap-8 text-[10px] font-sans tracking-[0.2em] uppercase text-white/80"
              >
                <span className="opacity-50">Local Time</span>
                <span>
                {mounted ? new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : "--:--"} HGH
              </span>
              </motion.div>
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}
