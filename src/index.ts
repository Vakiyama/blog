import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { indexRouter } from './routes/indexRouter';
import { blogRouter } from './routes/blogRouter';
import { searchRouter } from './routes/searchRouter';
const PORT = process.env.PORT || 3000;

export const app = new Elysia()
  .use(staticPlugin())
  .use(indexRouter)
  .use(blogRouter)
  .use(searchRouter)
  .listen(PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
