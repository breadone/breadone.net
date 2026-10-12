import { defineCollection } from "astro:content";
import { imgLoader } from "@utils/imgLoader";
import { z } from "astro/zod";

const albums = defineCollection({
  loader: imgLoader(),
  schema: z.object({
    title: z.string(),
    remarks: z.string().optional(),
    pubDate: z.coerce.date(),
    location: z.string(),
  })
});


export const collections = { albums };
