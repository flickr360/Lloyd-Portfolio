import { Redis } from '@upstash/redis';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const redis = Redis.fromEnv();
const CLICKS_KEY = "global_portfolio_clicks";
const GET = async () => {
  try {
    const count = await redis.get(CLICKS_KEY) ?? 0;
    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch clicks" }), { status: 500 });
  }
};
const POST = async () => {
  try {
    const newCount = await redis.incr(CLICKS_KEY);
    return new Response(JSON.stringify({ count: newCount }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to increment clicks" }), { status: 500 });
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
