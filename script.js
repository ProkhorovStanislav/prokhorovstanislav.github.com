(function() {
  if (!("FormData" in window)) {
    return;
  }

  var form = document.querySelector(".send-mail");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    var data = new FormData(form);
    request(data, function(response) {
      console.log(response);
    });
  });

	function request(data, fn) {
	  var xhr = new XMLHttpRequest();
	  var time = (new Date()).getTime();
	  xhr.open("post", "//formspree.io/ridea@bk.ru?" + time, true);
	  xhr.setRequestHeader("Accept", "application/json");
	  xhr.addEventListener("readystatechange", function() {
	    if (xhr.readyState == 4) {
	      fn(xhr.responseText);
	    }
	  });
	  xhr.send(data);
	}
})();
