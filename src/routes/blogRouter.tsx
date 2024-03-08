import { Elysia, NotFoundError, t } from 'elysia';
import { html } from '@elysiajs/html';
import { Blog } from '../pages/blog';
import { getBlogById } from '../database/tables/Blog';

export const blogRouter = new Elysia().use(html()).get(
  '/blogs/:id',
  async ({ params: { id } }) => {
    try {
      const blog = await getBlogById(parseInt(id));
      return <Blog markdown={blog.body} blogName={blog.title} />;
    } catch (e) {
      throw new NotFoundError();
    }
  },
  { params: t.Object({ id: t.String() }) }
);
