(function() {
  if (!('FormData' in window) || !('FileReader' in window)) {
    return;
  }

  var form = document.querySelector('.competition-form');
  var area = form.querySelector('.upload-images');

  var template = document.querySelector('#image-template').innerHTML;
  var queue = [];
  var input = document.querySelector('input');
  var nav = document.querySelector('.main-nav__wrapper');
  var hamb = document.querySelector('.main-menu__hamburger');
  var close = document.querySelector('.main-menu__close-nav');
  var menu = document.querySelector(".main-menu");
  var logo = document.querySelector('.navigation__item--logo');

  var userFirstname = form.querySelector("[name='user-firstname']");
  var userLastname = form.querySelector("[name='user-lastname']");
  var chooseOs = form.querySelector("[name='choose-os']");
  var leaveDate = form.querySelector("[name='leave-date']");
  var durationTravel = form.querySelector("[name='duration-travel']");
  var quantityTravelers = form.querySelector("[name='quantity-travelers']");
  var nameOfTraveler1 = form.querySelector("[name='name-of-traveler-1']");

  var modalSuccess = document.querySelector(".popup-success");
  var modalFailure = document.querySelector(".popup-failure");
  var modalSuccessClose = modalSuccess.querySelector(".popup-success__close-popup");
  var modalFailureClose = modalFailure.querySelector(".popup-failure__close-popup");

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var data = new FormData(form);

    queue.forEach(function(element) {
      data.append('images', element.file);
    });

    if (userFirstname.value && userLastname.value && chooseOs.value && leaveDate.value && durationTravel.value && quantityTravelers.value ) {
      modalSuccess.classList.remove("modal--show");
      modalSuccess.classList.add("modal--show");

      request(data, function(response) {
        console.log(response);
      });
    } else {
      modalFailure.classList.remove("modal--show");
      modalFailure.classList.add("modal--show");
    }

    request(data, function(response) {
      console.log(response);
    });
  });

  modalSuccessClose.addEventListener("click", function(event) {
    event.preventDefault();
    modalSuccess.classList.remove("modal--show");
  });

  modalFailureClose.addEventListener("click", function(event) {
    event.preventDefault();
    modalFailure.classList.remove("modal--show");
  });

  function request(data, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'https://echo.htmlacademy.ru/adaptive?' + (new Date()).getTime());
    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
        console.log(xhr.responseText);
      }
    });
    xhr.send(data);
  }

  form.querySelector('#upload-photo').addEventListener('change', function() {
    var files = this.files;
    for (var i = 0; i < files.length; i++) {
      preview(files[i]);
    }
    this.value = '';
  });

  function preview(file) {
    var reader = new FileReader();
    reader.addEventListener('load', function(event) {
      var html = Mustache.render(template, {
        'image': event.target.result,
        'name': file.name
      });

      var div = document.createElement('div');
      div.classList.add('photo-wrapper__item');
      div.innerHTML = html;

      area.appendChild(div);

      div.querySelector('.photo-wrapper__del-file').addEventListener('click', function(event) {
        event.preventDefault();
        removePreview(div);
      });

      queue.push({
        'file': file,
        'div': div
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

  hamb.addEventListener('click', function(event){
    event.preventDefault();
    nav.classList.add("main-nav__wrapper--show");
    menu.classList.add("main-menu--nav-open");
    hamb.classList.add("main-menu__hamburger--hidden");
    close.classList.add("main-menu__close-nav--show");
  })

  close.addEventListener('click', function(event){
    event.preventDefault();
    nav.classList.remove("main-nav__wrapper--show");
    menu.classList.remove("main-menu--nav-open");
    close.classList.remove("main-menu__close-nav--show");
    hamb.classList.remove("main-menu__hamburger--hidden");
  })
})();

(function() {
  var elements = document.querySelectorAll('.form-counter');

  for (var i = 0; i < elements.length; i++) {
    initNumberField(elements[i]);
  }

  function initNumberField(parent) {
    var input = parent.querySelector('input[type="number"]');
    var minus = parent.querySelector('.counter__change--minus');
    var plus = parent.querySelector('.counter__change--plus');

    minus.addEventListener('click', function() {
      changeNumber(false);
    });

    plus.addEventListener('click', function() {
      changeNumber(true);
    });

    function changeNumber(operation) {
      var value = Number(input.value);
      var max = input.max;
      var min = input.min;


      if (isNaN(value)) {
        value = 0;
      }

      if (operation) {
        if (value < max) {
        input.value = value + 1;
        }
      } else if (value <= 0) {
          input.value = 0;
      }   else {
          input.value = value - 1;
      }
    }
  }

    var template = document.querySelector('#travelers-item-template').innerHTML;
    var inputCounter = document.querySelector('#quantity-travelers');
    var field = document.querySelector('.fellow-travelers__wrapper');
    var block = document.querySelector('.counter--travelers-counter');
    var minus = block.querySelector('.change-travelers--minus');
    var plus = block.querySelector('.change-travelers--plus');
    var card = document.querySelector('.travelers-item');

    minus.addEventListener('click', function(event) {
      event.preventDefault();
      var count = Number(inputCounter.value);
      deleteTraveler(count);
    });

    plus.addEventListener('click', function(event) {
      event.preventDefault();
      var count = Number(inputCounter.value);
      var num = document.querySelectorAll('.travelers-item').length;
      var max = inputCounter.max;
      var min = inputCounter.min;
      if ( num < max) {
        addTraveler(count);
      }
    });

    inputCounter.addEventListener('input',  checkNumber);
    inputCounter.addEventListener('input',  createTraveler);

    function checkNumber() {
      var val = Number(inputCounter.value);
      var max = inputCounter.max;
      var min = inputCounter.min;
      event.preventDefault();

      if (val < min) {
        val = min;
      }
      else if (val > max) {
       val = max;
      }

      inputCounter.value = val;
    }

    function deleteTraveler() {
      var el = field.lastElementChild;

      if (el.classList.contains('travelers-item')) {
        el.parentNode.removeChild(el);
      }
    }

    function addTraveler(count) {
      var row = document.createElement('div');
      row.classList.add('travelers-item');
      var html = Mustache.render(template, {
      'numb': count
      });
      row.innerHTML = html;
      field.appendChild(row);
    }

    function createTraveler() {
      var val = inputCounter.value;
      var num = document.querySelectorAll('.travelers-item').length;
      var createNum = val - num;

      if (createNum > 0) {
       for (var i = num+1; i <= val; i++) {
        addTraveler(i);
       }
      } else {
        createNum = createNum * (-1);
        for (var i = 0; i < createNum; i++) {
          deleteTraveler();
        }
       }
    }
})();
