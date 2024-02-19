const aTags = [...document.querySelectorAll('.blog a')];

aTags.forEach((aElement) => {
  aElement.setAttribute.target = '_blank';
});
