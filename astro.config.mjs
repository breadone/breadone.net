// @ts-check
import { defineConfig } from "astro/config";
import { envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://breadone.net",

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: node({
    mode: "standalone",
  }),

  image: {
    domains: ["*amazonaws.com"],
  },

  env: {
    schema: {
      AWS_ACCESS_KEY_ID: envField.string({
        context: 'server',
        access: 'secret',
        optional: false
      }),

      AWS_SECRET_ACCESS_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: false
      }),

      S3_BUCKET_NAME: envField.string({
        context: 'server',
        access: 'secret',
        optional: false
      }),

      AWS_REGION: envField.string({
        context: 'server',
        access: 'secret', // not actually but it allows runtime access
        optional: false
      }),
    }
  }
});
