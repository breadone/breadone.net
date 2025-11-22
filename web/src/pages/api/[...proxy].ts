import type { APIRoute } from "astro";

export const prerender = false

const getProxyUrl = (request: Request) => {
  const proxyUrl = new URL(import.meta.env.PUBLIC_PB_URL);
  const requestUrl = new URL(request.url);
  return new URL(requestUrl.pathname + requestUrl.search, proxyUrl);
};

export const ALL: APIRoute = async ({ request }) => {
  const proxyUrl = getProxyUrl(request);
  const response = await fetch(proxyUrl.href, request);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
};