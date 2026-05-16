import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET() {
  try {
    await connectDB();
    const posts = await Blog.find().lean();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();
    const newPost = new Blog(body);
    await newPost.save();
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating post" }, { status: 500 });
  }
}
