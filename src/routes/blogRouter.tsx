import { Elysia, NotFoundError, t } from 'elysia';
import { html } from '@elysiajs/html';
import { Blog } from '../pages/Blog';
import { blogs } from '../database/schema/blogs';
import { db } from '../database/client';
import { eq } from 'drizzle-orm';

export const blogRouter = new Elysia().use(html()).get(
  '/blogs/:name',
  async ({ params: { name } }) => {
    try {
      const blog = (
        await db.select().from(blogs).where(eq(blogs.name, name))
      )[0];
      return <Blog markdown={blog.contents} blogName={blog.name} />;
    } catch (e) {
      throw new NotFoundError();
    }
  },
  { params: t.Object({ name: t.String() }) }
);
