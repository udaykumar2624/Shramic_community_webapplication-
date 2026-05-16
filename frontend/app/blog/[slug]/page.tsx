import { notFound } from "next/navigation";

import connectDB from "@/lib/db";
import Blog from "@/models/Blog";

async function getPost(slug: string) {
  try {
    await connectDB();
    const post = await Blog.findOne({ slug }).lean();
    return post as any;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

export default async function BlogPost({ params }: any) {
  const { slug } = await params;  // ⭐ IMPORTANT FIX

  const post = await getPost(slug);

  if (!post) return notFound();

  return (
    <main className="bg-black min-h-screen text-white px-6 py-12">

      <h1 className="text-4xl font-bold mb-6">
        {post.title}
      </h1>

      <p className="text-gray-300 text-lg leading-relaxed">
        {post.content}
      </p>

    </main>
  );
}
