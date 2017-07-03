var url = "http://api.revimex.mx";
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

$(document).ready(function(){
  set_sliderPrecio();
  load_propiedades(null, null);
});

function set_sliderPrecio() {
  var slider = document.getElementById('slider');
  noUiSlider.create(slider, {
      start: [0, 1500000],
      connect: true,
      range: {
          'min': 0,
          'max': 1500000
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
      //showPropiedadesByPrecio(values[0].replace(".00", ""), values[1].replace(".00", ""));
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

                    var casa_card = '<div class="col-md-6 como_estas" id="caja_' + index + '">' +
                        '<div class="thumbnail" id="img-thumbnail_' + index + '">' +
                        '<img class="imagenres" id="image_main_thumbnail_' + index + '" alt="' + propiedad.PrecioVenta__c + ' ' + propiedad.Estado__c + '" data-src="' + main_photo + '" src="' + main_photo + '" >' +

                        '<div class="caption">' +
                        '<center><h4 style="font-size: 17px; opacity: 0; position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%);" id="letrasImagen' + index + '"><div id="display_plaza_' + index + '"><div style="color: #CFDB00; ">Plaza<br> <span style="color: #FFFFFF">' + propiedad.Plaza__c + '</span> </div></div><div id="display_colonia_' + index + '" style="display: none"><div style="color: #CFDB00; ">Colonia<br> <span style="color: #FFFFFF">' + propiedad.Colonia__c + ' </span></div></div><div style="color: #CFDB00; ">Precio<br><b> ' +
                        '<span style="color: #FFFFFF">$' + propiedad.PrecioVenta__c + '</span></center></div></b></h4>' +
                        '<br><div align="center" class="divButton"><button class="estiloBton">Ver más</button></div><br>' +
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
