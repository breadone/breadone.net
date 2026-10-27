// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import awsAmplify from 'astro-aws-amplify';

// https://astro.build/config
export default defineConfig({
  site: "https://breadone.net",

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: awsAmplify(),

  env: {
    schema: {
      S3_BUCKET_NAME: envField.string({
        context: 'server',
        access: 'secret',
        optional: false
      }),

      CLOUDFRONT_DOMAIN: envField.string({
        context: 'server',
        access: 'secret',
        optional: false
      }),
    }
  }
});
