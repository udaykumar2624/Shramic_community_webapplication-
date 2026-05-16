import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  slug: string;
  title: string;
  content: string;
}

const BlogSchema: Schema = new Schema({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

// Check if the model already exists to prevent OverwriteModelError in Next.js
const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
