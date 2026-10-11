import type { Loader } from "astro/loaders";
import { fileURLToPath } from "node:url";
import { readdir, readFile } from "node:fs/promises";
import path from 'node:path';
import matter from 'gray-matter';
import { listAlbumObjectKeys } from "@utils/s3";

export function imgLoader(): Loader {
  return {
    name: "s3-album-image-loader",
    load: async ({ config, store, parseData, renderMarkdown, generateDigest }) => {
      const contentDir = fileURLToPath(new URL("src/content/albums/", config.root));
      const files = await readdir(contentDir, { withFileTypes: true });

      store.clear();

      for (const file of files) {
        if (!file.isFile()) continue;

        const ext = path.extname(file.name).toLowerCase();

        const slug = path.basename(file.name, ext);
        const filePath = path.join(contentDir, file.name);
        const fileContent = await readFile(filePath, "utf-8");
        const photos = (await listAlbumObjectKeys(slug)).map((key) => ({ id: key }));

        if (ext === ".md") {
          const parsed = matter(fileContent);
          const metadata = parsed.data as Record<string, unknown>;
          const body = parsed.content.trim();

          const rawAlbumData = {
            title: typeof metadata.title === "string" ? metadata.title : slug,
            remarks: typeof metadata.remarks === "string" ? metadata.remarks : undefined,
            pubDate: metadata.pubDate ? new Date(String(metadata.pubDate)) : new Date(),
            location: typeof metadata.location === "string" ? metadata.location : "",
            s3key: slug,
            photos,
          };

          const data = await parseData({
            id: slug,
            data: rawAlbumData,
          });

          const rendered = body
            ? await renderMarkdown(body)
            : undefined;

          store.set({
            id: slug,
            data,
            body,
            rendered,
            digest: generateDigest({ ...rawAlbumData, body, photos }),
          });

          continue;
        }

        const metadata = JSON.parse(fileContent) as Record<string, unknown>;

        const rawAlbumData = {
          title: typeof metadata.title === "string" ? metadata.title : slug,
          description: typeof metadata.description === "string" ? metadata.description : undefined,
          remarks: typeof metadata.remarks === "string" ? metadata.remarks : undefined,
          pubDate: metadata.pubDate ? new Date(String(metadata.pubDate)) : new Date(),
          location: typeof metadata.location === "string" ? metadata.location : "",
          s3key: slug,
          photos,
        };

        const data = await parseData({
          id: slug,
          data: rawAlbumData,
        });

        store.set({
          id: slug,
          data,
          digest: generateDigest({ ...rawAlbumData, photos }),
        });
      }
    }
  };
}
