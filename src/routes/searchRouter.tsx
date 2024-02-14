import { Elysia, t, InternalServerError } from 'elysia';
import { html } from '@elysiajs/html';
import { GuideText, Link } from '../pages/home';
import { readdir } from 'node:fs/promises';
import FuzzySearch from 'fuzzy-search';
import { parseToHtml } from '../parser/markdownToHtml';
import path from 'path';
import { app } from '..';

const highlightQuery = (query: string, text: string): JSX.Element => {
  if (!query) {
    return <>{text}</>;
  }

  const splitText = text.split(new RegExp(`(${query})`, 'gi'));

  return (
    <>
      {splitText.map((chunk) =>
        chunk.toLowerCase() === query.toLowerCase() ? (
          <span class="highlight-link">{chunk}</span>
        ) : (
          <>{chunk}</>
        )
      )}
    </>
  );
};

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
      {links.map(({ href, title, src }, index) => {
        return (
          <Link href={href} src={src} isHome={true}>
            {index === 0 && queryString ? (
              <span class="highlight-rosewater">
                {highlightQuery(queryString, title)}{' '}
              </span>
            ) : (
              highlightQuery(queryString, title)
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

const blogPath = path.join(__dirname, '../../blogs');
const blogs = await readdir(blogPath);

async function searchBlogs(queryString: string) {
  const newLinks = blogs.map(
    (blog): InternalLink => ({
      title: blog,
      href: `/blogs/${blog}`,
      src: 'https://www.svgrepo.com/show/368813/markdown.svg',
    })
  );
  const allLinks = internalLinks.concat(newLinks);
  const searcher = new FuzzySearch(
    allLinks.map((link) => {
      link.title = link.title.split('-').join(' ');
      return link;
    }),
    ['title']
  );
  const result = searcher.search(queryString.split('-').join(' '));
  return result.map((link) => {
    link.title = link.title.split(' ').join('-');
    return link;
  });
}

export const searchRouter = new Elysia()
  .use(html())
  .get(
    '/search',
    async ({ query: { queryString } }) => {
      try {
        const result = await searchBlogs(queryString);
        return <LinkList links={result} queryString={queryString} />;
      } catch (e) {
        console.log(e);
        throw new InternalServerError();
      }
    },
    {
      query: t.Object({
        queryString: t.String(),
      }),
    }
  )
  .get(
    '/search/preview',
    async ({ query: { queryString, home }, cookie: { lastResult }, set }) => {
      queryString = decodeURIComponent(queryString);
      if (queryString === '') {
        return <>{home && <GuideText />}</>;
      }
      const topResult = (await searchBlogs(queryString))[0];
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
          const markdown = Bun.file(`blogs/${topResult.title}`);
          const html = parseToHtml(await markdown.text());
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
        lastResult.value === topResult.href;
        return (
          <>
            <p>External Link to: </p>
            <a href={topResult.href}>
              <span class="highlight-link">{topResult.href}</span>
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
    async ({ set, query: { queryString } }) => {
      try {
        const topResult = (await searchBlogs(queryString))[0];
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
