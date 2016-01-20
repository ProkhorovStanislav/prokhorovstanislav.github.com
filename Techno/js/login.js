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
