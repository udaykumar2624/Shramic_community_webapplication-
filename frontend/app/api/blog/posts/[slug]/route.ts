import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req: Request, { params }: { params: any }) {
  try {
    await connectDB();
    const { slug } = await params;
    const post = await Blog.findOne({ slug }).lean();

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
