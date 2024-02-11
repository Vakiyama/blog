import { Elysia } from 'elysia';
import { indexRouter } from './routes/indexRouter';
const PORT = process.env.PORT || 3000;

const app = new Elysia().use(indexRouter).listen(PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
