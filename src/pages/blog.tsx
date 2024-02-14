import { parseToHtml } from '../parser/markdownToHtml';
import { HtmlLayout } from '../components/htmlLayout';
import { Telescope } from './home';

export const Blog = ({
  markdown,
  blogName,
}: {
  markdown: string;
  blogName: string;
}) => {
  const html = parseToHtml(markdown);
  return (
    <HtmlLayout css={['home.css']} title={blogName}>
      <>
        <Telescope home={false} />
        <main class="blog">
          <article>{html}</article>
        </main>
      </>
    </HtmlLayout>
  );
};
