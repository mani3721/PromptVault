import type { MetadataRoute } from 'next';
import { getAllPromptsForSitemap } from '@/queries/prompts.server';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://promptvault.app';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sign-in`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  const prompts = await getAllPromptsForSitemap();
  const promptRoutes: MetadataRoute.Sitemap = prompts.map((p) => ({
    url: `${baseUrl}/prompts/${p.id}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...promptRoutes];
}
