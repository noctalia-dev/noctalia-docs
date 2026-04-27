import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      main: 'https://docs.noctalia.dev/v4/',
      gettingStarted: 'https://docs.noctalia.dev/v4/getting-started/',
      configuration: 'https://docs.noctalia.dev/v4/configuration/',
      theming: 'https://docs.noctalia.dev/v4/theming/',
      development: 'https://docs.noctalia.dev/v4/development/',
      v5: 'https://docs.noctalia.dev/v5/',
      faq: 'https://docs.noctalia.dev/v4/getting-started/faq/',
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


