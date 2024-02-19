const aTags = [...document.querySelectorAll('.blog a')];

aTags.forEach((aElement) => {
  console.log(aElement);
  aElement.setAttribute('target', '_blank');
});
