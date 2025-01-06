import React from 'react';
import { CreatePost } from '../components/posts/CreatePost';
import { PostCard } from '../components/posts/PostCard';
import { usePosts } from '../hooks/usePosts';
import { Loader2 } from 'lucide-react';

export function Feed() {
  const { posts, loading, createPost, deletePost } = usePosts();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <CreatePost onSubmit={createPost} />
      
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post}
            onDelete={deletePost}
          />
        ))}
        
        {posts.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No posts yet. Be the first to post!
          </div>
        )}
      </div>
    </div>
  );
}