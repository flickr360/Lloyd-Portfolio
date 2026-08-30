import { Redis } from '@upstash/redis';
export { renderers } from '../../renderers.mjs';

const prerender = false;
function getRedis() {
  const env = globalThis.process?.env || {};
  const url = env.UPSTASH_REDIS_REST_URL || "https://proven-anteater-186215.upstash.io";
  const token = env.UPSTASH_REDIS_REST_TOKEN || "gQAAAAAAAtdnAAIgcDI3YzVjMzI4OGQ2NGE0NzQyYjA4OGI1YmI5NzhjOWY1Zg";
  return new Redis({ url, token });
}
const CLICKS_KEY = "global_portfolio_clicks";
const GET = async () => {
  try {
    const redis = getRedis();
    const count = await redis.get(CLICKS_KEY) ?? 0;
    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate"
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch clicks";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async () => {
  try {
    const redis = getRedis();
    const newCount = await redis.incr(CLICKS_KEY);
    return new Response(JSON.stringify({ count: newCount }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate"
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to increment clicks";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
