
ymaps.ready(init);
    var myMap,
        myPlacemark;

    function init(){     
        myMap = new ymaps.Map ("yandex-map", {
            center: [59.938985, 30.322871],
            zoom: 17
        });

        myMap.controls 
            .add('zoomControl', { left: 5, top: 200 }) 
            .add('typeSelector', { right: 5, bottom: 70 }) 
            .add('mapTools', { right: 5, bottom: 40 }) ; 


        myPlacemark1 = new ymaps.Placemark([59.938625, 30.322791], { 
        	hintContent: 'Мы здесь!', 
            balloonContent: 'Вход со двора' }, {
        	iconImageHref: 'img/map-marker.svg',
	        iconImageSize: [32, 32],
        });

        myMap.geoObjects.add(myPlacemark1);
    }