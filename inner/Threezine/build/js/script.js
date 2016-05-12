(function() {
  var nav = document.querySelector(".nav--disappearing");
  var hamb = document.querySelector(".hamburger");
  var close = document.querySelector(".close-nav");
  var menu = document.querySelector(".main-menu");

  hamb.addEventListener("click", function(event){
    event.preventDefault();
    nav.classList.remove("hidden-on-small-screen");
    //menu.classList.add("main-menu--nav-open");
    hamb.classList.add("hamburger--hidden");
    close.classList.add("close-nav--show");
  })

  close.addEventListener("click", function(event){
    event.preventDefault();
    nav.classList.add("hidden-on-small-screen");
    //menu.classList.remove("main-menu--nav-open");
    close.classList.remove("close-nav--show");
    hamb.classList.remove("hamburger--hidden");
  })
})();

$(document).ready(function(){
  $('.post-preview').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    asNavFor: '.post-list'
  });
  $('.post-list').slick({
    vertical: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.post-preview',
    dots: false,
    arrows: false,
    centerMode: false,
    focusOnSelect: true
  });
});

$(function() {
      $( '.post-list-item' ).on( 'click', function() {
            $( this ).parent().find( '.post-list-item' ).removeClass( 'active' );
            $( this ).addClass( 'active' );
      });
});
  
