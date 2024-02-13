import { HtmlLayout } from '../components/htmlLayout';

function Guide() {
  return (
    <>
      <div class="guide telescopeBorder">
        <div class="guide_textWrapper">
          <br />
          <p>
            Hello, I'm <span class="highlight-rosewater">Vitor</span>.
          </p>
          <p>Welcome to my blog.</p>
          <br />
          <p>
            Press{' '}
            <span class="highlight-command">
              <b>p + f</b>
            </span>{' '}
            to{' '}
            <span class="highlight-link">
              <b>search</b>
            </span>{' '}
            for a blog or link.
          </p>
          <p>
            Press{' '}
            <span class="highlight-command">
              <b>p + s</b>
            </span>{' '}
            to{' '}
            <span class="highlight-link">
              <b>search</b>
            </span>{' '}
            blog contents by keyword.
          </p>
          <p>These hotkeys will work anywhere on this site.</p>
        </div>
      </div>
    </>
  );
}

function Search() {
  return (
    <>
      <div class="search telescopeBorder">
        <p class="search_symbol">&gt;</p>
        <input
          class="searchInput"
          type="search"
          name="search"
          placeholder="Search"
        />
      </div>
    </>
  );
}

function Link({
  src,
  href,
  children,
}: {
  src: string;
  href: string;
  children: JSX.Element;
}) {
  return (
    <div class="link">
      <img class="file_icon" src={src} />
      <a href={href}>{children}</a>
    </div>
  );
}

export const Home = () => {
  return (
    <HtmlLayout css={['home.css']} title="Home">
      <main>
        <div class="leftWrapper">
          <div class="links telescopeBorder">
            <div class="links_linkWrapper">
              <Link
                src="https://www.svgrepo.com/show/368813/markdown.svg"
                href="/about.md"
              >
                about-me.md
              </Link>
              <Link
                src="https://www.svgrepo.com/show/368813/markdown.svg"
                href="/about-this-blog.md"
              >
                about-this-blog.md
              </Link>
              <Link
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                href="https://github.com/Vakiyama"
              >
                github/Vakiyama
              </Link>
            </div>
          </div>
          <Search />
        </div>
        <Guide />
      </main>
    </HtmlLayout>
  );
};
