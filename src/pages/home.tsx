import { HtmlLayout } from '../components/htmlLayout';

export function GuideText() {
  return (
    <div>
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
        to <span class="highlight-link">search</span> for a blog or link.
      </p>
      <p>This hotkey will work anywhere on this site.</p>
      <br />
      <p>
        During a search, you can press{' '}
        <span class="highlight-command">
          <b>Enter</b>
        </span>{' '}
        to go to the currently highlighted blog.
      </p>
      <p>
        You can also{' '}
        <span class="highlight-command">
          <b>click</b>
        </span>{' '}
        on <span class="highlight-link">results</span> to follow them as normal.
      </p>
      <p>
        Pressing{' '}
        <span class="highlight-command">
          <b>Esc</b>
        </span>{' '}
        will minimize the search interface when in a blog.
      </p>
    </div>
  );
}

function Guide({ showTutorialText = true }: { showTutorialText: boolean }) {
  return (
    <>
      <div class="guide telescopeBorder">
        <div class="guide_textWrapper">{showTutorialText && <GuideText />}</div>
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
          name="queryString"
          placeholder="Search"
          autocomplete="false"
          autofocus="true"
          hx-trigger='keyup[key=="Enter"] from:input'
          hx-get="/search/redirect-blog"
        />
      </div>
    </>
  );
}

export function Link({
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

function TelescopeGui({ home }: { home: boolean }) {
  return (
    <>
      <div class={`leftWrapper`}>
        <div class="links telescopeBorder">
          <div class="links_linkWrapper"></div>
        </div>
        <Search />
      </div>
      <Guide showTutorialText={home} />
      <script src="/public/js/searchScript.js"></script>
    </>
  );
}

export function Telescope({ home = true }: { home?: boolean }) {
  return (
    <>
      {!home ? (
        <div class="telescope hidden">
          <TelescopeGui home={home} />;
        </div>
      ) : (
        <TelescopeGui home={home} />
      )}
    </>
  );
}

export const Home = () => {
  return (
    <HtmlLayout css={['home.css']} title="Home">
      <>
        <main>
          <Telescope />
        </main>
      </>
    </HtmlLayout>
  );
};
