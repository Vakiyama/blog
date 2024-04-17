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
        <div class="blog-background bg-crust w-full">
          <Telescope home={false} />
          <main
            class="
        max-w-[840px]
        w-[calc(100%-80px)]
        mt-10
        mb-10
        p-10
        relative
        bg-base
        rounded
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
          <script src="/public/js/blogScripts.js"></script>
        </div>
      </>
    </HtmlLayout>
  );
};
