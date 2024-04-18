import { borderHeader, telescopeBorder } from '..';
import { GuideText } from './GuideText';

export function Guide({
  showTutorialText = true,
}: {
  showTutorialText: boolean;
}) {
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
