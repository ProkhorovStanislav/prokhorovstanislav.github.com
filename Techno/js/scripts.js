var mapOpen = document.querySelector(".about-us__map");
var mapPopup = document.querySelector(".modal--map");
var mapClose = mapPopup.querySelector(".modal__close--map");

mapOpen.addEventListener("click", function(event) {
    event.preventDefault();
    mapPopup.classList.remove("modal--hidden");
})

mapClose.addEventListener("click", function(event) {
    event.preventDefault();
    mapPopup.classList.add("modal--hidden");

})

window.addEventListener("keydown", function(event) {

    if (event.keyCode == 27) {
        if (mapPopup && !mapPopup.classList.contains("modal--hidden")) {
            mapPopup.classList.add("modal--hidden");
        }
    }

});

var login = document.querySelector(".user-block__item--sign-in");
var logout = document.querySelector(".user-block__item--logout");
var logged = document.querySelector(".user-block--logged");
var unlogged = document.querySelector(".user-block--unlogged");

login.addEventListener("click", function(event) {
    event.preventDefault();
    unlogged.classList.remove("user-block--hidden");
    unlogged.classList.add("user-block--hidden");
    logged.classList.remove("user-block--hidden");
})

logout.addEventListener("click", function(event) {
    event.preventDefault();
    logged.classList.remove("user-block--hidden");
    logged.classList.add("user-block--hidden");
    unlogged.classList.remove("user-block--hidden");
})

var writeUsOpen = document.querySelector(".about-us__btn--right-col");
var writeUsPopup = document.querySelector(".modal--form");
var writeUsClose = writeUsPopup.querySelector(".modal__close--form");

writeUsOpen.addEventListener("click", function(event) {
    event.preventDefault();
    writeUsPopup.classList.remove("modal--hidden");
})

writeUsClose.addEventListener("click", function(event) {
    event.preventDefault();
    writeUsPopup.classList.add("modal--hidden");

})

window.addEventListener("keydown", function(event) {

    if (event.keyCode == 27) {
        if (writeUsPopup && !writeUsPopup.classList.contains("modal--hidden")) {
            writeUsPopup.classList.add("modal--hidden");
        }
    }

});



var cartAddOpen = document.querySelectorAll(".product-card__btn--bye");
var cartAddPopup = document.querySelector(".modal--cart");

var cartClose = cartAddPopup.querySelector(".modal__close--cart");
var cartCancel = cartAddPopup.querySelector(".modal__btn--right");

var cartBlock = document.querySelector(".header-top-item--cart");
var cartCountText = document.querySelector(".header-top-item__value--cart");
var cartCount = 0;

var i;
for (i = 0; i < cartAddOpen.length; i++) {
    cartAddOpen[i].addEventListener("click", function(event) {
        event.preventDefault();
        cartAddPopup.classList.remove("modal--hidden");

        cartCount++;
        cartCountText.innerHTML = cartCount;
        cartBlock.classList.add("header-top-item--full");

    });
}

cartClose.addEventListener("click", function(event) {
    event.preventDefault();
    cartAddPopup.classList.add("modal--hidden");
});

cartCancel.addEventListener("click", function(event) {
    event.preventDefault();
    cartAddPopup.classList.add("modal--hidden");
});

window.addEventListener("keydown", function(event) {

    if (event.keyCode == 27) {
        if (cartAddPopup && !cartAddPopup.classList.contains("modal--hidden")) {
            cartAddPopup.classList.add("modal--hidden");
        }
    }

});

var bookmarkAdd = document.querySelectorAll(".product-card__btn--bookmark");
var bookmarkBlock = document.querySelector(".header-top-item--bookmark");
var bookmarkCountText = document.querySelector(".header-top-item__value--bookmark");
var bookmarkCount = 0;

var j;
for (j = 0; j < bookmarkAdd.length; j++) {
    bookmarkAdd[j].addEventListener("click", function(event) {
        event.preventDefault();

        bookmarkCount++;
        bookmarkCountText.innerHTML = bookmarkCount;
        bookmarkBlock.classList.add("header-top-item--full");

    });
}




