import { Elysia, NotFoundError, t } from 'elysia';
import { Blog } from '../pages/blog/Blog';
import { blogs } from '../database/schema/blogs';
import { db } from '../database/client';
import { eq } from 'drizzle-orm';
import { posthogClient } from '../analytics/posthog';

export const blogRouter = new Elysia().get(
  '/blogs/:name',
  async ({ params: { name } }) => {
    try {
      const blog = (
        await db
          .select()
          .from(blogs)
          .where(eq(blogs.name, decodeURI(name)))
      )[0];
      /*
      posthogClient.capture({
        distinctId: 'anoynmous',
        event: 'navigate_blog',
        properties: { name: decodeURI(name) },
      });
      */
      return <Blog markdown={blog.contents} blogName={blog.name} />;
    } catch (e) {
      throw new NotFoundError();
    }
  },
  { params: t.Object({ name: t.String() }) }
);
