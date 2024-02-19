const isHome = location.pathname === '/';
const hasUsedBefore = localStorage.getItem('used');
function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

const telescope = document.querySelector('.telescope');
const search = document.querySelector('.searchInput');

function openMenu() {
  telescope.classList.remove('hidden');
  const introDiv = document.querySelector('.intro');
  if (introDiv) introDiv.remove();
  if (!isHome) {
    document.body.classList.add('stopScroll');
  }
  setTimeout(() => search.focus(), 50);
}

function closeMenu() {
  document.body.classList.remove('stopScroll');
  const searchButton = document.querySelector('.searchOpen');
  searchButton.classList.remove('hidden');

  telescope.classList.add('hidden');
}

function handleCommands(ev) {
  const focused = document.activeElement;
  if (focused === search) {
    if (ev.key === 'Escape') return search.blur();
    return;
  } else {
    if (
      ev.key === 'Escape' &&
      !isHome &&
      !telescope.classList.contains('hidden')
    ) {
      closeMenu();
      return;
    }
  }
  if (ev.key === 'S') {
    if (!hasUsedBefore) {
      localStorage.setItem('used', 'true');
    }
    openMenu(search);
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

  if ((hasUsedBefore && isHome) || (isTouchDevice() && isHome)) {
    openMenu();
  }

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
      const cursor = i !== placeholderText.length - 1 ? '|' : '';
      searchInput.placeholder = `Search for ${placeholderText.slice(0, 1 + i)}${cursor}`;
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

  let searchTimeout;

  function search() {
    if (searchTimeout) clearTimeout(searchTimeout);
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
  const searchButton = document.querySelector('.searchOpen');
  searchButton.addEventListener('click', () => {
    if (telescope.classList.contains('hidden')) {
      openMenu();
    } else {
      closeMenu();
    }
  });
});
