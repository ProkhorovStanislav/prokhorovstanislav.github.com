(function() {
    var toggleMenu = $('.main-nav__toggle'),
        closeNav =  $('.main-nav__close-list'),
        navList = $('.main-nav__list')
        mainNav = $('.main-nav');

        toggleMenu.click(function() {
            $(this).addClass('main-nav__toggle--hidden');
            navList.toggleClass('main-nav__list--visible');
            closeNav.addClass('main-nav__close-list--visible');
        });

        closeNav.click(function() {
            $(this).removeClass('main-nav__close-list--visible');
            navList.toggleClass('main-nav__list--visible');
            toggleMenu.removeClass('main-nav__toggle--hidden');
        });
})($);