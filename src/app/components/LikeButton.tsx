'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { client } from "@/sanity/client";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(
    typeof window !== 'undefined' && localStorage.getItem(`liked_${postId}`) === 'true'
  );
  const [error, setError] = useState<string | null>(null);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setError(null);
      console.log(isLiked ? 'Unliking post:' : 'Liking post:', postId);
      
      // Fetch the current post data to ensure the likes field exists
      const currentPost = await client.fetch(`*[_id == $postId]{likes}`, { postId });
      if (currentPost.length > 0) {
        const likesField = currentPost[0].likes ?? 0;

        await client
          .patch(postId)
          .setIfMissing({ likes: likesField })
          .inc({ likes: isLiked ? -1 : 1 })
          .commit();
      }

      localStorage.setItem(`liked_${postId}`, isLiked ? 'false' : 'true');
      setLikes(prev => prev + (isLiked ? -1 : 1));
      setIsLiked(!isLiked);
    } catch (error) {
      setError('Failed to update the post. Please try again later.');
      console.error('Error updating likes:', error);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <button
        onClick={handleLike}
        className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors"
      >
        <Heart
          className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'fill-none'}`}
        />
        <span>{likes}</span>
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
