import { Elysia, ListenCallback } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { html } from '@elysiajs/html';
import open from 'open';

import { indexRouter } from './routes/indexRouter';
import { blogRouter } from './routes/blogRouter';
import { searchRouter } from './routes/searchRouter';

const PORT = process.env.PORT || 3000;

declare global {
  var ws: any;
  var isOpened: boolean;
}
export const app = new Elysia()
  .use(staticPlugin())
  .use(html())
  .use(indexRouter)
  .use(blogRouter)
  .use(searchRouter)
  .ws(`/live-reload`, {
    open: (ws) => {
      globalThis.ws = ws;
    },
  });

// hot reload for server when running dev
const callback: ListenCallback = async ({ hostname, port }) => {
  if (!globalThis.isOpened) {
    globalThis.isOpened = true;
    open(`http://${hostname}:${port}`); // https://www.npmjs.com/package/open
  }

  if (globalThis.ws) globalThis.ws.send('live-reload');
};

if (process.env.IS_DEV) {
  console.log(process.env.IS_DEV);
  console.log('Running in dev environment!');
  app.listen(PORT, callback);
} else {
  app.listen(PORT);
}

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
