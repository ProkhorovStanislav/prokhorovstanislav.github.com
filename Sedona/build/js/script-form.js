(function() {
  if (!('FormData' in window) || !('FileReader' in window)) {
    return;
  }

  var form = document.querySelector('.review-form');
  var area = form.querySelector('.upload-images');

  var template = document.querySelector('#image-template').innerHTML;
  var queue = [];
  var input = document.querySelector('input');
  var nav = document.querySelector('.navigation');
  var hamb = document.querySelector('.page-header__toggle');
  var close = document.querySelector('.close-icon');
  var logo = document.querySelector('.navigation__item--logo');

  var userFirstname = form.querySelector("[name='firstname']");
  var userLastname = form.querySelector("[name='lastname']");
  var userArrivalDate = form.querySelector("[name='arrival']");
  var userNumDays = form.querySelector("[name='number-of-days']");
  var userNumTravelers = form.querySelector("[name='number-of-travelers']");


  var modalSuccess = document.querySelector(".popup--success");
  var modalFailure = document.querySelector(".popup--failure");
  var modalSuccessClose = modalSuccess.querySelector(".button--popup-success");
  var modalFailureClose = modalFailure.querySelector(".button--popup-failure");

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var data = new FormData(form);

    queue.forEach(function(element) {
      data.append('images', element.file);
    });

    if (userFirstname.value && userLastname.value && userArrivalDate.value && userNumDays.value && userNumTravelers.value ) {
      modalSuccess.classList.remove("popup--visible");
      modalSuccess.classList.add("popup--visible");

      request(data, function(response) {
        console.log(response);
      });
    } else {
      modalFailure.classList.remove("popup--visible");
      modalFailure.classList.add("popup--visible");
    }

    request(data, function(response) {
      console.log(response);
    });
  });

  modalSuccessClose.addEventListener("click", function(event) {
    event.preventDefault();
    modalSuccess.classList.remove("popup--visible");
  });

  modalFailureClose.addEventListener("click", function(event) {
    event.preventDefault();
    modalFailure.classList.remove("popup--visible");
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

  form.querySelector('#upload_photo').addEventListener('change', function() {
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
      div.classList.add('review-form__downloaded-item');
      div.innerHTML = html;

      area.appendChild(div);

      div.querySelector('.review-form__delete-item').addEventListener('click', function(event) {
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
    nav.classList.add('navigation--show');
    nav.classList.remove('navigation--show-logo');
    hamb.classList.add('page-header__toggle--hidden');
    close.classList.remove('close-icon--hidden');
  })

  close.addEventListener('click', function(event){
    event.preventDefault();
    nav.classList.remove('navigation--show');
    close.classList.add('close-icon--hidden');
    hamb.classList.remove('page-header__toggle--hidden');
    nav.classList.add('navigation--show-logo');
  })
})();

(function() {
  var elements = document.querySelectorAll('.choose-quantity');

  for (var i = 0; i < elements.length; i++) {
    initNumberField(elements[i]);
  }

  function initNumberField(parent) {
    var input = parent.querySelector('input[type="number"]');
    var minus = parent.querySelector('.choose-quantity__change--decrease');
    var plus = parent.querySelector('.choose-quantity__change--increase');

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

    var template = document.querySelector('#travelers-name-template').innerHTML;
    var inputCounter = document.querySelector('#quantity-travelers');
    var field = document.querySelector('.review-form__item--travelers');
    var block = document.querySelector('.choose-quantity--travelers');
    var minus = block.querySelector('.choose-quantity__change--travelers-decrease');
    var plus = block.querySelector('.choose-quantity__change--travelers-increase');
    var card = document.querySelector('.review-form__traveler-card');

    minus.addEventListener('click', function(event) {
      event.preventDefault();
      var count = Number(inputCounter.value);
      deleteTraveler(count);
    });

    plus.addEventListener('click', function(event) {
      event.preventDefault();
      var count = Number(inputCounter.value);
      var num = document.querySelectorAll('.review-form__traveler-card').length;
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

      if (el.classList.contains('review-form__traveler-card')) {
        el.parentNode.removeChild(el);
      }
    }

    function addTraveler(count) {
      var row = document.createElement('div');
      row.classList.add('review-form__traveler-card');
      var html = Mustache.render(template, {
      'numb': count
      });
      row.innerHTML = html;
      field.appendChild(row);
    }

    function createTraveler() {
      var val = inputCounter.value;
      var num = document.querySelectorAll('.review-form__traveler-card').length;
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
