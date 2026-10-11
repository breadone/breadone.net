import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { imgLoader } from "@utils/imgLoader";
import { z } from "astro/zod";

const albums = defineCollection({
  loader: imgLoader(),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    location: z.string(),
    photos: z.array(
      z.object({
        id: z.string(),
      })
    )
  })
});


export const collections = { albums };
