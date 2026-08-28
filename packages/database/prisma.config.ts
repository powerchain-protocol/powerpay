import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

// Prisma CLI/migrations use a direct/session connection. Runtime PowerPay edge services use
// Supabase REST today; a future Node runtime Prisma client should use the pooled DATABASE_URL.
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasource: {
    url: env('DIRECT_URL'),
    shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  },
});
