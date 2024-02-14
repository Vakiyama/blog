let timeout;

const isHome = window.location.pathname === '/';

const telescope = document.querySelector('.telescope');

function handleCommands(ev) {
  if (timeout) clearTimeout(timeout);

  const focused = document.activeElement;
  const search = document.querySelector('.searchInput');
  if (focused === search) {
    if (ev.key === 'Escape') return search.blur();
    return;
  } else {
    if (
      ev.key === 'Escape' &&
      !isHome &&
      !telescope.classList.contains('hidden')
    ) {
      telescope.classList.add('hidden');
      return;
    }
  }
  if (ev.key === 'S') {
    telescope.classList.remove('hidden');
    setTimeout(() => search.focus(), 50);
    clearTimeout(timeout);
  }
}

document.addEventListener('keydown', (ev) => {
  handleCommands(ev);
});

const searchPlaceholders = [
  'a blog...',
  'a post...',
  'an article...',
  'a note...',
  'a file...',
  'a thought...',
];
let placeholderIndex = 0;

function sleep(amt) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, amt);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.searchInput');

  async function clear() {
    for (let i = 0; i < searchPlaceholders[placeholderIndex].length; i++) {
      const placeholderText = searchPlaceholders[placeholderIndex];
      await sleep(70);
      searchInput.placeholder = `Search for ${placeholderText.slice(0, placeholderText.length - i)}|`;
    }
  }

  async function write() {
    for (let i = 0; i < searchPlaceholders[placeholderIndex].length; i++) {
      const placeholderText = searchPlaceholders[placeholderIndex];
      await sleep(20 + Math.floor(Math.random() * 220));
      searchInput.placeholder = `Search for ${placeholderText.slice(0, 1 + i)}${i !== placeholderText.length - 1 ? '|' : ''
        }`;
    }
  }

  write();

  setInterval(async () => {
    if (!document.hasFocus()) return;
    await clear();
    write();
    placeholderIndex++;
    if (placeholderIndex === searchPlaceholders.length) placeholderIndex = 0;
  }, 4000);

  searchInput.value = '';

  htmx.ajax('GET', `/search?queryString=&home=${isHome}`, {
    target: '.links_linkWrapper',
  });

  let timeout;

  function search() {
    if (timeout) clearTimeout(timeout);
    htmx
      .ajax(
        'GET',
        `/search/preview?queryString=${encodeURIComponent(searchInput.value)}&home=${isHome}`,
        {
          target: '.guide_textWrapper',
        }
      )
      .then(() => {
        htmx.ajax(
          'GET',
          `/search?queryString=${encodeURIComponent(searchInput.value)}&home=${isHome}`,
          {
            target: '.links_linkWrapper',
          }
        );
      });
  }

  searchInput.addEventListener('input', search);
});
