import { HtmlLayout } from '../../components/HtmlLayout';
import { Telescope } from '../../components/Telescope';

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

export const borderHeader = `
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
