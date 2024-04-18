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
        text-lg
        sm:text-xl
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