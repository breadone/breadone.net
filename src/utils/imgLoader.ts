import type { Loader } from 'astro/loaders';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const s3 = new S3Client({
  region: import.meta.env.AWS_REGION || 'ap-southeast-2',
  credentials: {
    accessKeyId: import.meta.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY,
  },
});

export function imgLoader(): Loader {
  return {
    name: "s3-album-image-loader",
    load: async ({ store, parseData }) => {
      const BUCKET_NAME = import.meta.env.S3_BUCKET_NAME;
      
      // 1. Fetch all objects from S3
      const command = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
      const response = await s3.send(command);
      const objects = response.Contents || [];

      // Group S3 items by their folder slug
      const s3Albums: Record<string, string[]> = {};
      for (const obj of objects) {
        if (!obj.Key || obj.Key.endsWith('/')) continue;
        const parts = obj.Key.split('/');
        if (parts.length < 2) continue;

        const albumSlug = parts[0];
        if (!s3Albums[albumSlug]) s3Albums[albumSlug] = [];
        s3Albums[albumSlug].push(obj.Key);
      }

      // 2. Read local content definitions from disk
      // This looks inside `src/content/albums/` for any .md or .json configuration files
      const contentDir = path.resolve('./src/content/albums');
      if (!fs.existsSync(contentDir)) return;

      const files = fs.readdirSync(contentDir);
      store.clear();

      for (const file of files) {
        const ext = path.extname(file);

        const slug = path.basename(file, ext);
        const filePath = path.join(contentDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const parsed = matter(fileContent);
        const metadata = parsed.data;

        // 3. Grab matching photos from S3 registry, fallback to empty array if no folder found
        const photoKeys = s3Albums[slug] || [];

        // Apply your numeric filenames sort block
        photoKeys.sort((a, b) => {
          const numA = parseInt(a.split('/').pop() || '0', 10);
          const numB = parseInt(b.split('/').pop() || '0', 10);
          return numA - numB;
        });

        // 4. Assemble standard schema properties directly out of the markdown/json files
        const rawAlbumData = {
          title: metadata.title || slug,
          remarks: parsed.data || '',
          pubDate: metadata.pubDate ? new Date(metadata.pubDate) : new Date(),
          location: metadata.location || '',
          s3key: slug,
          photos: photoKeys.map((key) => ({ id: key }))
        };

        const data = await parseData({
          id: slug,
          data: rawAlbumData
        });

        store.set({
          id: slug,
          data
        });
      }
    }
  };
}
