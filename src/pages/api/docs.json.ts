import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      main: 'https://docs.noctalia.dev/',
      gettingStarted: 'https://docs.noctalia.dev/getting-started/',
      configuration: 'https://docs.noctalia.dev/configuration/',
      theming: 'https://docs.noctalia.dev/theming/',
      development: 'https://docs.noctalia.dev/development/',
      faq: 'https://docs.noctalia.dev/getting-started/faq/',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    }
  );
};


