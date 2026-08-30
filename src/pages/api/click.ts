import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';

export const prerender = false; // Required for dynamic serverless routes in Astro

const redis = Redis.fromEnv();
const CLICKS_KEY = 'global_portfolio_clicks';

export const GET: APIRoute = async () => {
  try {
    const count = (await redis.get<number>(CLICKS_KEY)) ?? 0;
    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch clicks' }), { status: 500 });
  }
};

export const POST: APIRoute = async () => {
  try {
    // INCR atomically increments the integer value of key by one
    const newCount = await redis.incr(CLICKS_KEY);
    return new Response(JSON.stringify({ count: newCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to increment clicks' }), { status: 500 });
  }
};