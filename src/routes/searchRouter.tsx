import { Elysia, t, InternalServerError } from 'elysia';
import { Link } from '../pages/home/components/Link';
import { GuideText } from '../pages/home/components/GuideText';
import fuzzy from 'fuzzy';
import { marked } from 'marked';
import { blogs } from '../database/schema/blogs';
import { db } from '../database/client';
// import { posthogClient } from '../analytics/posthog';

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
      {links.map(({ href, src, formated, name }, index) => {
        return (
          <Link
            href={href}
            src={src}
            isHome={true}
            external={!name.endsWith('md') && !name.endsWith('html')}
          >
            {index === 0 && queryString ? (
              <span class="text-rosewater">{formated && formated}</span>
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
  name: string;
  href: string;
  src: string;
  contents?: string;
  formated?: string;
};
const internalLinks: InternalLink[] = [
  {
    name: 'home.html',
    href: '/',
    src: 'https://www.svgrepo.com/show/478664/html-tag.svg',
  },
  {
    name: 'github/Vakiyama',
    href: 'https://github.com/Vakiyama',
    src: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
  },
];

type Blog = typeof blogs.$inferSelect;
let loadedBlogs: Blog[] = await db.select().from(blogs).all();

function searchBlogs(queryString: string) {
  /*
  posthogClient.capture({
    distinctId: 'anoynmous',
    event: 'user_searched',
    properties: { queryString },
  });
  */
  const newLinks = loadedBlogs.map(
    (blog): InternalLink => ({
      name: blog.name,
      href: `/blogs/${blog.name}`,
      contents: blog.contents,
      src: 'https://www.svgrepo.com/show/368813/markdown.svg',
    })
  );
  const allLinks = internalLinks.concat(newLinks);
  const options = {
    pre: '<span class="highlight-link text-blue">',
    post: '</span>',
    extract: (el: InternalLink) => el.name,
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
  .get(
    '/search',
    ({ query: { queryString, home } }) => {
      try {
        const result = searchBlogs(queryString);
        if (home) {
          const homeIndex = result.findIndex(
            (result) => result.name === 'home.html'
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
      if (lastResult.value === topResult.name) {
        set.status = 204;
        return;
      }
      if (topResult.name.endsWith('md')) {
        try {
          if (topResult.contents === undefined)
            throw new Error('Missing body in article');
          const html = marked.parse(topResult.contents);
          lastResult.value = topResult.name;
          return <>{html}</>;
        } catch (e) {
          console.log(e);
          throw new InternalServerError();
        }
      } else if (topResult.name.endsWith('html')) {
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
