import { HtmlLayout } from '../../components/HtmlLayout';
import { Telescope } from '../../components/Telescope';
import { marked } from 'marked';
import { telescopeBorder } from '../home';

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
        lg:w-[calc(100%-80px)]
        w-[calc(100%)]
        mt-10
        mb-10
        p-5
        sm:p-10
        relative
        bg-base
        sm:rounded
        rounded-none
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
