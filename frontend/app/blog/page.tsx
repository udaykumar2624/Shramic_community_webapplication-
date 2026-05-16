import Link from "next/link";

import connectDB from "@/lib/db";
import Blog from "@/models/Blog";

export const dynamic = 'force-dynamic';

async function getPosts() {
  try {
    await connectDB();
    const posts = await Blog.find({}).lean();
    return posts as any[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

function getImage(slug: string) {
  const images: any = {
    "fair-wage-system":
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=1200",

    "rural-development":
      "https://imgs.search.brave.com/VUEwweFmy29xGy8F1UUqjm7KttCCRDQpILY_NE8gU9k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI4/MTExMjU0OC9waG90/by9hZXJpYWwtdmll/dy1jb21iaW5lLWhh/cnZlc3Rlci13b3Jr/aW5nLW9uLXRoZS1w/YWRkeS1maWVsZC1p/bi1hdXR1bW4uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPS13/cF9RMlI5eGRPeWNh/c3hZU2JJaUVoZGlv/TmJVS25tbjU1eG9K/T1paU009",

    "digital-farming":
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1200",

    "labour-rights":
      "https://imgs.search.brave.com/K6Vdk6prr2DCQXbWu94Rb8QwFg8lS2NkMzp0rO_HP4s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNzIv/NDQzLzI0MC9zbWFs/bC91bmRlcnN0YW5k/aW5nLWxhYm91ci1s/YXctcHJpbmNpcGxl/cy1lc3NlbnRpYWwt/Zm9yLWZhaXItd29y/a3BsYWNlLXByYWN0/aWNlcy1waG90by5q/cGc"
  };

  return images[slug] || images["fair-wage-system"];
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="bg-gradient-to-b from-slate-950 to-black min-h-screen text-white">

      {/* HERO */}
      <section className="px-6 md:px-12 lg:px-24 pt-20 pb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Stories from the Ground
        </h1>

        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Real voices. Real wages. Real empowerment.
          Explore how Shramic is transforming labour ecosystems across rural India.
        </p>
      </section>

      {/* FEATURED STORY */}
      <section className="px-6 md:px-12 lg:px-24 pb-20">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1600"
            className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

          <div className="absolute bottom-0 p-10">
            <span className="text-emerald-400 font-semibold">Featured Story</span>

            <h2 className="text-4xl font-bold mt-3 mb-4">
              Empowering Farmers Through Fair Labour Pricing
            </h2>

            <Link href="/blog/fair-wage-system">
              <button className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg font-semibold transition">
                Read Story →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="px-6 md:px-12 lg:px-24 pb-20">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-emerald-400">12,000+</h3>
            <p className="text-slate-400 mt-2">Workers Supported</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-amber-400">₹8Cr+</h3>
            <p className="text-slate-400 mt-2">Wages Tracked</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-sky-400">180+</h3>
            <p className="text-slate-400 mt-2">Villages Impacted</p>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        {posts.length === 0 ? (
          <p className="text-center text-gray-400">
            No stories available yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post: any) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.03] transition duration-500 shadow-xl hover:shadow-emerald-500/20 cursor-pointer">

                  <img
                    src={getImage(post.slug)}
                    className="h-56 w-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="p-6 space-y-3">
                    <span className="text-emerald-400 text-sm font-semibold">
                      Blog
                    </span>

                    <h2 className="text-xl font-bold group-hover:text-emerald-400 transition">
                      {post.title}
                    </h2>

                    <p className="text-slate-400 text-sm">
                      {post.content}
                    </p>

                    <div className="text-emerald-400 font-semibold text-sm">
                      Read Story →
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}
