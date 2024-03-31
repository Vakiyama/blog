import { HtmlLayout } from '../components/HtmlLayout';
import { Telescope } from './Home';
import { marked } from 'marked';
import { telescopeBorder } from './Home';

export const Blog = ({
  markdown,
  blogName,
}: {
  markdown: string;
  blogName: string;
}) => {
  const html = marked.parse(markdown);
  return (
    <HtmlLayout title={blogName}>
      <>
        <Telescope home={false} />
        <main
          class="
        max-w-[840px]
        w-[calc(100%-80px)]
        p-10
        relative
        "
        >
          {html}
        </main>
        <div class={`searchOpen ${telescopeBorder}`}>
          <img
            src="https://www.svgrepo.com/show/532555/search.svg"
            alt="search button"
          />
        </div>
        <script src="/public/js/blogScript.js"></script>
      </>
    </HtmlLayout>
  );
};
