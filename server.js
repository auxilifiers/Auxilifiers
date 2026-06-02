const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false;
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// ---- 301 redirects (admin-managed, from Supabase) -------------------------
// Next.js middleware does not run under a custom server, so redirects are
// handled here. The list is cached in memory for 60s. Everything is wrapped so
// a slow/failed lookup can never block a request or crash the server.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const REDIRECT_TTL = 60 * 1000;
let redirectCache = { at: 0, map: {} };

async function getRedirects() {
  if (Date.now() - redirectCache.at < REDIRECT_TTL) return redirectCache.map;
  if (!SUPABASE_URL || !SUPABASE_ANON || typeof fetch !== 'function') return redirectCache.map;
  // Refresh timestamp up front so a failing lookup isn't retried on every hit.
  redirectCache.at = Date.now();
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 2500);
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/redirects?select=from_path,to_path&enabled=eq.true`,
      {
        headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
        signal: ctrl.signal,
      },
    );
    clearTimeout(timer);
    if (res.ok) {
      const rows = await res.json();
      const map = {};
      for (const r of rows) {
        if (r && r.from_path && r.to_path) map[r.from_path] = r.to_path;
      }
      redirectCache = { at: Date.now(), map };
    }
  } catch (e) {
    // keep serving with whatever we had cached
  }
  return redirectCache.map;
}

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const pathname = parsedUrl.pathname || '/';

      // Check admin-managed 301 redirects (skip Next internals / api / admin).
      if (
        !pathname.startsWith('/_next') &&
        !pathname.startsWith('/api') &&
        !pathname.startsWith('/admin')
      ) {
        const map = await getRedirects();
        const target = map[pathname] || map[pathname.replace(/\/$/, '')];
        if (target && target !== pathname) {
          const location = target.startsWith('http')
            ? target
            : `${target}${parsedUrl.search || ''}`;
          res.writeHead(301, { Location: location });
          res.end();
          return;
        }
      }

      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
