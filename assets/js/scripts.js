$(document).ready(function() {
    var header = $(".page-header"),
        arrowTop = $(".arrow--top"),
        navLink = $(".main-nav__link"),
        arrow = $(".page-intro__arrow"),
        item = $(".skills__item"),
        introHeight = $(".page-intro").outerHeight(),
        aboutHeight = $(".about").outerHeight(),
        totalHeight = introHeight + aboutHeight - 300,
        envelopeBtn = $(".btn--envelope"),
        portfolioItem = $(".portfolio__item"),
        technoBtn = $(".btn--technologies"),
        toggleBtn = $('.js-toggle-item'),
        ACTIVE = 'is-active',
        HIDDEN = 'is-hidden';


    $(window).scroll(function(){
        var scroll = $(window).scrollTop();

        if (scroll >= introHeight) {
            header.addClass("page-header--scrolled");
            arrowTop.addClass("js-arrow--scrolled");
        }
        else {
           header.removeClass("page-header--scrolled");
           arrowTop.removeClass("js-arrow--scrolled");
        }

        if (scroll > totalHeight) {
            item.animate({
                opacity: 1
            }, 20);
        }
    });

    envelopeBtn.click(function(event){
        event.preventDefault();
        $(".envelope__side--top").addClass("js-envelope__side--opened");
        $(".envelope__card").addClass("js-envelope__card--open");
    });

    technoBtn.click(function(){
        var srrt = $(this).siblings(".portfolio__overlay-top");
        srrt.addClass("btn-techno-active");
        portfolioItem.mouseleave( function() {
            var gbg = $(this).find(".portfolio__overlay-top");
            gbg.removeClass("btn-techno-active");
        });
        setTimeout(function() {srrt.removeClass("btn-techno-active")}, 5000);
    });

    navLink.on("click", toGetPoint);
    arrow.on("click", toGetPoint);
    arrowTop.on("click", toGetPoint);
    toggleBtn.on("click", (function(event){
        toToggle(event);
        toChangeContent(event);
    }));

    function toGetPoint() {
        var scroll = $(this).attr("href");
        if ($(scroll).length != 0) {
            $("html, body").animate({ scrollTop: $(scroll).offset().top }, 600);
        }
        return false;
    }

    function toToggle(event) {
        toggleBtn.removeClass(ACTIVE);
        var pressedToggleBtn = $(event.target);
        pressedToggleBtn.addClass(ACTIVE);
    }
    function toChangeContent(event) {
        var pressedBtn = $(event.target);
        var toggleBlocks = $('.js-toggle-content');
        var pressedBtnName = pressedBtn.data('toggle-title');
        toggleBlocks.each(function(index, item){
            item = $(item);
            if ( item.data('toggle-content') == pressedBtnName) {
                item.removeClass(HIDDEN);
            } else {
                item.addClass(HIDDEN);
            }
        })

    }

});

