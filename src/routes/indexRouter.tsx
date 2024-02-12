import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { Home } from '../pages/home';

export const indexRouter = new Elysia().use(html()).get('/', () => {
  return <Home />;
});
