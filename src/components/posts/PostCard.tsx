import React from 'react';
import { Post } from '../../types/post';
import { formatRelativeTime } from '../../utils/date';
import { MoreVertical, MessageCircle, Heart, Share2, Trash } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface PostCardProps {
  post: Post;
  onDelete?: (id: string) => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  const { user } = useAuthStore();
  const isAuthor = user?.id === post.userId;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            {post.author?.avatarUrl ? (
              <img 
                src={post.author.avatarUrl} 
                alt={post.author.username}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-xl font-bold text-gray-400">
                {post.author?.username.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {post.author?.fullName}
            </h3>
            <p className="text-sm text-gray-500">
              @{post.author?.username} · {formatRelativeTime(post.createdAt)}
            </p>
          </div>
        </div>
        <div className="relative">
          {isAuthor && (
            <button 
              onClick={() => onDelete?.(post.id)}
              className="p-2 hover:bg-red-50 rounded-full text-red-600"
            >
              <Trash size={18} />
            </button>
          )}
        </div>
      </div>

      <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>

      <div className="flex items-center justify-between pt-4 border-t">
        <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600">
          <MessageCircle size={20} />
          <span className="text-sm">Comment</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:text-pink-600">
          <Heart size={20} />
          <span className="text-sm">Like</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600">
          <Share2 size={20} />
          <span className="text-sm">Share</span>
        </button>
      </div>
    </div>
  );
}