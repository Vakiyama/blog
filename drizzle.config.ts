import type { Config } from 'drizzle-kit';

const isDev = process.env.IS_DEV;

const url = isDev ? process.env.LOCAL_DB_URL : process.env.DB_URL;
if (!url) throw new Error('Missing db url env variable');

const authToken = process.env.AUTH_TOKEN;
if (!authToken) throw new Error('Missing db auth token env variable');

const devConfig = {
  url,
};

const liveConfig = {
  ...devConfig,
  authToken,
};

console.log(isDev)
console.log(devConfig)

export default {
  schema: './src/database/schema/*.ts',
  out: './drizzle',
  driver: isDev ? 'better-sqlite' : 'turso',
  dbCredentials: isDev ? devConfig : liveConfig,
} satisfies Config;
