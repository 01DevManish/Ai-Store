'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/client'; // Sanity client configuration
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => builder.image(source);

interface SearchResult {
  _id: string;
  title: string;
  slug: { current: string };
  image?: SanityImageSource;
  publishedAt: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [allPosts, setAllPosts] = useState<SearchResult[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data: SearchResult[] = await client.fetch(
        `*[_type == "post"]{ _id, title, slug, image, publishedAt }`
      );
      setAllPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = allPosts
      .filter((post) =>
        post.title?.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5); // Limit suggestions to top 5 results
    setSuggestions(filteredSuggestions);
  }, [query, allPosts]);

  const highlightMatch = (text: string) => {
    const matchIndex = text.toLowerCase().indexOf(query.toLowerCase());
    if (matchIndex === -1) return text;

    const beforeMatch = text.slice(0, matchIndex);
    const matchText = text.slice(matchIndex, matchIndex + query.length);
    const afterMatch = text.slice(matchIndex + query.length);

    return (
      <>
        {beforeMatch}
        <span className="underline">{matchText}</span>
        {afterMatch}
      </>
    );
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 mt-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full p-4 mt-20 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {query && suggestions.length > 0 && (
        <ul className="absolute mt-2 bg-gray-800 text-white rounded-lg shadow-lg max-w-md mx-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              className="p-3 hover:bg-gray-700 flex items-start space-x-3 rounded-lg"
            >
              {suggestion.image ? (
                <Image
                  src={urlFor(suggestion.image).width(48).height(48).url()}
                  alt={suggestion.title}
                  width={48}
                  height={48}
                  className="object-cover w-12 h-12 rounded-md"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-700 rounded-md flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div>
                <Link href={`/${suggestion.slug.current}`}>
                  <h3 className="text-md font-semibold">
                    {highlightMatch(suggestion.title)}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500">
                  Published on {new Date(suggestion.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
