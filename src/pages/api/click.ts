import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';

export const prerender = false;

function getRedis() {
  const env = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process?.env || {};
  const url = env.UPSTASH_REDIS_REST_URL || import.meta.env.UPSTASH_REDIS_REST_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN || import.meta.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error('Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN environment variables.');
  }

  return new Redis({ url, token });
}

const CLICKS_KEY = 'global_portfolio_clicks';

export const GET: APIRoute = async () => {
  try {
    const redis = getRedis();
    const count = (await redis.get<number>(CLICKS_KEY)) ?? 0;

    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch clicks';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async () => {
  try {
    const redis = getRedis();
    const newCount = await redis.incr(CLICKS_KEY);

    return new Response(JSON.stringify({ count: newCount }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to increment clicks';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};