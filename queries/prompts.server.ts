import { createClient } from '@/utils/supabase/server';
import { Prompt } from '@/lib/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbToPrompt(row: any): Prompt {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    fullPrompt: row.full_prompt,
    image: row.image_url || 'https://picsum.photos/seed/default/640/480',
    tags: row.tags || [],
    author: {
      name: row.author_name || 'Anonymous',
      avatar: row.author_avatar || '',
    },
    likes: row.likes ?? 0,
    views: row.views ?? 0,
    copies: row.copies ?? 0,
    createdAt: row.created_at,
    trending: row.trending ?? false,
  };
}

/** Fetch a single prompt by ID — used in prompt detail page */
export async function getPromptById(id: string): Promise<Prompt | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !data) return null;
  return dbToPrompt(data);
}

/** Fetch all prompt IDs + updated_at — used for sitemap generation */
export async function getAllPromptsForSitemap(): Promise<
  { id: string; updatedAt: string }[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('prompts')
    .select('id, created_at')
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data.map((row) => ({ id: row.id as string, updatedAt: row.created_at as string }));
}
