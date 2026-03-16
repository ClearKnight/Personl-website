import { getAllPosts } from "@/lib/blog";
import { getAllWorks } from "@/lib/works";
import CoreSection from "@/components/CoreSection";
import HomePageClient from "./HomePageClient";

export default function Home() {
  const posts = getAllPosts();
  const works = getAllWorks();
  
  return (
    <HomePageClient posts={posts} works={works}>
      <CoreSection />
    </HomePageClient>
  );
}
