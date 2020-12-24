'use strict';
const body = document.querySelector('body');
const footerContent = document.querySelector('.footer__content');

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth < 980) return;

  window.addEventListener('scroll', function () {
    let scrollPos = window.scrollY;
    if (scrollPos >= body.scrollHeight - body.clientHeight - 306) {
      footerContent.classList.remove('footer__content--fixed');
    } else if (scrollPos < body.scrollHeight - body.clientHeight - 429) {
      footerContent.classList.add('footer__content--fixed');
    }
  })
});


