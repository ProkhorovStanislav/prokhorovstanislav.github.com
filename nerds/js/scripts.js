var link = document.querySelector(".write-to-us");
var myForm = document.querySelector(".contact-us");
var close = document.querySelector(".close-form");
var form = myForm.querySelector("form");
var login = myForm.querySelector("[name=our-name]");
var email = myForm.querySelector("[name=our-email]");
var storage = localStorage.getItem("login");

link.addEventListener("click", function(event) {
    event.preventDefault();
    myForm.classList.add("contact-us-show");
    if(storage){
        login.value = storage;
        email.focus();
    } else {
        login.focus();
    }
});

close.addEventListener("click", function(event){
    event.preventDefault();
    myForm.classList.remove("contact-us-show");
    if(myForm.classList.contains("login-error")){
        myForm.classList.remove("login-error");
    }
})

form.addEventListener("submit", function(event){
    if (!(login.value && email.value)) {
        event.preventDefault();
        myForm.classList.remove("login-error");
        myForm.classList.add("login-error");
    } else {
        localStorage.setItem("login", login.value);

    }
});

window.addEventListener("keydown", function(event){
    if (event.keyCode == 27) {
        if (myForm.classList.contains("contact-us-show")) {
            myForm.classList.remove("contact-us-show");
        }
        if(myForm.classList.contains("login-error")){
        myForm.classList.remove("login-error");
        }
    }
})

function initialize() {
  var mapOptions = {
    zoom: 17,
    center: new google.maps.LatLng(59.938598, 30.322981)
  }
  var map = new google.maps.Map(document.getElementById('google-map'),
                                mapOptions);
  var image = 'img/img_bullet_map.png';
  var myLatLng = new google.maps.LatLng(59.938598, 30.322981);
  var beachMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: image
  });
}
google.maps.event.addDomListener(window, 'load', initialize);
