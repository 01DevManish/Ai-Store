import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Navbar from "../components/NavBar";
import SearchBar from "../searchBar";
import LikeButton from '../components/LikeButton';

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc){
  _id, 
  title, 
  slug, 
  publishedAt, 
  image,
  likes,
  "categories": category[]->title,
  "excerpt": array::join(string::split(pt::text(body), "")[0..200], "") + "..."
}`;

const options = { next: { revalidate: 30 } };
const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => builder.image(source);

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <>
      <Navbar />
      <SearchBar />
      <main className="container mx-auto min-h-screen max-w-6xl p-4 sm:p-6 lg:p-8 bg-black-500">
        <h1 className="mt-10 mb-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white">
          AI Chrome Extension
        </h1>
   

        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <li
              key={post._id}
              className="p-4 text-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              style={{ backgroundColor: "#181818" }}
            >
              <Link href={`/${post.slug.current}`}>
                <div className="overflow-hidden rounded-lg">
                  {post.image && (
                    <div className="overflow-hidden rounded-lg h-36 sm:h-48">
                      <Image
                        src={urlFor(post.image).width(400).height(300).url()}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                  )}
                  <div className="text-center mt-2">
                    <h2 className="text-lg sm:text-xl font-semibold flex justify-between items-center">
                      {post.title}
                      <LikeButton postId={post._id} initialLikes={post.likes || 0} />
                    </h2>
                  </div>
                </div>
              </Link>
              <div className="flex flex-wrap gap-2 mt-2">
                {post.categories?.map((category: string, index: number) => (
                  <Link
                    key={index}
                    href={`/category/${encodeURIComponent(category)}`}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full inline-block cursor-pointer"
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
