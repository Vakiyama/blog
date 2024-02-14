import { Elysia, NotFoundError, t } from 'elysia';
import { html } from '@elysiajs/html';
import { Blog } from '../pages/blog';

export const blogRouter = new Elysia().use(html()).get(
  '/blogs/:blogName',
  async ({ params: { blogName } }) => {
    const markdownFile = Bun.file(`blogs/${blogName}`);
    if (markdownFile.size === 0) throw new NotFoundError();
    return <Blog markdown={await markdownFile.text()} blogName={blogName} />;
  },
  { params: t.Object({ blogName: t.String() }) }
);
