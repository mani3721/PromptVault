export interface Author {
  name: string;
  avatar: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  fullPrompt: string;
  image: string;
  tags: string[];
  author: Author;
  likes: number;
  views: number;
  copies: number;
  createdAt: string;
  trending?: boolean;
}

export type SortOption = 'trending' | 'new' | 'most-copied';

export const ALL_TAGS = [
  'All',
  'Coding',
  'Creative',
  'Marketing',
  'Writing',
  'Design',
  'Business',
  'Research',
  'Education',
  'Productivity',
  'AI Art',
  'SEO',
  'Data',
] as const;

export type Tag = (typeof ALL_TAGS)[number];
