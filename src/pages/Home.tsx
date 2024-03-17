import { HtmlLayout } from '../components/HtmlLayout';

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
      <div
        class="
      leftWrapper
      lg:w-[57.8%]
      flex
      flex-col
      justify-between
      lg:mr-5
      "
      >
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
  /*
  background-color: var(--base);
  position: fixed;
  max-width: 1640px;
  height: 790px;
  width: calc(100% - 40px);
  display: flex;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-top: 12px;
  */
  return (
    <>
      <div
        class="
      telescope
      bg-base 
      fixed 
      max-w-[1640px] 
      w-[calc(100%-40px)]
      flex
      z-10
      top-1/2
      left-1/2
      -translate-x-1/2
      -translate-y-1/2
      pt-3
      h-[90dvh]
      text-xl 

      md:text-m
      md:h-[790px]
      "
      >
        <TelescopeGui home={home} />
      </div>
    </>
  );
}

export const Home = () => {
  return (
    <HtmlLayout title="Vitor Akiyama">
      <>
        <Telescope home={true} />
        <div class="intro h-screen w-screen fixed left-0 top-0 flex items-center justify-center bg-base">
          <h1 class="mt-0 mb-0 ml-auto mr-auto w-fit relative bottom-14 text-4xl text-text">
            Press <span class="text-mauve">Shift + S</span> to Search
          </h1>
        </div>
      </>
    </HtmlLayout>
  );
};
