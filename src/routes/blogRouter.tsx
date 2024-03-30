import { Elysia, NotFoundError, t } from 'elysia';
import { html } from '@elysiajs/html';
import { Blog } from '../pages/Blog';
import { blogs } from '../database/schema/blogs';
import { db } from '../database/client';
import { eq } from 'drizzle-orm';

export const blogRouter = new Elysia().use(html()).get(
  '/blogs/:id',
  async ({ params: { id } }) => {
    try {
      const blog = (
        await db
          .select()
          .from(blogs)
          .where(eq(blogs.id, parseInt(id)))
      )[0];
      return <Blog markdown={blog.contents} blogName={blog.name} />;
    } catch (e) {
      throw new NotFoundError();
    }
  },
  { params: t.Object({ id: t.String() }) }
);
