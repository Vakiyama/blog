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
        <main class="blog">{html}</main>
        <div class="searchOpen telescopeBorder">
          <img
            src="https://www.svgrepo.com/show/532555/search.svg"
            alt="search button"
          />
        </div>
      </>
    </HtmlLayout>
  );
};
