(function() {
  var nav = document.querySelector(".navigation");
  var hamb = document.querySelector(".page-header__toggle");
  var close = document.querySelector(".close-icon");
  var logo = document.querySelector(".navigation__item--logo");

  hamb.addEventListener("click", function(event){
    event.preventDefault();
    nav.classList.add("navigation--show");
    nav.classList.remove("navigation--show-logo");
    hamb.classList.add("page-header__toggle--hidden");
    close.classList.remove("close-icon--hidden");
  })

  close.addEventListener("click", function(event){
    event.preventDefault();
    nav.classList.remove("navigation--show");
    close.classList.add("close-icon--hidden");
    hamb.classList.remove("page-header__toggle--hidden");
    nav.classList.add("navigation--show-logo");
  })
})();

function initialize() {
  var mapOptions = {
    zoom: 7,
    center: new google.maps.LatLng(34.8678566,-111.7583263),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false
  }
  var map = new google.maps.Map(document.getElementById('googleMap'),
                                mapOptions);
  var image = 'img/map-marker.svg';
  var myLatLng = new google.maps.LatLng(34.8678566,-111.7583263);
  var beachMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: image
  });
}
google.maps.event.addDomListener(window, 'load', initialize);
