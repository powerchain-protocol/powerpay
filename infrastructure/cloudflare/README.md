# Cloudflare deployment

`apps/api` is the edge/API boundary. Configure Worker secrets for Helius, Clerk/JWKS, Supabase service role and fee quote signing through deployment secret management, never through public Expo variables.

Recommended edge controls: WAF, API rate limiting, request IDs, no-store API caching policy, webhook secret validation and restricted CORS for non-Solana-Action endpoints.
