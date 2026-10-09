// 1. Import the `Loader` type and any other dependencies needed
import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';

// 2. Define any options that your loader needs
export function imgLoader(options: { folderName: string }) {


  return {
    name: "img-loader",
    load: async ({ store, parseData }) => {
      const feed = await loadFeedData(feedUrl, options.apiKey);

      store.clear();

      for (const item of feed.items) {
        const id = item.guid;
        const data = await parseData({
          id,
          data: item,
        });
        store.set({
          id,
          data,
        });
      }
    },
    // 4. Define the schema of an entry.
    schema: z.object({
      // ...
    })
  } satisfies Loader;
}