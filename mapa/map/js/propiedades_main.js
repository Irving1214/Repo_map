var url = "http://api.revimex.mx";
//url = "http://127.0.0.1:8000";
var marker = null;
var markerBlue = "images/blue1.png";
var markerRed = "images/red1.png";
var markerGreen = "images/green1.png"
var allMarkers = [];
var allLayers = [];
var propiedades = [];
var infoWindows = [];
var click = false;
var service;
var markesrsSerives = [];
var slider = null;
var var_min = 0, var_max = 1500000;
var request = window.indexedDB.open("favoritos", 2);
var db;

request.onerror = function(event){
    console.log("Error opening DB", event);
};

request.onupgradeneeded   = function(event){
    console.log("Upgrading");
    db = event.target.result;
    var objectStore = db.createObjectStore("propiedades", { keyPath : "id" });
};

request.onsuccess  = function(event){
    console.log("Success opening DB");
    db = event.target.result;
};

$(document).ready(function(){
  set_sliderPrecio();
  load_propiedades(null, null);
  $("#lupaSearch").click(function() {
        clickOnSearch();
   });
});

/*
 * Cuando se le da click e la lupa de Busqueda, si esta vacia, retorna al pais
 * Si tiene un valor, lo busca y carga los resultaos
 */
function clickOnSearch() {
    /*
     * Al dar click en la lupa de busqueda si esta vacia, resetea el mapa
     */
    if (!$("#pac-input").val()) {
        var prices = slider.noUiSlider.get();
        if (prices[0] != var_min || prices[1] != var_max) {
            reCentrar();
            showPropiedadesByPrecio(prices[0], prices[1]);
        } else {
            location.reload();
        }
    } else {
         $.ajax({
             url: url + "/propiedades/places",
             type: "POST",
             data: {
                 search: $("#pac-input").val()
             },
             dataType: "JSON",
             beforeSend: function () {
                 $("#wait").show();
             },
             success: function (respuesta) {
                 if (respuesta.places.length > 0) {
                     var ui = respuesta.places[0];

                     if (ui.is_plaza == 1) {
                         ui = returnCity(ui);
                     } else {
                         ui = returnColonia(ui);
                     }

                     moveMap(ui.lat, ui.lng, ui.zoom, ui.value);
                     stopOthersClickedMarkers();
                     clearServicesAndReCenter();
                 } else {
                    console.log("Prueba");
                 }
             },
             error: function (respuesta) {
                 console.log(respuesta);
             },
             complete: function () {
                 $("#wait").hide();
            }
         });
    }
}

/*
 * Carga el parametro del usuario, en una busqueda de google y carga los resultados
 */
function getmaploc() {
    geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        address : $("#pac-input").val()
    }, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
            if (results[0].geometry.viewport) {
                map.fitBounds(results[0].geometry.viewport);
                zoomLevels(results[0]);

            } else {
                map.setCenter(results[0].geometry.location);
                zoomLevels(results[0]);
            }

            showPropiedadesBySearch(results[0]);
        } else {
            alert("No encontramos la ubicación ingresada");
        }
    });
}

function set_sliderPrecio() {
  slider = document.getElementById('slider');

  noUiSlider.create(slider, {
      start: [var_min, var_max],
      connect: true,
      range: {
          'min': var_min,
          'max': var_max
      },
      step: 50000,
      orientation: 'horizontal',
      tooltips: [wNumb({
          thousand: ',',
          prefix: '$',
          decimals: 0
      }),
          wNumb({
              thousand: ',',
              prefix: '$ ',
              decimals: 0
          })]
  });

  slider.noUiSlider.on('change', function (values) {
      // Validacion de precios iguales
      values[0] = values[0].replace(".00", "");
      values[1] = values[1].replace(".00", "");

      if ( values[0] == var_min && values[1] == var_min ) {
          values[1] = 50000;
      }

      if ( values[0] == var_max && values[1] == var_max ) {
          values[0] = var_max - 50000;
      }

      if ( (values[0] == values[1]) && (values[0] != 0 && values[1] != var_max)) {
          values[0] = values[0] - 50000;
      }

      if (!isNaN(values[0])) {
          values[0] = values[0].toString();
      }

      if (!isNaN(values[1])) {
          values[1] = values[1].toString();
      }

      // VALIDACION DISTANCIA MINIMA 100 000
      var distancia = values[1] - values[0];

      if(distancia < 100000){
        // modificamso el segundo valor para que se mueva y alcanzar la distancia minima
        var segundoModificado = Number(values[0]) + Number(100000);
        // Ahora seteamos el primer valor y el segundo ya modificado para que se ajuste el slider
        slider.noUiSlider.set([values[0],segundoModificado]);
        // por ultimo modificamos el valor para la busqueda
        values[1] = segundoModificado.toString();
      }

      showPropiedadesByPrecio(values[0], values[1]);
    });
}

function load_propiedades(latitud, longitud) {
    $.ajax({
        url: url + "/propiedades/coordenadas",
        type: "POST",
        data: {
            latitud: latitud,
            longitud: longitud
        },
        dataType: "JSON",
        beforeSend: function () {
            $("#wait").show();
        },
        success: function (respuesta) {
            var index = 1;
            if (Object.keys(respuesta.propiedades).length > 0) {
                $("#casas").html("");
                $("#description-casas").html("");
                $('#casas_cercanas').html("");


                respuesta.propiedades.forEach(function (propiedad) {
                    propiedad.index = index;
                    propiedades.push(propiedad);

                    if (!propiedad.Construccion_m2__c) {
                        propiedad.Construccion_m2__c = "";
                    }

                    if (!propiedad.Terreno_m2__c) {
                        propiedad.Terreno_m2__c = "";
                    }

                    if (!propiedad.N_de_Habitaciones__c) {
                        propiedad.N_de_Habitaciones__c = "";
                    }

                    if (!propiedad.N_de_Ba_os__c) {
                        propiedad.N_de_Ba_os__c = "";
                    }

                    if (!propiedad.Patios__c) {
                        propiedad.Patios__c = "";
                    }

                    if (!propiedad.Estacionamiento__c) {
                        propiedad.Estacionamiento__c = "";
                    }

                    if (!propiedad.Municipio__c) {
                        propiedad.Municipio__c = "";
                    }

                    if (!propiedad.Estado__c) {
                        propiedad.Estado__c = "";
                    }

                    if (!propiedad.Calle__c) {
                        propiedad.Calle__c = "";
                    }

                    if (!propiedad.Colonia__c) {
                        propiedad.Colonia__c = "";
                    }

                    var main_photo = "images/700x420.jpg";
                    if (!jQuery.isEmptyObject(propiedad.fotoPrincipal)) {
                        main_photo = propiedad.fotoPrincipal;
                    }

                    var casa_card = '<div class="col-xs-12 col-md-6 como_estas" data-price="' + propiedad.PrecioVenta__c + '" id="caja_' + index + '">' +
                        '<div class="thumbnail" id="img-thumbnail_' + index + '">' +
                        '<img class="imagenres" id="image_main_thumbnail_' + index + '" alt="' + propiedad.PrecioVenta__c + ' ' + propiedad.Estado__c + '" data-src="' + main_photo + '" src="' + main_photo + '" >' +

                        '<div class="caption">' +
                        '<center><h4 style="font-size: 17px; opacity: 0; position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%);" id="letrasImagen' + index + '"><div id="display_plaza_' + index + '"><div style="color: #CFDB00; ">Ciudad<br> <span style="color: #FFFFFF">' + propiedad.Plaza__c + '</span> </div></div><div id="display_colonia_' + index + '" style="display: none"><div style="color: #CFDB00; ">Colonia<br> <span style="color: #FFFFFF">' + propiedad.Colonia__c + ' </span></div></div><div style="color: #CFDB00; ">Precio<br><b> ' +
                        '<span style="color: #FFFFFF">$' + propiedad.PrecioVenta__c + '</span></center></div></b></h4>' +
                        '<center><b><div class="texto_card" style="color: #002967" ">Ciudad: <span class="texto2_card">' + propiedad.Plaza__c + '</span></div></center></b>' +
                        '<div align="center" class="divButton"><button class="estiloBton">Ver más</button></div><br>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    $("#casas").append(casa_card);
                    index = index + 1;
                });

                addMarkers(respuesta.propiedades);
            }

        },
        error: function (respuesta) {
            console.log(respuesta);
        },
        complete: function () {
            boxListeners();
            $("#wait").hide();
        }
    });
}

function restoreMarkers(){
    for(var m = 0; m< allMarkers.length ; m++){
            allMarkers[m].setMap(map);
    }
}

function showPropiedadesByPrecio(min, max) {
    // quitamos todos los markers para despeus solo poner los de la busqueda
    for(var m = 0; m< allMarkers.length ; m++){
            allMarkers[m].setMap(null);
    }
    var ids = [];
    var t = 0;
    for (var i = allMarkers.length, bounds = map.getBounds(); i--;) {
        if (bounds.contains(allMarkers[i].getPosition())) {
            ids.push(allMarkers[i].propiedad);
            t = t + 1;
        }
    }

    if ($('#casas_cercanas').is(":visible") || $('#titulocercanas').is(":visible")) {
        // Cierra las similares y muestra las normales
        $("#titulocercanas").hide();
        $('#casas').appendTo('#house_cards');
        $('#casas_cercanas').hide();
    }

    if (min || max) {
        $.ajax({
            url: url + "/propiedades/searchbyprecio",
            type: "POST",
            data: {
                precio_minimo: min,
                precio_maximo: max,
                propiedades: ids
            },
            dataType: "JSON",
            beforeSend: function () {
                $("#wait").show();
            },

            success: function (response) {
                if (response.propiedades.length > 0) {
                    if (min && max) {
                        $("#title-header").html("<p class='aviso animated fadeInRight'><center> " + response.propiedades.length + " propiedades con un precio entre de $" + num(min) + " y $" + num(max) + "</center></p>");
                        $("#title-header").css({
                            "padding-bottom": ".5%",
                        });
                        
                    }

                    if (min && !max) {
                        $("#title-header").html("<p class='aviso animated fadeInRight'><center> " + response.propiedades.length + " propiedades con un precio mayor a $" + num(min) + "</center></p>");
                        $("#title-header").css({

                            "padding-bottom": ".5%",

                        });
                         
                    }

                    if (max && !min) {
                        $("#title-header").html("<p class='aviso animated fadeInRight'> <center>" + response.propiedades.length + " propiedades con un costo menor a $" + num(max) + "</center></p>");
                        $("#title-header").css({

                            "padding-bottom": ".5%",

                        });
                         
                    }
                    // apartamos el arreglo de propiedades obtenidas
                    var propiedades = response.propiedades;
                    //iteramos los marker
                    for(var m = 0; m< allMarkers.length ; m++){
                        //iteramso las propiedades
                        for(var p=0; p< propiedades.length ; p++){
                            // comparamos para que solo se meustren los markers del resultado de la busqueda
                            if(propiedades[p].Id == allMarkers[m].propiedad){
                                allMarkers[m].setMap(map);
                            
                                
                            }
                        }
                    }
                    hideCurrentDescription();
                    setDefaulBehaviorMarkers();
                    
                } else {

                    if (min && max) {
                        $("#title-header").html("<p class='aviso animated fadeInRight'><center>Por el momento no encontramos propiedades en el rango de $" + num(min) + " y $" + num(max) + "</center></p>");
                        $("#title-header").css({

                            "padding-bottom": ".5%",

                        });

                    }

                    if (min && !max) {
                        $("#title-header").html("<p class='aviso animated fadeInRight'><center>Por el momento no encontramos propiedades con un precio mayor $" + num(min) + "</center></p>");
                        $("#title-header").css({

                            "padding-bottom": ".5%",

                        });
                         
                    }

                    if (max && !min) {
                        $("#title-header").html("<p class='aviso animated fadeInRight'><center>Por el momento no encontramos propiedades con un precio menor $" + num(max) + "</center></p>");
                        $("#title-header").css({

                            "padding-bottom": ".5%",

                        });
                        
                    }
                }
                setTimeout(function(){
                    // despeus de 3 segunda se desapareces este resumen
                    $("#title-header").html("");
                    $("#title-header").css({"padding": "0"});
                },6000);
                 console.log(response.propiedades);
              

                    
                    showOnlySomeCards(response.propiedades, "precio");
                    
               
                
            },
            error: function (respuesta) {
                console.log(respuesta);
            },
            complete: function () {
                $("#wait").hide();
            }
        });
    }
}

function hideCajas(className) {
    var others = Array.from(document.querySelectorAll('*[id^="caja_"]'));
    others.forEach(function (item) {
        if ($(item).hasClass(className)) {
            $(item).removeClass(className);
        }

        if (!$(item).hasClass("search") || !$(item).hasClass("precio") || !$(item).hasClass("cerca")) {
            $(item).hide();
        } else {
            $(item).show();
        }
    });
}

function displayboxes(className) {
    var others = Array.from(document.querySelectorAll('*[id^="caja_"]'));
    others.forEach(function (item) {
        if (!$(item).hasClass(className)) {
            $(item).hide();
            
        } else {
            
                 $(item).show();
           
            
           
        }
    });
}

function showOnlySomeCards(propies, className) {
    hideCajas(className);

    for (var j = 0; j < propies.length; j++) {
        for (var i = j; i < propiedades.length; i++) {
            var box = $("#caja_" + propiedades[i].index);

            if (box.hasClass("search") && box.hasClass("precio") && box.hasClass("cerca")) {
                if (box.is(":visible")) {
                    if (propies[j].Id == propiedades[i].Id) {
                        //box.show();
                        box.addClass(className);    
                        break;
                    } else {
                        box.removeClass(className);
                        
                        //box.hide();
                    }
                }
            } else {
                if (propies[j].Id == propiedades[i].Id) {
                    //box.show();
                    box.addClass(className);
                    break;
                }
            }
        }
    }

    displayboxes(className);
}

/*
 * ALV
 */
function cleanCercanas() {
    var others = Array.from(document.querySelectorAll('*[id^="caja_"]'));
    others.forEach(function (item) {
        $(item).removeClass("search");
        $(item).removeClass("precio");
        $(item).removeClass("cerca");
    });
}

function showOnlyCercanas(propies, className) {
    cleanCercanas();
    hideCajas(className);

    for (var j = 0; j < propies.length; j++) {
        for (var i = j; i < propiedades.length; i++) {
            var box = $("#caja_" + propiedades[i].index);

            if (box.hasClass("search") || box.hasClass("precio") || box.hasClass("cerca")) {
                if (box.is(":visible")) {
                    if (propies[j].Id == propiedades[i].Id) {
                        //box.show();
                        box.addClass(className);
                        
                        break;
                    } else {
                        box.removeClass(className);
                        
                    }
                }
            } else {
                if (propies[j].Id == propiedades[i].Id) {
                    //box.show();
                    box.addClass(className);
                     
                    break;
                } else {
                    box.removeClass(className);
                    
                }
            }
        }
    }

    changePlazaToColonia(true);
    displayboxes(className);
}

var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

/*
 * Si la propiedad ya esta en favoritos, cambia el icono del corazón
 */
function isFavorite(propiedad_id, index) {
    var request = db.transaction(["propiedades"], "readwrite").objectStore("propiedades").getAll();
    request.onsuccess = function (event) {
        request.result.forEach(function (result) {
            if (result.propiedad.Id == propiedad_id) {
                $("#heart_" + index).attr("src", "images/ICON-PIC-HEART-RED.png");
            }
        });
    };
}

function iLikeIt(id) {
    var heart = $("#heart_" + id);
    // TODO remover de favoritos
    if (heart.hasClass("iloveit")) {
        heart.removeClass("iloveit");
        heart.addClass("iDontLoveIt");
        heart.css("color", "rgba(255, 255, 255, 0.62)");
    } else { // agregar a favoritos
        var propiedad_id = null;
        for (var i = 0; i < allMarkers.length; i++) {
            if ("marker" + id == allMarkers[i].id) {
                    propiedad_id = allMarkers[i].propiedad;
                break;
            }
        }

        /*
         * Obtiene la propiedad
         */
        var propiedad = null;
        for (i = 0; i < propiedades.length; i++) {
            if (propiedad_id == propiedades[i].Id) {
                propiedad = propiedades[i];
                break;
            }
        }

        /*
         * Almacena la propiedad en indexeddb
         */
        var transaction = db.transaction(["propiedades"], "readwrite");
        transaction.oncomplete = function(event) {
            console.log("Success");
        };

        transaction.onerror = function(event) {
            console.log("Error");
        };
        var objectStore = transaction.objectStore("propiedades");

        objectStore.add({id: propiedad.Id, propiedad: propiedad});

        /*
         * Notifica, cambia el icono y muestr el modal de favoritos
         */
        notificaction("La propiedad se agrego a tus favoritos", "success");
        heart.attr("src", "images/ICON-PIC-HEART-RED.png");
        $('#modalFavoritos' + id).show();
    }
}

function caracteresCorreoValido(email){
    var caract = new RegExp(/^([a-zA-Z0-9\._-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    if (caract.test(email) == false){
        return false;
    } else {
      return true;
    }

}
function caracteresTelValido(telefono){
    var caract = new RegExp(/^([0-9]{10,10})+$/);
    if (caract.test(telefono) == false){
        return false;
    } else {
      return true;
    }
}

function caracteresNombreValido(nombre){
    var caract = new RegExp(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g);
    if (caract.test(nombre) == false){

        return false;
    } else {
      return true;
    }
}

function sendMail(propiedad_id) {
    event.preventDefault();
    var mensaje = '';
    if (!$("#form_nombre_" + propiedad_id).val() && !$("#form_telefono_" + propiedad_id).val()) {
      mensaje = '<span>*Escribe tu nombre completo </span> <br>'
      mensaje += '<span>*Escribe tu número de teléfono</span>';
      notificaction(mensaje, "warning", 1);
    } else {

      var form_ok = true;
      if (!caracteresNombreValido( $("#form_nombre_" + propiedad_id).val() )) {
        mensaje += "<span>*Escribe tu nombre correctamente</span><br>";
        $("#form_nombre_" + propiedad_id).val('');
        form_ok = false;
      }
      if (!caracteresTelValido( $("#form_telefono_" + propiedad_id).val() )) {
        mensaje += "<span>*Escribe correctamente tu número de teléfono, al menos 10 dígitos </span><br>";
        form_ok = false;
        $("#form_telefono_" + propiedad_id).val('')
      }
      if($("#form_email_" + propiedad_id).val().length > 0) {
        if (!caracteresCorreoValido( $("#form_email_" + propiedad_id).val() )){
          mensaje += "<span>*Escribe correctamente tu correo electrónico</span><br>";
          $("#form_email_" + propiedad_id).val('');
          form_ok = false;
        }
      }
      if (form_ok) {
        $.ajax({
            url: url + "/contactar",
            type: "POST",
            data: {
                nombre: $("#form_nombre_" + propiedad_id).val(),
                telefono: $("#form_telefono_" + propiedad_id).val(),
                email: $("#form_email_" + propiedad_id).val(),
                mensaje: $("#form_mensaje_" + propiedad_id).val()
            },
            dataType: "JSON",
            beforeSend: function () {
                $("#wait").show();
            },
            success: function (respuesta) {
              $('#form_EjecutivoVtas')[0].reset();
              notificaction(respuesta.mensaje, "success", 0 );
            },
            error: function (respuesta) {
                notificaction(respuesta.mensaje, "danger", 0);
            },
            complete: function () {
                $("#wait").hide();
            }
        });
      } else {
        notificaction(mensaje, "warning", 1);
      }
    }
}

function notificaction(msg, type, flag) {
  var div = $("#msg");
  if(flag == 1) {
    div = $('#msg_form');
  }
  if (flag == 0) {
    div = $('#msg');
  }
    div.html("");
    div.html('<div class="alert alert-' + type + '"> &nbsp; ' + msg + '</div>');

    setTimeout(function () {
        div.html("");
    }, 5000);
    if (flag == 0) {
      $('html, body').animate({
          scrollTop: $("#top").offset().top
      }, 800);
    }
}

//comas de los precios
function num(comas) {
    if (comas > 999999) {
        conPunto = comas.substring(0, comas.length - 6);
        conPunto2 = comas.substring(comas.length - 6, comas.length - 3);
        conPunto3 = comas.substring(comas.length - 3, comas.length);
        comas = conPunto + ',' + conPunto2 + ',' + conPunto3;
    } else {
        if (comas > 999) {
            conPunto = comas.substring(0, comas.length - 3);
            conPunto2 = comas.substring(comas.length - 3, comas.length);
            comas = conPunto + ',' + conPunto2;
        }
    }

    return comas;
}
