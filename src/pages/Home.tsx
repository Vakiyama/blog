import { HtmlLayout } from '../components/HtmlLayout';

export const telescopeBorder = 'relative border-2 rounded-[10px] border-blue';

export function GuideText() {
  return (
    <div class="previewText">
      <br />
      <p class="text-2xl">
        Hello, I'm <span class="text-rosewater">Vitor</span>.
      </p>
      <p>Welcome to my blog.</p>
      <br />
      <p class="text-2xl">
        Press{' '}
        <span class="text-mauve">
          <b>Shift + S</b>
        </span>{' '}
        to open this menu anywhere.
      </p>
      <br />
    </div>
  );
}

const borderHeader = `
      left-0
      right-0
      ml-auto
      mr-auto
      mb-0
      mt-0
      absolute
      bg-base
      w-[140px]
      -top-[10px]
      h-5
      z-10
`;

function Guide({ showTutorialText = true }: { showTutorialText: boolean }) {
  return (
    <div class={`guide hidden lg:block w-[42%] min-w-[42%] ${telescopeBorder}`}>
      <div
        class={`
      guide_borderHeader
      ${borderHeader}
      `}
      >
        <p
          class="
        text-center
        text-2xl
        mt-2
        mb-2
        ml-0
        mr-0
        relative
        bottom-[14px]
        "
        >
          Preview
        </p>
      </div>
      <div class="h-[calc(100%-15px)] mt-[15px]">
        <div class="previewText h-[95%] text-xl pt-5 pb-5 pl-10 pr-10 overflow-y-scroll">
          {showTutorialText && <GuideText />}
        </div>
      </div>
    </div>
  );
}

function Search() {
  return (
    <>
      <div
        class={`
      search 
      h-[7.595%]
      flex
      items-center
      pl-1.5
      ${telescopeBorder}`}
      >
        <p
          class="
        text-3xl
        font-bold
        text-blue
        "
        >
          &gt;
        </p>
        <input
          class="
          searchInput
          w-full
          h-full
          p-[5px]
          border-none
          bg-transparent
          text-text
          text-2xl
          ml-1
          relative
          top-px
          "
          type="search"
          name="queryString"
          placeholder="Search for an article..."
          autocomplete="false"
          autofocus="true"
          hx-trigger='keyup[key=="Enter"] from:input'
          hx-get="/search/redirect-blog"
        />
        <div
          class={`${borderHeader} 
        -top-3
        h-5
        flex
        w-[120px]
        items-center
        justify-center
        `}
        >
          <p
            class="
        text-center
        text-2xl
        mt-2
        mb-2
        ml-0
        mr-0
        relative
          "
          >
            Search
          </p>
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
  external,
}: {
  src: string;
  href: string;
  children: JSX.Element;
  isHome: boolean;
  external?: boolean;
}) {
  return (
    <div
      class="
      flex
      items-center
      mb-1.5
      mt-1.5
      w-fit
      hover:opacity-70
      "
      hx-trigger="mouseover"
      hx-get={`/search/preview?queryString=${encodeURI(children.toString())}&home=${isHome}`}
      hx-target=".previewText" // this is the preview swap target
    >
      <img
        class="
      w-[26px]
      ml-3
      mr-3
      invert
      relative
      top-0.5
      "
        src={src}
        alt="A filetype icon"
      />
      <a
        href={href}
        target={external ? '_blank' : undefined}
        class="hover:opacity-100
        text-xl
        lg:text-2xl
        text-text
        "
      >
        {children}
      </a>
      {external && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="#303446"
          class="w-5 h-5 relative top-px ml-1"
        >
          <g id="Interface / External_Link">
            home
            <path
              id="Vector"
              d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
              stroke="#c6d0f5"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      )}
    </div>
  );
}

function TelescopeGui({ home }: { home: boolean }) {
  return (
    <>
      <div
        class={`
      leftWrapper

      lg:w-[57.8%]
      w-full
      flex
      flex-col
      justify-between
      lg:mr-5
      `}
      >
        <div
          class={`${telescopeBorder}
        h-[89.87%]
        flex
        flex-col
        pl-10
        `}
        >
          <div class={`${borderHeader} linkHeader`}>
            <p
              class="
        text-center
        text-2xl
        mt-2
        mb-2
        ml-0
        mr-0
        relative
        bottom-[14px]
            "
            >
              Links
            </p>
          </div>
          <div
            class="
          links_linkWrapper
          overflow-y-scroll
          h-fit
          mt-4
          pt-[5%]
          "
          ></div>
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
      <div
        class={`telescope
      w-screen
      h-screen
      bg-base
      ${!home && 'hidden'}`}
      >
        <div
          class={`
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
      `}
        >
          <TelescopeGui home={home} />
        </div>
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
