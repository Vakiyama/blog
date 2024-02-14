let timeout;

const isHome = window.location.pathname === '/';

const telescope = isHome ? null : document.querySelector('.telescope');

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
    if (!isHome) {
      telescope.classList.remove('hidden');
    }
    setTimeout(() => search.focus(), 50);
    clearTimeout(timeout);
  }
}

document.addEventListener('keydown', (ev) => {
  handleCommands(ev);
});

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.searchInput');

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
          `/search?queryString=${encodeURIComponent(searchInput.value)}`,
          {
            target: '.links_linkWrapper',
          }
        );
      });
  }

  searchInput.addEventListener('input', search);
});

function highlightSearchInput() { }
