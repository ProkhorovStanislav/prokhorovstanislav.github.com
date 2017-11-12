/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);

(function () {
    'use strict';

    // Constants
    var IS_DISABLED = 'is-disabled';
    var IS_DELETED = 'is-deleted';
    var IS_ACTIVE = 'is-active';

    var productsList = document.querySelector('.js-products');
    var btnListControl = document.querySelector('.js-remove-all');
    var btnCloseModal = document.querySelector('.js-btn-close-modal');
    var btnSendForm = document.querySelector('.js-send-form');
    var productsQuantity = productsList.querySelectorAll('.js-value');

    //Delegation of the event on all buttons of list items for saving resources
    productsList.addEventListener('click', function () {
        var target = event.target;
        var increment = target.matches('.js-increment-btn') ? target : null;
        var decrement = target.matches('.js-decrement-btn') ? target : null;
        var btnControlItem = target.matches('.js-remove-item') ? target : null;

        if (!increment && !decrement && !btnControlItem) {
            return false;
        } else if (increment) {
            toIncreaseValue(increment);
        } else if (decrement) {
            toDecreaseValue(decrement);
        } else if (btnControlItem) {
            toControlProductState(btnControlItem, !btnControlItem.classList.contains(IS_ACTIVE));
        }
    });

    //processing of manually entering values of numeric fields
    Array.prototype.forEach.call(productsQuantity, function (item) {
        item.onchange = function () {
            var currentProduct = item.closest('.js-product-item');
            var increment = currentProduct.querySelector('.js-increment-btn');
            var decrement = currentProduct.querySelector('.js-decrement-btn');

            if (item.value >= 9) {
                item.value = 9;
                increment.classList.add(IS_DISABLED);
                decrement.classList.remove(IS_DISABLED);
            } else if (item.value <= 1) {
                item.value = 1;
                increment.classList.remove(IS_DISABLED);
                decrement.classList.add(IS_DISABLED);
            } else {
                increment.classList.remove(IS_DISABLED);
                decrement.classList.remove(IS_DISABLED);
            }
        }
    });

    //removal or return of all products
    btnListControl.addEventListener('click', function () {
        toControlProductsState(this, !btnListControl.classList.contains(IS_ACTIVE));
    });

    //handler of closing modal window
    btnCloseModal.addEventListener('click', function () {
        alert('Эта модалка не закрывается, все равно здесь больше ничего нет :)');
    });

    //animated filling progress bars
    setTimeout(toUpdateProgressBar, 500);

    //send xhr on form submit
    btnSendForm.addEventListener('click', function (event) {
        event.preventDefault();
        //collecting needed data, send data and response processing
        console.log('Здесь должен быть ajax');
    });

    //increases the quantity of product by 1
    function toIncreaseValue(btn) {
        var product = btn.closest('.js-product-item');
        var productQuantity = product.querySelector('.js-value');
        var btnDecrement = product.querySelector('.js-decrement-btn');

        if (!product.classList.contains(IS_DELETED)) {
            if (productQuantity.value < 8) {
                productQuantity.value++;
                btn.classList.remove(IS_DISABLED);
                btnDecrement.classList.remove(IS_DISABLED);
            } else if (+productQuantity.value === 8) {
                productQuantity.value++;
                btn.classList.add(IS_DISABLED);
            }
        }
    }

    //decreases the quantity of product by 1
    function toDecreaseValue(btn) {
        var product = btn.closest('.js-product-item');
        var productQuantity = product.querySelector('.js-value');
        var btnIncrement = product.querySelector('.js-increment-btn');

        if (!product.classList.contains(IS_DELETED)) {
            if (productQuantity.value > 2) {
                productQuantity.value--;
                btn.classList.remove(IS_DISABLED);
                btnIncrement.classList.remove(IS_DISABLED);
            } else if (+productQuantity.value === 2) {
                productQuantity.value--;
                btn.classList.add(IS_DISABLED);
            }
        }

    }

    //remove or return product
    function toControlProductState(btn, state) {
        var product = btn.closest('.js-product-item');
        var productQuantity = product.querySelector('.js-value');

        productQuantity.readOnly = state;
        product.classList.toggle(IS_DELETED, state);
        btn.textContent = state ? 'Вернуть' : 'Удалить';
        btn.classList.toggle(IS_ACTIVE, state);
    }

    //remove or return all products
    function toControlProductsState(btn, state) {
        var products = document.querySelectorAll('.js-product-item');
        Array.prototype.forEach.call(products, function (item) {
            var btnDeleteItem = item.querySelector('.js-remove-item');
            var productQuantity = item.querySelector('.js-value');

            productQuantity.readOnly = state;
            item.classList.toggle(IS_DELETED, state);
            btnDeleteItem.classList.toggle(IS_ACTIVE, state);
            btnDeleteItem.textContent = state ? 'Вернуть' : 'Удалить';
        });
        btn.textContent = state ? 'Вернуть все' : 'Удалить все';
        btn.classList.toggle(IS_ACTIVE, state);
    }

    //updates progress bar order status
    function toUpdateProgressBar() {
        var progressBars = document.querySelectorAll('.js-progress');

        Array.prototype.forEach.call(progressBars, function (item) {
            var itemProgressData = item.getAttribute('data-progress');
            var itemProgressBar = item.querySelector('.js-bar');
            var itemProgressPersents = item.querySelector('.js-persents');
            var itemProgressValue = item.querySelector('.js-persents-value');

            itemProgressBar.style.width = itemProgressData + '%';
            itemProgressValue.textContent = itemProgressData;
            itemProgressPersents.style.left = itemProgressData + '%';
        });
    }

})();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = (function() {
  // Polyfill for "closest" method

    if (!Element.prototype.closest) {

      Element.prototype.closest = function (css) {
        var node = this;

        while (node) {
          if (node.matches(css)) return node;
          else node = node.parentElement;
        }
        return null;
      };
    }
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map