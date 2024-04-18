import { telescopeBorder, borderHeader } from '../pages/home';
import { Search } from '../pages/home/components/Search';
import { Guide } from '../pages/home/components/Guide';

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
        items-center
        min-[400px]:pl-10
        min-[400px]:items-start
        `}
        >
          <div class={`${borderHeader} linkHeader`}>
            <p
              class="
        text-center
        sm:text-2xl
        mt-2
        mb-2
        ml-0
        mr-0
        relative
        bottom-[14px]
        text-xl
            "
            >
              Links
            </p>
          </div>
          <div
            class="
          links_linkWrapper
          border-red
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
