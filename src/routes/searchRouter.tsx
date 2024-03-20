import { Elysia, t, InternalServerError } from 'elysia';
import { html } from '@elysiajs/html';
import { GuideText, Link } from '../pages/Home';
import fuzzy from 'fuzzy';
import { marked } from 'marked';
import { createBlogTable, getBlogs, type Blog } from '../database/tables/Blog';

function LinkList({
  links,
  queryString,
}: {
  links: InternalLink[];
  queryString: string;
}) {
  if (links.length === 0) {
    return <p>No Results Found!</p>;
  }

  return (
    <>
      {links.map(({ href, src, formated }, index) => {
        return (
          <Link href={href} src={src} isHome={true}>
            {index === 0 && queryString ? (
              <span class="highlight-rosewater">{formated && formated} </span>
            ) : (
              <>{formated ? formated : null}</>
            )}
          </Link>
        );
      })}
    </>
  );
}

// we also have our internal links

type InternalLink = {
  title: string;
  href: string;
  src: string;
  body?: string;
  formated?: string;
};
const internalLinks: InternalLink[] = [
  {
    title: 'index.html',
    href: '/',
    src: 'https://www.svgrepo.com/show/478664/html-tag.svg',
  },
  {
    title: 'github/Vakiyama',
    href: 'https://github.com/Vakiyama',
    src: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
  },
];

let blogs: Blog[];

try {
  blogs = await getBlogs();
} catch (e) {
  await createBlogTable();
  blogs = await getBlogs();
}

function searchBlogs(queryString: string) {
  const newLinks = blogs.map(
    (blog): InternalLink => ({
      title: blog.title,
      href: `/blogs/${blog.id}`,
      body: blog.body,
      src: 'https://www.svgrepo.com/show/368813/markdown.svg',
    })
  );
  const allLinks = internalLinks.concat(newLinks);
  const options = {
    pre: '<span class="highlight-link text-blue">',
    post: '</span>',
    extract: (el: InternalLink) => el.title,
  };
  const results = fuzzy
    .filter(queryString.trim(), allLinks, options)
    .map((result) => {
      result.original.formated = result.string;
      return result.original;
    });

  return results;
}

export const searchRouter = new Elysia()
  .use(html())
  .get(
    '/search',
    ({ query: { queryString, home } }) => {
      try {
        const result = searchBlogs(queryString);
        if (home) {
          const homeIndex = result.findIndex(
            (result) => result.title === 'index.html'
          );
          result.splice(homeIndex, homeIndex > -1 ? 1 : 0);
        }
        return <LinkList links={result} queryString={queryString} />;
      } catch (e) {
        console.log(e);
        throw new InternalServerError();
      }
    },
    {
      query: t.Object({
        queryString: t.String(),
        home: t.BooleanString(),
      }),
    }
  )
  .get(
    '/search/preview',
    async ({ query: { queryString, home }, cookie: { lastResult }, set }) => {
      const cleaningRegex = /<\/?span[^>]*>/g;
      queryString = decodeURIComponent(
        queryString.replaceAll(cleaningRegex, '')
      );
      if (queryString === '') {
        lastResult.value = 'guide';
        return <>{home && <GuideText />}</>;
      }
      const topResult = searchBlogs(queryString)[0];
      if (!topResult) {
        lastResult.value = queryString;
        return;
      }
      if (lastResult.value === topResult.title) {
        set.status = 204;
        return;
      }
      if (topResult.title.endsWith('md')) {
        try {
          if (topResult.body === undefined)
            throw new Error('Missing body in article');
          const html = marked.parse(topResult.body);
          lastResult.value = topResult.title;
          return <>{html}</>;
        } catch (e) {
          console.log(e);
          throw new InternalServerError();
        }
      } else if (topResult.title.endsWith('html')) {
        if (lastResult.value === 'index') {
          set.status = 204;
          return;
        }
        lastResult.value = 'index';
        return <GuideText />;
      } else {
        if (lastResult.value === topResult.href) {
          set.status = 204;
          return;
        }
        lastResult.value = topResult.href;
        return (
          <>
            <p>External Link to: </p>
            <a href={topResult.href}>
              <span class="highlight-link text-blue">{topResult.href}</span>
            </a>
          </>
        );
      }
    },
    {
      query: t.Object({
        queryString: t.String(),
        home: t.BooleanString(),
      }),
    }
  )
  .get(
    '/search/redirect-blog',
    ({ set, query: { queryString } }) => {
      try {
        const topResult = searchBlogs(queryString)[0];
        if (!topResult) {
          return;
        }
        set.headers['HX-Redirect'] = topResult.href;
      } catch (e) {
        throw new InternalServerError();
      }
    },
    {
      query: t.Object({
        queryString: t.String(),
      }),
    }
  );
