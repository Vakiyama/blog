import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { indexRouter } from './routes/indexRouter';
import { blogRouter } from './routes/blogRouter';
const PORT = process.env.PORT || 3000;

const app = new Elysia()
  .onBeforeHandle(({ request }) => {
    console.log(request.url);
  })
  .use(staticPlugin())
  .use(indexRouter)
  .use(blogRouter)
  .listen(PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
