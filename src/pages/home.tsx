import { HtmlLayout } from '../components/htmlLayout';

export function GuideText() {
  return (
    <div class="guideText">
      <br />
      <p>
        Hello, I'm <span class="highlight-rosewater">Vitor</span>.
      </p>
      <p>Welcome to my blog.</p>
      <br />
      <p>
        Press{' '}
        <span class="highlight-command">
          <b>Shift + S</b>
        </span>{' '}
        to <span class="highlight-link">search</span> for a blog or link.
      </p>
      <br />
      <p>
        Press{' '}
        <span class="highlight-command">
          <b>Enter</b>
        </span>{' '}
        to go to the currently highlighted blog.
      </p>
      <p>
        <span class="highlight-command">
          <b>Click</b>
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
    <div class="guide telescopeBorder">
      <div class="borderHeader guide_borderHeader">
        <p>Preview</p>
      </div>
      <div class="innerWrapper">
        <div class="guide_textWrapper">{showTutorialText && <GuideText />}</div>
      </div>
    </div>
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
        <div class="borderHeader searchHeader">
          <p>Find Files</p>
        </div>
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
      <img class="file_icon" src={src} alt="A filetype icon" />
      <a href={href}>{children}</a>
    </div>
  );
}

function TelescopeGui({ home }: { home: boolean }) {
  return (
    <>
      <div class={`leftWrapper`}>
        <div class="links telescopeBorder">
          <div class="borderHeader linkHeader">
            <p>Links</p>
          </div>
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
      <div class="telescope hidden">
        <TelescopeGui home={home} />
      </div>
    </>
  );
}

export const Home = () => {
  return (
    <HtmlLayout css={['home.css']} title="Home">
      <>
        <Telescope home={false} />
        <main>
          <div class="intro">
            <h1 class="intro_text">Press Shift + S to Search</h1>
          </div>
        </main>
      </>
    </HtmlLayout>
  );
};
