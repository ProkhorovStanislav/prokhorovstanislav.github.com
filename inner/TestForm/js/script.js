(function($, undefined){

    var myForm = $("#deliveryForm");
    var name =$("#user-name");
    var phone = $("#user-phone");
    var email = $("#user-email");
    var city = $("#user-city");
    var allInputs = $("input#user-name, input#user-phone, input#user-email, input#user-city, input#user-address");
    var rv_name = /^[А-ЯЁа-яёA-Za-z]+ [А-ЯЁа-яёA-Za-z]+ [А-ЯЁа-яёA-Za-z]+$/;
    var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+$/;
    var valid_phone = false;
    var valid_name = false;
    var valid_address = false;
    var valid_email = false;

    $(document).ready(function() {
        allInputs.unbind().keydown( function() {
            var id = $(this).attr('id');
            var val = $(this).val();

            switch(id) {
                // Проверка поля "Имя"
                case 'user-name':
                    if (val.length > 7 && val != '' && rv_name.test(val)) {
                        checkSuccess($(this));
                        valid_name = true;
                    } else {
                        checkError($(this));
                        valid_name = false;
                    }
                    break;

                //Проверка email
                case 'user-email':
                    if (val.length > 4 && val != '' && rv_email.test(val)) {
                        checkSuccess($(this));
                        valid_email = true;
                    } else {
                        checkError($(this));
                        valid_email = false;
                    }
                    break;

                //Проверка телефона

                case 'user-phone':
                    if (phone.val().indexOf("_") == -1) {
                        checkSuccess($(this));
                        valid_phone = true;
                    } else {
                        checkError($(this));
                        valid_phone = false;
                    }
                    break;

                //Проверка города

                // case 'user-city':


                //Проверка адреса

                case 'user-address':
                    if (val.length > 10) {
                        checkSuccess($(this));
                        valid_address = true;
                    } else {
                        checkError($(this));
                        valid_address = false;
                    }
                    break;
            }

            function checkSuccess(param) {
                param.next('.error-box').text('Принято')
                    .css('color','green')
            }

            function checkError(param) {
                param.next('.error-box').html('Введите данные в указанном формате')
                    .css('color','red')
            }
        });

        // city.autocomplete({
        //     // source: function(request, response) {
        //         $.ajax({
        //             url:"http://planeta-sport.ru/bitrix/components/bitrix/sale.ajax.locations/search.php",
        //             dataType: "jsonp",
        //             jsonpCallback: "getData",
        //             success: function (data) {
        //                 alert("Success");
        //             }
        //         });
        //     //         data:{
        //     //             featureClass: "p",
        //     //             style: full,
        //     //             maxRows: 12,
        //     //             name_startWith: request.term
        //     //         },
        //     //         success: function(data){
        //     //             response($.map(data.geonames, function(item){
        //     //                 return{
        //     //                     label: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName,
        //     //                     value: item.name
        //     //                 }
        //     //             }));
        //     //         }
        //     //     });
        //     // },
        //     minLength: 2
        // });

        phone.mask("+7(999)999-99-99");

        myForm.submit(function(e) {
            var url = "https://echo.htmlacademy.ru/adaptive?"; // the script where you handle the form input.

            if (valid_name && valid_email && valid_address) {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: myForm.serialize(), // serializes the form's elements.
                    success: function(data)
                    {
                        allInputs.val("");
                        console.log(data); // show response fom the php script.
                    }
                });
            }

            e.preventDefault(); // avoid to execute the actual submit of the form.
        });
    });
})(jQuery);