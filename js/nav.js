
// ----------- nav bar ---------- //

const nav =  document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle-btn');

navToggle.addEventListener('click', () => {
  const visibility = nav.getAttribute('data-visible');

  if (visibility === "false") {
    nav.setAttribute('data-visible', true);
    navToggle.style.cssText = "background-image: url(../assets/shared/icon-close.svg)";
  } else {
    nav.setAttribute('data-visible', false);
    navToggle.style.cssText = "background-image: url(../assets/shared/icon-hamburger.svg)";
  };
});