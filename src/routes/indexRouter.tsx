import { Elysia } from 'elysia';
// import { html } from '@elysiajs/html';
import { Home } from '../pages/home/index';

export const indexRouter = new Elysia().get('/', () => <Home />);
