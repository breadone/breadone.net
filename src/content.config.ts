import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const albums = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/albums' }),
  schema: z.object({
    title: z.string(),
    remarks: z.string(),
    pubDate: z.coerce.date(),
    slug: z.string(),
    location: z.string(),
    photos: z.array(
      z.object({
        id: z.string(),
        key: z.string(),
      })
    )
  })
});


export const collections = { album };
