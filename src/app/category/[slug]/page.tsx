import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Navbar from "../../components/NavBar";

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => builder.image(source);

// Function to fetch posts by category
async function getPostsByCategory(category: string) {
  const query = `*[
    _type == "post" &&
    count((category[]->title)[@ match "${category}"]) > 0
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    image,
    "categories": category[]->title,
    "excerpt": array::join(string::split(pt::text(body), "")[0..200], "") + "..."
  }`;

  return client.fetch<SanityDocument[]>(query);
}

// Update the interface to match Next.js 14's type expectations
interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const posts = await getPostsByCategory(decodedSlug);

  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-screen max-w-6xl p-8 bg-black-500">
        <h1 className="mt-20 mb-8 text-4xl font-bold text-center">
          {decodedSlug} AI
        </h1>
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <li
              key={post._id}
              className="p-4 text-white rounded-lg shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "#181818" }}
            >
              <Link href={`/${post.slug.current}`}>
                <div className="flex flex-col gap-y-4">
                  {post.image && (
                    <div className="overflow-hidden rounded-md">
                      <Image
                        src={urlFor(post.image).width(300).height(200).url()}
                        alt={post.title}
                        width={300}
                        height={200}
                        className="object-cover w-full h-48 rounded-md transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-sm text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">{post.excerpt}</p>
                  </div>
                </div>
              </Link>
              <div className="flex flex-wrap gap-2 justify-center">
                {post.categories?.map((category: string, index: number) => (
                  <Link
                    key={index}
                    href={`/category/${encodeURIComponent(category)}`}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs mt-2 px-2 py-0.5 rounded-full inline-block cursor-pointer"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
} 