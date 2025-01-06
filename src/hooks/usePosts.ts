import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Post, CreatePostInput, UpdatePostInput } from '../types/post';
import toast from 'react-hot-toast';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    
    // Subscribe to real-time updates
    const subscription = supabase
      .channel('public:posts')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'posts' 
      }, handlePostChange)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePostChange = (payload: any) => {
    if (payload.eventType === 'INSERT') {
      setPosts(prev => [payload.new, ...prev]);
    } else if (payload.eventType === 'DELETE') {
      setPosts(prev => prev.filter(post => post.id !== payload.old.id));
    } else if (payload.eventType === 'UPDATE') {
      setPosts(prev => prev.map(post => 
        post.id === payload.new.id ? { ...post, ...payload.new } : post
      ));
    }
  };

  const createPost = async (input: CreatePostInput): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('posts')
        .insert([input]);

      if (error) throw error;
      toast.success('Post created successfully!');
      return true;
    } catch (error: any) {
      toast.error(error.message);
      return false;
    }
  };

  const updatePost = async (id: string, input: UpdatePostInput): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('posts')
        .update(input)
        .eq('id', id);

      if (error) throw error;
      toast.success('Post updated successfully!');
      return true;
    } catch (error: any) {
      toast.error(error.message);
      return false;
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Post deleted successfully!');
      return true;
    } catch (error: any) {
      toast.error(error.message);
      return false;
    }
  };

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost
  };
}