import { HtmlLayout } from '../../components/HtmlLayout';
import { Telescope } from '../../components/Telescope';

export const telescopeBorder = 'relative border-2 rounded-[10px] border-blue';

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
