import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      main: 'https://docs.noctalia.dev/noctalia/',
      gettingStarted: 'https://docs.noctalia.dev/noctalia/getting-started/',
      configuration: 'https://docs.noctalia.dev/noctalia/configuration/',
      theming: 'https://docs.noctalia.dev/noctalia/theming/',
      development: 'https://docs.noctalia.dev/noctalia-shell/development/',
      v4: 'https://docs.noctalia.dev/noctalia-shell/',
      faq: 'https://docs.noctalia.dev/noctalia/getting-started/faq/',
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


