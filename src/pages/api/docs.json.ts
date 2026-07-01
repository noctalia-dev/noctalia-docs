import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      main: 'https://docs.noctalia.dev/v5/',
      gettingStarted: 'https://docs.noctalia.dev/v5/getting-started/',
      configuration: 'https://docs.noctalia.dev/v5/configuration/',
      theming: 'https://docs.noctalia.dev/v5/theming/',
      development: 'https://docs.noctalia.dev/v4/development/',
      v4: 'https://docs.noctalia.dev/v4/',
      faq: 'https://docs.noctalia.dev/v5/getting-started/faq/',
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


