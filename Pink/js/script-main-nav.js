(function() {
  var nav = document.querySelector(".main-nav__wrapper");
  var hamb = document.querySelector(".main-menu__hamburger");
  var close = document.querySelector(".main-menu__close-nav");
  var menu = document.querySelector(".main-menu");

  hamb.addEventListener("click", function(event){
    event.preventDefault();
    nav.classList.add("main-nav__wrapper--show");
    menu.classList.add("main-menu--nav-open");
    hamb.classList.add("main-menu__hamburger--hidden");
    close.classList.add("main-menu__close-nav--show");
  })

  close.addEventListener("click", function(event){
    event.preventDefault();
    nav.classList.remove("main-nav__wrapper--show");
    menu.classList.remove("main-menu--nav-open");
    close.classList.remove("main-menu__close-nav--show");
    hamb.classList.remove("main-menu__hamburger--hidden");
  })
})();
