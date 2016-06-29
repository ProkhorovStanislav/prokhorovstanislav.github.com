$(document).ready(function(){
    var header = $(".page-header"),
        arrowTop = $(".arrow--top"),
        navLink = $(".main-nav__link"),
        arrow = $(".page-intro__arrow"),
        item = $(".skills__item"),
        introHeight = $(".page-intro").outerHeight(),
        aboutHeight = $(".about").outerHeight(),
        totalHeight = introHeight + aboutHeight - 300,
        envelopeBtn = $(".btn--envelope"),
        portfolioItem = $(".portfolio__item");
        technoBtn = $(".btn--technologies");

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
        srrt.addClass("ololo");
        portfolioItem.mouseleave( function() {
            var gbg = $(this).find(".portfolio__overlay-top");
            gbg.removeClass("ololo");
        });
        setTimeout(function() {srrt.removeClass("ololo")}, 5000);
    });
    
    navLink.on("click", toGetPoint);
    arrow.on("click", toGetPoint);
    arrowTop.on("click", toGetPoint);

    function toGetPoint() {
        var scroll = $(this).attr("href");
        if ($(scroll).length != 0) {
            $("html, body").animate({ scrollTop: $(scroll).offset().top }, 600);
        }
        return false;
    }

});

