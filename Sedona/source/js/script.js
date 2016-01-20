(function() {
  if (!("FormData" in window) || !("FileReader" in window)) {
    return;
  }

  var form = document.querySelector(".review-form");
  var area = form.querySelector(".upload-images");

  var template = document.querySelector("#image-template").innerHTML;
  var queue = [];

  var nav = document.querySelector(".navigation");
  var hamb = document.querySelector(".page-header__toggle");
  var close = document.querySelector(".close-icon");
  var logo = document.querySelector(".navigation__item--logo");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    var data = new FormData(form);

    queue.forEach(function(element) {
      data.append("images", element.file);
    });

    request(data, function(response) {
      console.log(response);
    });
  });

  function request(data, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + (new Date()).getTime());
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
        console.log(xhr.responseText);
      }
    });
    xhr.send(data);
  }

  form.querySelector("#upload_photo").addEventListener("change", function() {
    var files = this.files;
    for (var i = 0; i < files.length; i++) {
      preview(files[i]);
    }
    this.value = "";
  });

  function preview(file) {
    var reader = new FileReader();
    reader.addEventListener("load", function(event) {
      var html = Mustache.render(template, {
        "image": event.target.result,
        "name": file.name
      });

      var div = document.createElement("div");
      div.classList.add("review-form__downloaded-item");
      div.innerHTML = html;

      area.appendChild(div);

      div.querySelector(".review-form__delete-item").addEventListener("click", function(event) {
        event.preventDefault();
        removePreview(div);
      });

      queue.push({
        "file": file,
        "div": div
      });
    });
    reader.readAsDataURL(file);
  }

  function removePreview(div) {
    queue = queue.filter(function(element) {
    return element.div != div;
    });

    div.parentNode.removeChild(div);
  }

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

(function() {
  var elements = document.querySelectorAll(".choose-quantity");

  for (var i = 0; i < elements.length; i++) {
    initNumberField(elements[i]);
  }

  function initNumberField(parent) {
    var input = parent.querySelector("input");
    var minus = parent.querySelector(".choose-quantity__change--decrease");
    var plus = parent.querySelector(".choose-quantity__change--increase");

    minus.addEventListener("click", function() {
      changeNumber(false);
    });
    plus.addEventListener("click", function() {
      changeNumber(true);
    });

    function changeNumber(operation) {
      var value = Number(input.value);

      if (isNaN(value)) {
        value = 0;
      }

      if (operation) {
        input.value = value + 1;
      } else if (value <= 0) {
          input.value = 0;
      }   else {
          input.value = value - 1;
      }
    }
  }
})();
