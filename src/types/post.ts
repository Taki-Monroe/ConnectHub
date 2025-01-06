export interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  author?: {
    username: string;
    fullName: string;
    avatarUrl?: string;
  };
}

export type CreatePostInput = Pick<Post, 'content'>;
export type UpdatePostInput = Pick<Post, 'content'>;