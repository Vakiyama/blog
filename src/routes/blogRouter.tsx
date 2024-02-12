import { Elysia, NotFoundError } from 'elysia';
import { html } from '@elysiajs/html';
import { Blog } from '../pages/blog';

export const blogRouter = new Elysia()
  .use(html())
  .get('/blogs/:blogName', async ({ params }) => {
    const markdownFile = Bun.file(`blogs/${params.blogName}.md`);
    if (markdownFile.size === 0) throw new NotFoundError();
    return <Blog markdown={await markdownFile.text()} />;
  });
