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
        to open this menu anywhere.
      </p>
      <br />
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
          placeholder="Search for an article..."
          autocomplete="false"
          autofocus="true"
          hx-trigger='keyup[key=="Enter"] from:input'
          hx-get="/search/redirect-blog"
        />
        <div class="borderHeader searchHeader">
          <p>Search</p>
        </div>
      </div>
    </>
  );
}

export function Link({
  src,
  href,
  children,
  isHome,
}: {
  src: string;
  href: string;
  children: JSX.Element;
  isHome: boolean;
}) {
  return (
    <div
      class="link"
      hx-trigger="mouseover"
      hx-get={`/search/preview?queryString=${encodeURI(children.toString())}&home=${isHome}`}
      hx-target=".guide_textWrapper"
    >
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
        <Telescope home={true} />
        <main>
          <div class="intro">
            <h1 class="intro_text">
              Press <span class="highlight-command">Shift + S</span> to Search
            </h1>
          </div>
        </main>
      </>
    </HtmlLayout>
  );
};
