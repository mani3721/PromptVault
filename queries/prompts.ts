import { createClient } from '@/utils/supabase/client';
import { Prompt } from '@/lib/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbToPrompt(row: any): Prompt {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    fullPrompt: row.full_prompt,
    image: row.image_url || 'https://picsum.photos/seed/default/640/360',
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

export async function getPrompts(): Promise<Prompt[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data.map(dbToPrompt);
}

export async function addPrompt(input: {
  title: string;
  description: string;
  fullPrompt: string;
  imageUrl: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar: string;
}): Promise<Prompt | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('prompts')
    .insert({
      title: input.title,
      description: input.description,
      full_prompt: input.fullPrompt,
      image_url: input.imageUrl,
      tags: input.tags,
      author_id: input.authorId,
      author_name: input.authorName,
      author_avatar: input.authorAvatar,
    })
    .select()
    .single();
  if (error || !data) return null;
  return dbToPrompt(data);
}

export async function uploadPromptImage(file: File): Promise<string | null> {
  const supabase = createClient();
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage
    .from('prompt-images')
    .upload(fileName, file, { cacheControl: '3600', upsert: false });
  if (error) return null;
  const { data } = supabase.storage.from('prompt-images').getPublicUrl(fileName);
  return data.publicUrl;
}

/** Returns the set of prompt IDs the user has liked */
export async function getUserLikes(userId: string): Promise<Set<string>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('prompt_likes')
    .select('prompt_id')
    .eq('user_id', userId);
  if (error || !data) return new Set();
  return new Set(data.map((r) => r.prompt_id as string));
}

/**
 * Toggles a like for the given prompt.
 * Returns true if now liked, false if unliked.
 */
export async function toggleLike(
  promptId: string,
  userId: string
): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('toggle_like', {
    p_prompt_id: promptId,
    p_user_id: userId,
  });
  if (error) return false;
  return data as boolean;
}

/**
 * Like/unlike for anonymous (non-logged-in) users.
 * p_liked = true  → increment, false → decrement
 */
export async function anonLike(promptId: string, liked: boolean): Promise<void> {
  const supabase = createClient();
  await supabase.rpc('anon_like', { p_prompt_id: promptId, p_liked: liked });
}

/** Increments the view count (fire-and-forget) */
export async function incrementViews(promptId: string): Promise<void> {
  const supabase = createClient();
  await supabase.rpc('increment_views', { prompt_id: promptId });
}

/** Increments the copy count (fire-and-forget) */
export async function incrementCopies(promptId: string): Promise<void> {
  const supabase = createClient();
  await supabase.rpc('increment_copies', { prompt_id: promptId });
}
