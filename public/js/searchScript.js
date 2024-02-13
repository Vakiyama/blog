let timeout;
let commandStack = [];

function handleCommands(ev) {
  if (timeout) clearTimeout(timeout);

  const focused = document.activeElement;
  const search = document.querySelector('.searchInput');
  if (focused === search) {
    if (ev.key === 'Escape') return search.blur();
    return;
  }

  if (ev.key === 'p' && commandStack.length === 0) {
    commandStack.push('p');
    timeout = setTimeout(() => {
      commandStack = [];
    }, 500);
  }
  if (ev.key === 'f' && commandStack[0] === 'p') {
    console.log('focusing search');
    setTimeout(() => search.focus(), 50);
    commandStack = [];
    clearTimeout(timeout);
  }
}

document.addEventListener('keydown', (ev) => {
  handleCommands(ev);
});

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.searchInput');

  htmx.ajax('GET', `/search?queryString=`, {
    target: '.links_linkWrapper',
  });

  searchInput.addEventListener('input', () => {
    htmx.ajax('GET', `/search?queryString=${searchInput.value}`, {
      target: '.links_linkWrapper',
    });

    htmx.ajax('GET', `/search/preview?queryString=${searchInput.value}`, {
      target: '.guide_textWrapper',
    });
  });
});
