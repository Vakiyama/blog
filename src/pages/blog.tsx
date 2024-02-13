import { parseToHtml } from '../parser/markdownToHtml';
import { HtmlLayout } from '../components/htmlLayout';

export const Blog = ({ markdown }: { markdown: string }) => {
  const html = parseToHtml(markdown);
  return (
    <HtmlLayout css={['home.css']} title="Blog">
      <main class="blog">
        <article>{html}</article>
      </main>
    </HtmlLayout>
  );
};
