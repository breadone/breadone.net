import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

// 4. Define a `loader` and `schema` for each collection
const album = defineCollection({
  loader: file(`${import.meta.env.ALBUM}/_collection.json`),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    pubDate: z.coerce.date(),
    location: z.string(),
    remarks: z.string(),
    imageFolder: z.string(),
  }),
});

export const collections = { album };
