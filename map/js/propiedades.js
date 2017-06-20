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

$(document).ready(function () {
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
        tooltips: [ wNumb({ thousand: ',',
                            prefix: '$',
                            decimals: 0 }),
                    wNumb({ thousand: ',',
                            prefix: '$ ',
                            decimals: 0 }) ]
    });

    slider.noUiSlider.on('change', function(values){
        showPropiedadesByPrecio(values[0].replace(".00", ""), values[1].replace(".00", ""));
    });
});

function initMap() {
    var mx = {lat: 24.2436666, lng: -102.4551421};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: mx,

        styles: [
            {
                "featureType": "all",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },

            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#333333"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#c32f2f"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#5160ac"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#5160ac"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#5160ac"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#5160ac"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#5160ac"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "saturation": "0"
                    },
                    {
                        "lightness": "22"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "weight": "0.01"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#072ad5"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#263791"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.landcover",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#33cccc"
                    },
                    {
                        "lightness": "88"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },

            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c1d72e"
                    }
                ]
            },

            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#cfdff4"
                    }
                ]
            },

            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a1d9f5"
                    }
                ]
            },


            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#ffffff"
                    }
                ]
            }
        ]
    });

    load_propiedades(null, null);


    $('#country').on('change', function () {
        var estado = $(this).val();
        centrarEstado(estado);
    });


    var input = /** @type {!HTMLInputElement} */(document.getElementById('pac-input'));
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    autocomplete.setComponentRestrictions({'country': 'mx'});
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        autocomplete.setComponentRestrictions({'country': 'mx'});
        if (!place.geometry) {
            window.alert("No existe el lugar: '" + place.name + "'");
            return;
        }
        // obtenemos la ubicacion, si es torreon o gomez palacio el zoom sera menor
        var ubicacion = place;
        if (place.geometry.viewport) {
            console.log(place.geometry.location);
            map.fitBounds(place.geometry.viewport);
            if (ubicacion.place_id == "ChIJ-7NFu6nbj4YRHaCucJl6zIs" || ubicacion.place_id == "ChIJr9SXsc7Zj4YRzbjXdRQ7oUI") {
                map.setZoom(12);
            }
        } else {
            console.log(place.geometry.location);
            map.setCenter(place.geometry.location);
            if (ubicacion.place_id == "ChIJ-7NFu6nbj4YRHaCucJl6zIs" || ubicacion.place_id == "ChIJr9SXsc7Zj4YRzbjXdRQ7oUI") {
                map.setZoom(12);
            } else {
                map.setZoom(17);
            }
            //map.setZoom(17);  // Why 17? Because it looks good.
        }

        showPropiedadesBySearch(ubicacion);
    });

    map.addListener('zoom_changed', function () {
        if (map.getZoom() < 7) {
            var others = Array.from(document.querySelectorAll('*[id^="caja_"]'));
            others.forEach(function (item) {
                $(item).css("display", "block");
            });

            $("#title-header").html("");
        }

        if (map.getZoom() > 5) {
            $('#icon_pic_return_container').css('display', 'block');
        } else {
            $('#icon_pic_return_container').css('display', 'none');
        }
    });
}

/*
 * Devuelve la latitud y longitud de un estado
 */
function returnEstadoLatLng(estado) {
    if (estado == "aguascalientes") return {lat: 22.0233531, lng: -102.23174};
    else if (estado == "cdmx") return {lat: 19.432778, lng: -99.133222};
    else if (estado == "baja california") return {lat: 29.9458743, lng: -115.074436};
    else if (estado == "baja california sur") return {lat: 25.3809296, lng: -112.2621838};
    else if (estado == "campeche") return {lat: 18.745653, lng: -90.105701};
    else if (estado == "coahuila") return {lat: 27.017455, lng: -102.002873};
    else if (estado == "chiapas") return {lat: 16.613283, lng: -92.606901};
    else if (estado == "chihuahua") return {lat: 28.479492, lng: -106.336019};
    else if (estado == "durango") return {lat: 24.867336, lng: -104.854028};
    else if (estado == "guanajuato") return {lat: 20.865441, lng: -101.160889};
    else if (estado == "guerrero") return {lat: 17.753174, lng: -99.750391};
    else if (estado == "hidalgo") return {lat: 20.458645, lng: -98.911400};
    else if (estado == "jalisco") return {lat: 20.334864, lng: -103.931146};
    else if (estado == "estado de mexico") return {lat: 19.545726, lng: -99.506816};
    else if (estado == "michoacan") return {lat: 19.140988, lng: -102.044040};
    else if (estado == "morelos") return {lat: 18.756583, lng: -99.062057};
    else if (estado == "nayarit") return {lat: 21.666606, lng: -104.915648};
    else if (estado == "nuevo leon") return {lat: 25.502726, lng: -99.968843};
    else if (estado == "oaxaca") return {lat: 17.072926, lng: -96.731097};
    else if (estado == "puebla") return {lat: 19.165502, lng: -97.749880};
    else if (estado == "queretaro") return {lat: 20.738633, lng: -99.941326};
    else if (estado == "quintana roo") return {lat: 19.572566, lng: -88.234934};
    else if (estado == "san luis potosi") return {lat: 22.355315, lng: -100.278629};
    else if (estado == "sinaloa") return {lat: 24.838919, lng: -107.499454};
    else if (estado == "sonora") return {lat: 29.646111, lng: -110.868889}; // TODO arreglar coordenadas
    else if (estado == "tabasco") return {lat: 17.986723, lng: -92.943680};
    else if (estado == "tamaulipas") return {lat: 24.157274, lng: -98.493648};
    else if (estado == "tlaxcala") return {lat: 19.390873, lng: -98.142241};
    else if (estado == "veracruz") return {lat: 19.434514, lng: -96.635823};
    else if (estado == "yucatan") return {lat: 20.892298, lng: -88.998236};
    else if (estado == "zacatecas") return {lat: 19.140988, lng: -102.044040};
}

function centrarEstado(estado) {
    if (estado != "all") {
        showPropiedadesByEstado(estado);
        map.setCenter(returnEstadoLatLng(estado));
        map.setZoom(8);
    } else {
        reCentrar();
    }
}

function reCentrar() {
    var others = Array.from(document.querySelectorAll('*[id^="caja_"]'));
    others.forEach(function (item) {
        $(item).css("display", "block");
    });
    changePlazaToColonia(false);

    map.setCenter(new google.maps.LatLng(19.694304, -100.5560111));
    map.setZoom(5);
}

function nombreMunicipio(estado) {
    if(estado==''){
        return ''
    } else {
        return estado +', '
    }
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

                    var re = /(?:\.([^.]+))?$/;

                    $("#casas").append(
                        '<div class="col-md-6 como_estas" id="caja_' + index + '">' +
                        '<div class="thumbnail" id="img-thumbnail_' + index + '">' +
                        '<img class="imagenres" id="image_main_thumbnail_' + index + '" alt="' + propiedad.PrecioVenta__c + ' ' + propiedad.Estado__c + '" data-src="http://revimex.mx/' + main_photo + '" src="http://revimex.mx/' + main_photo + '" >' +

                        '<div class="caption">' +
                        '<center><h4 style="font-size: 17px; opacity: 0; position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%);" id="letrasImagen' + index + '"><div id="display_plaza_' + index + '"><div style="color: #CFDB00; ">Plaza<br> <span style="color: #FFFFFF">'+ propiedad.Plaza__c + '</span> </div></div><div id="display_colonia_' + index + '" style="display: none"><div style="color: #CFDB00; ">Colonia<br> <span style="color: #FFFFFF">' + propiedad.Colonia__c + ' </span></div></div><div style="color: #CFDB00; ">Precio<br><b> ' +
                        '<span style="color: #FFFFFF">$' + propiedad.PrecioVenta__c + '</span></center></div></b></h4>' +
                        '<br><div align="center" class="divButton"><button class="estiloBton">Ver más</button></div><br>' +
                        '</div>' +
                        '</div>' +
                        '</div>');

                    var modal_casa = '<div class="col-md-6 hola_description" id="house_description_' + index + '" style="display: none">' +

                        '<div class="col-md-12">' +
                        '<div id="myCarousel_' + index + '" class="carousel slide" data-ride="carousel">' +

                        '<!-- Indicators -->' +
                        '<ol class="carousel-indicators">';

                    if (propiedad.files.length > 0) {
                        var ind = 0;
                        propiedad.files.forEach(function (file) {
                            if (re.exec(file.nombre)[1] != "mp4") {
                                if (ind === 0) {
                                    modal_casa = modal_casa + '<li data-target="#myCarousel_' + index + '" data-slide-to="0" class="active"></li>';
                                } else {
                                    modal_casa = modal_casa + '<li data-target="#myCarousel_' + index + '" data-slide-to="' + ind + '"></li>';
                                }
                                ind += 1;
                            }

                        });
                    } else {
                        modal_casa = modal_casa + '<li data-target="#myCarousel_' + index + '" data-slide-to="0" class="active"></li>';
                    }


                    modal_casa = modal_casa +
                        '</ol>' +

                        '<!-- CorazÃ³n de Like -->' +
                        '<div style="position: absolute; z-index: 4; padding-right: : 10px; padding-top: 15px; margin-left: 90%">' +
                        '<img height="13%" id="heart_' + index + '" src="images/ICON-PIC-HEART.png" "></i>' +
                        '</div>' +

                        '<!-- Regreso a Cards -->' +
                        '<div style="position: absolute; z-index: 4; padding-left: 15px; padding-top: 15px;">' +
                        '<img height="13%" id="card_cubes_' + index + '" src="images/ICON-PIC-RETURN.png" "></i>' +
                        '</div>' +

                        '<!-- Wrapper for slides -->' +
                        '<div class="carousel-inner">';

                    if (propiedad.files.length > 0) {
                        ind = 0;
                        propiedad.files.forEach(function (file) {
                            if (re.exec(file.nombre)[1] != "mp4") {
                                if (ind === 0) {
                                    modal_casa = modal_casa +
                                        '<div class="item active">' +
                                        '<center>' +
                                        '<img class="imgt" src="http://revimex.mx/' + file.linkPublico + '" alt="' + file.nombre + '">' +
                                        '<center>' +
                                        '<div class="carousel-caption">' +
                                        '</div>' +
                                        '</div>';
                                } else {
                                    modal_casa = modal_casa +
                                        '<div class="item">' +
                                        '<center>' +
                                        '<img class="imgt" src="http://revimex.mx/' + file.linkPublico + '" alt="' + file.nombre + '">' +
                                        '</center>' +
                                        '<div class="carousel-caption">' +
                                        '</div>' +
                                        '</div>';
                                }
                                ind += 1;


                            }
                        });
                    } else {
                        modal_casa = modal_casa +
                            '<div class="item active">' +
                            '<center>' +

                            '<img class="imgt" src="images/700x420.jpg" alt="Imagen no disponible">' +
                            '<center>' +
                            '<div class="carousel-caption">' +
                            '</div>' +
                            '</div>';
                    }


                    modal_casa = modal_casa +
                        '</div>' +
                        '<!-- Left and right controls -->' +
                        '<a class="left carousel-control" href="#myCarousel_' + index + '" data-slide="prev">' +
                        '<span class="glyphicon glyphicon-chevron-left"></span>' +
                        '<span class="sr-only">Anterior</span>' +
                        '</a>' +

                        '<a class="right carousel-control" href="#myCarousel_' + index + '" data-slide="next">' +
                        '<span class="glyphicon glyphicon-chevron-right"></span>' +
                        '<span class="sr-only">Siguiente</span>' +
                        '</a>' +
                        '</div>' +
                        '<center>'+
                        '<div class="revimexBlue"><br>' +

                        '<i class="capitalize">' + nombreMunicipio(propiedad.Municipio__c)+ propiedad.Estado__c + '<br>' +
                        '' + propiedad.Calle__c +
                        ', Col. ' + propiedad.Colonia__c + '<br>' +

                        '</div>' +
                        '</center>'+
                        '</div>' +

                        '<div class="row" align="center">' +
                        '<div class="col-md-4 col-md-offset-4 detelle">' +
                        '<button class="boton_detalles_auto"  class="btn btn-primary" onclick="modal_variables" data-toggle="modal" id="card_cubes_' + index + '" style="    margin-bottom: 4%;">Regresar</button>' +
                        '</div>' +
                        '</div>' +







                        // INFORMACION CASAS
                        '<div class="row revimexBlue">' +
                        // Caracteristicas
                        '<div class="col-md-6"><br>' +

                        '<div class="row">' +
                        '<p class="bg-primary" align="center">CaracterÃ­sticas</p>' +
                        '<ul><br>' +
                        '<li><b style="font-weight:35px;"><strong>ID:</storng> </b> ' + propiedad.oferta + '</li>' +
                        '<li><b><strong>Precio:</storng> </b> $' + propiedad.PrecioVenta__c + '</li>' +

                        '<li><b><storng>Terreno:</strong> </b> ' + propiedad.Terreno_m2__c + '&nbsp;m<sup>2</sup>' + '</li>' +
                        '<li><b><storng>ConstrucciÃ³n:</strong> </b> ' + propiedad.Construccion_m2__c + '&nbsp;m<sup>2</sup>' + '</li>' +
                        '<li><b><storng>Niveles:</strong> </b> ' + propiedad.Niveles_Plantas__c + '</li>' +

                        '<li><b><strong>Habitaciones: </strong></b> ' + propiedad.N_de_Habitaciones__c + '</li>' +
                        '<li><b><strong>BaÃ±os: </storng></b> ' + propiedad.N_de_Ba_os__c + '</li>' +
                        '<li><b><strong>Estacionamientos: </strong></b> ' + propiedad.Estacionamiento__c + '</li>' +

                        '</li>' +
                        '</ul>' +
                        '</div>' +

                        '<div class="row" align="center">' +
                        '<div class="col-md-4">' +

                        '</div>' +
                        '<div class="col-md-4">' +

                        '</div>' +
                        '<div class="col-md-4">' +

                        '</div>' +
                        '</div>' +
                        '<br><br>' +
                        '</div>' +

                        // Lugares Cercanos
                        '<div class="col-md-6" align="center"><br>' +
                        '<p class="bg-primary">Lugares cercanos</p>' +
                        '<br>' +
                        '<div class="row" align="center">' +
                        '<div class="col-md-4">' +
                        '<img class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_RESTAURANTES-OFF.png"><i class="numTarjeta"></i>' +
                        '</div>' +

                        '<div class="col-md-4">' +
                        '<img class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_ESCUELAS-OFF.png"><i class="numTarjeta"></i>' +
                        '</div>' +

                        '<div class="col-md-4">' +
                        '<img class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_HOSPITALES-OFF.png"><i class="numTarjeta"></i>' +
                        '</div>' +
                        '</div>' +
                        '</br></br>' +
                        '<div class="row" align="center">' +
                        '<div class="col-md-4">' +
                        '<img class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_COMERCIALES-OFF.png"><i class="numTarjeta"></i>' +
                        '</div>' +

                        '<div class="col-md-4">' +
                        '<img class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_SUPER-OFF.png"><i class="numTarjeta"></i>' +
                        '</div>' +

                        '<div class="col-md-4">' +
                        '<img class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_PARQUES-OFF.png"><i class="numTarjeta"></i>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +

                        '<div class="row" align="center">' +
                        '<div class="col-md-4 col-md-offset-4 detelle" style="margin-top: -4%;">' +
                        '<button class="boton_detalles_auto"  class="btn btn-primary" onclick="modal_variables(\'' +
                        propiedad.Calle__c +
                        '\', \'' + propiedad.Colonia__c +
                        '\', \'' + propiedad.Municipio__c +
                        '\', \'' + propiedad.Estado__c +
                        '\', \'' + propiedad.Terreno_m2__c +
                        '\', \'' + propiedad.Construccion_m2__c +
                        '\', \'' + propiedad.N_de_Habitaciones__c +
                        '\', \'' + propiedad.N_de_Ba_os__c +
                        '\', \'' + propiedad.Patios__c +
                        '\', \'' + propiedad.Estacionamiento__c +
                        '\', \'' + propiedad.PrecioVenta__c +
                        '\', \'' + main_photo +
                        '\', \'' + propiedad.oferta +

                        '\');" data-toggle="modal" data-target="#pdf-modal" >Detalles</button>' +
                        '</div>' +
                        '</div>' +

                        '</br></br>' +

                        //SECCION GERENTE
                        '<div class="row">' +
                        '<div class="col-md-12" style="margin-top: -3%;">' +
                        '<p class="bg-primary" align="center">Ejecutivo de Ventas</p>' +
                        '<div class="row revimexBlue" style="margin-top: -4%;">' +
                        '<div class="col-md-7" style="padding-left: 0%;">' +
                        '<p  style="font-size: 15px; margin-top:13%;">' +





                        '<b><img id="heart" class="logos" src="images/CONTACT-PROPIEDADES-WEB-MAIL.png">&nbsp; &nbsp;<a href="mailto:lizbeth.ordonez@revimex.mx" style="font-size:.78em; text-transform:lowercase;font-size: 16px;">info@revimex.mx</a></b><br><br>' +

                        '<b><img id="heart" class="logos" src="images/CONTACT-PROPIEDADES-WEB-PHONE.png">&nbsp; &nbsp;01 800 200 0440</b><br><br>' +

                        '<b><img id="facebook" class="logos redes_sociales" src="images/CONTACT-PROPIEDADES-WEB-FACEBOOK.png"">' +

                        '<b><img id="instagram" class="logos redes_sociales" src="images/CONTACT-PROPIEDADES-WEB-INSTAGRAM.png"">' +

                        '<b><img id="twitter" class="logos redes_sociales" src="images/CONTACT-PROPIEDADES-WEB-TWITTER.png"">' +

                        '<b><img id="youtube" class="logos redes_sociales" src="images/CONTACT-PROPIEDADES-WEB-YOUTUBE.png"">' +





                        '<br>' +

                        '</p>' +
                        '</div>' +

                        '<div class="col-md-5">' +
                        '<form>' +
                        '<div class="form-group">' +
                        '<br><br>' +
                        '<input type="text" class="input_borde" class="form-control" id="form_nombre_' + propiedad.Id + '" placeholder="  Nombre" aria-describedby="sizing-addon2">' +
                        '<br></br>' +
                        '<input type="text" class="input_borde" class="form-control" id="form_telefono_' + propiedad.Id + '" placeholder="  TelÃ©fono" aria-describedby="sizing-addon2">' +
                        '<br></br>' +
                        '<input type="text" class="input_borde" class="form-control" placeholder="  E-mail" id="form_email_' + propiedad.Id + '" aria-describedby="sizing-addon2">' +
                        '<br></br></br>' +
                        '<textarea class="input_borde" class="form-control" placeholder="  Comentarios" id="form_mensaje_' + propiedad.Id + '"></textarea><br>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '</div>' +
                        '<br>' +
                        '</div>' +
                        '</div>' +

                        '<div class="row" align="center">' +
                        '<div class="col-md-4 col-md-offset-4">' +
                        '<button type="button" onclick="sendMail(\'' + propiedad.Id + '\');" class ="boton_detalles_auto" class="btn btn-primary">Enviar</button>' +
                        '</div>' +
                        '</div>' +

                        '</br>';


                    $("#description-casas").append(modal_casa);

                    index = index + 1;

                });

                addMarkers(respuesta.propiedades);
            }

        },
        error: function (respuesta) {
            console.log(respuesta);
        },
        complete: function () {

            var others = Array.from(document.querySelectorAll('*[id^="img-thumbnail"]'));
            others.forEach(function (item) {
                $(item).mouseover(function () {
                    var aiDi = $(item).attr('id');
                    aiDi = aiDi.split("_");
                    hover(aiDi[1]);
                });

                $(item).mouseout(function () {
                    var aiDi = $(item).attr('id');
                    aiDi = aiDi.split("_");
                    out(aiDi[1]);

                });

                $(item).click(function () {
                    var aiDi = $(item).attr('id');
                    aiDi = aiDi.split("_");
                    $("#house_description_" + aiDi[1]).show();
                    $("#house_cards").hide();

                    getMarker(aiDi[1]);
                });
            });

            others = Array.from(document.querySelectorAll('*[id^="card_cubes_"]'));
            others.forEach(function (item) {
                $(item).click(function () {
                    var aiDi = $(item).attr('id');
                    aiDi = aiDi.split("_");
                    $("#house_cards").show();
                    $("#house_description_" + aiDi[2]).hide();
                    setDefaulBehaviorMarkers();
                    reCentrar();
                    changePlazaToColonia(false);
                });
            });

            others = Array.from(document.querySelectorAll('*[id^="heart_"]'));
            others.forEach(function (item) {
                $(item).click(function () {
                    var aiDi = $(item).attr('id');
                    aiDi = aiDi.split("_");

                    iLikeIt(aiDi[1]);
                });
            });

            $("#wait").hide();
        }
    });
}

function addMarkers(propiedades) {

    var index = 1;
    propiedades.forEach(function (propiedad) {
        var latitud = parseFloat(propiedad.Punto_Latitude__c);
        var longitud = parseFloat(propiedad.Punto_Longitude__c);
        var Latlng = new google.maps.LatLng(latitud.toFixed(6), longitud.toFixed(6));

        var marker_color = markerBlue;
        if (propiedad.promocion == 1) {
            marker_color = markerRed;
        }

        var contentString =




            '<div >' +
            '<p style="font-size: 10px; padding:0px;"><i>' +

            'Calle: ' + propiedad.Calle__c + '<br />' +' Colonia: ' + propiedad.Colonia__c +
            '</p></i>' +
            '</div>';



        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({

            position: Latlng,
            map: map,

            title: propiedad.Plaza__c + ", " + propiedad.Estado2__c,
            id: 'marker' + index,
            icon: marker_color,
            optimized: false
        });

        marker.index = index;
        marker.propiedad = propiedad.Id;

        allMarkers.push(marker);
        infoWindows.push(infowindow);

        var myoverlay = new google.maps.OverlayView();
        myoverlay.draw = function () {
            this.getPanes().markerLayer.id = 'markerLayer' + index;
        };
        allLayers.push(myoverlay);
        myoverlay.setMap(map);

        google.maps.event.addListener(marker, "click", function () {
            var marker_id = marker.id;
            var index_id = marker_id.replace("marker", "");
            var others = Array.from(document.querySelectorAll('*[id^="house_description_"]'));
            others.forEach(function (item) {
                $(item).hide();
            });
            map.setZoom(17);
            map.setCenter(marker.getPosition());

            $("#house_description_" + index_id).show();
            $("#house_cards").hide();
            //al dar click en el marker entra a detalle, debe cambiar a rojo y saltar estand oen detalle     border: 4px solid #46BEEF;
            for (var cont = 0; cont < allMarkers.length; cont++) {
                allMarkers[cont].setAnimation(null);
                allMarkers[cont].setIcon(markerBlue);
            }
            marker.setAnimation(google.maps.Animation.BOUNCE);
            marker.setIcon(markerRed);

        });

        google.maps.event.addListener(marker, "mouseover", function () {
            var marker_id = marker.id;
            var index_id = marker_id.replace("marker", "");

            //CENTRAR SCROLL
            var casasContainer = $("#casas");
            var casaScroll = $("#img-thumbnail_" + index_id);
            casasContainer.animate({
                scrollTop: casaScroll.offset().top - casasContainer.offset().top + casasContainer.scrollTop()
            }, 'fast', 'linear');
            //FIN CENTRAR SCROLL
              marker.setIcon(markerGreen);
            $("#img-thumbnail_" + index_id).css({
                "posistion": "relative",
                "z-index": "1032",
                "border-color": "#CFDB00"
            });
        });

        google.maps.event.addListener(marker, "mouseout", function () {
            var marker_id = marker.id;
            var index_id = marker_id.replace("marker", "");
             marker.setIcon(markerRed);
            $("#img-thumbnail_" + index_id).css({
                "box-shadow": "",
                "border-width": "",
                "font-size": "",
                "display": "block",
                "background": "#FFF",
                "filter": "brightness(100%)",
                "border": "4px solid #46BEEF"
            });
        });
        google.maps.event.addListener(marker, "mouseout", function () {
            var marker_id = marker.id;
            var index_id = marker_id.replace("marker", "");
             marker.setIcon(markerBlue);
            $("#letrasImagen" + index_id).css({

                "opacity": "0",
                "position": "absolute",
                "top": "30%",
                "left": "50%",
                "transform": "translate(-50%, -50%)",

            });

            $("#image_main_thumbnail_" + index_id).css({
                "filter": ""
            });
        });

        google.maps.event.addListener(marker, "mouseover", function () {
            var marker_id = marker.id;
            var index_id = marker_id.replace("marker", "");

            $("#letrasImagen" + index_id).css({

                "opacity": "1",
                "color": "#fff",
                "posistion": "relative",
                "z-index": "1033"
            });

            $("#image_main_thumbnail_" + index_id).css({
                "filter": "brightness(0.30)"
            });

        });

        index += 1;
    });
}

function getMarker(id) {
    click = true;
    for (var i = 0; i < allMarkers.length; i++) {
        if ("marker" + id == allMarkers[i].id) {
            allMarkers[i].setIcon(markerRed);

            $("#markerLayer" + i).css("animation", "pulse .5s infinite alternate");

            map.panTo(allMarkers[i].getPosition());
            map.setZoom(17);
            break;
        }
    }
}

function hover(id) {
    $("#img-thumbnail_" + id).css({
        "posistion": "relative",
        "z-index": "1032",
        "border-color": "#CFDB00",
    });

    $("#image_main_thumbnail_" + id).css({
        "filter": "brightness(0.30)",
    });
    $("#letrasImagen" + id).css({

        "opacity": "1",
        "color": "#fff",
        "posistion": "relative",
        "z-index": "1033"
    });

    click = false;
    for (var i = 0; i < allMarkers.length; i++) {
        if ("marker" + id == allMarkers[i].id) {
            allMarkers[i].setIcon(markerRed);
            allMarkers[i].setAnimation(google.maps.Animation.BOUNCE);
            $("#markerLayer" + i).css("animation", "pulse .5s infinite alternate");
            infoWindows[i].open(map, allMarkers[i]);

            if (map.getZoom() > 16) {
                map.panTo(allMarkers[i].getPosition());
                map.setZoom(17);
            }
            break;
        }
    }
}

function out(id) {
    $("#img-thumbnail_" + id).css({
        "box-shadow": "",
        "border-width": "",
        "font-size": "",
        "display": "block",
        "background": "#FFF",
        "filter": "brightness(100%)",
        "border": "4px solid #46BEEF"
    });

    $("#image_main_thumbnail_" + id).css({
        "filter": ""
    });

    $("#letrasImagen" + id).css({
        "opacity": "0",
        "position": "absolute",
        "top": "30%",
        "left": "50%",
        "transform": "translate(-50%, -50%)",
    });


    if (click === false) {
        for (var i = 0; i < allMarkers.length; i++) {
            if ("marker" + id == allMarkers[i].id) {
                allMarkers[i].setIcon(markerBlue);
                allMarkers[i].setAnimation(null);
                infoWindows[i].close();
                $("#markerLayer" + i).css("animation", "none");
                break;
            }
        }
    }
}

/*
 * Muestra las propiedades por filtro de coordenadas
 */
function showPropiedades(latitude, longitude) {
    $.ajax({
        url: url + "/propiedades/coordenadas",
        type: "POST",
        data: {
            latitud: latitude,
            longitud: longitude
        },
        dataType: "JSON",
        beforeSend: function () {
            $("#wait").show();
        },
        success: function (response) {
            if (response.propiedades.length > 0) {
                $("#title-header").html("<p class='aviso animated fadeInRight'><center> " + response.propiedades.length + " propiedades</center></p>");
            } else {
                $("#title-header").html("<p class='aviso animated fadeInRight'><center>Por el momento no encontramos propiedades en esta ubicación</center></p>");
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
function setDefaulBehaviorMarkers() {
    for (var cont = 0; cont < allMarkers.length; cont++) {
        allMarkers[cont].setAnimation(null);
        allMarkers[cont].setIcon(markerBlue);
    }
}

function changePlazaToColonia(plazas) {
    if (plazas) {
        var others = Array.from(document.querySelectorAll('*[id^="display_plaza_"]'));

        var index = 1;
        others.forEach(function (item) {
            $(item).hide();
            $("#display_colonia_" + index).css('display', 'block');
            index = index+1;
        });
    } else {
        var others = Array.from(document.querySelectorAll('*[id^="display_colonia_"]'));

        var index = 1;
        others.forEach(function (item) {
            $(item).hide();
            $("#display_plaza_" + index).css('display', 'block');
            index = index+1;
        });
    }
}

function showPropiedadesBySearch(ubicacion) {
    hideCurrentDescription();
    setDefaulBehaviorMarkers();
    changePlazaToColonia(true);
    var total = 0;
    hideCajas("search");

    for (var i = allMarkers.length, bounds = map.getBounds(); i--;) {
        if (bounds.contains(allMarkers[i].getPosition())) {
            total += 1;
            $("#caja_" + allMarkers[i].index).show();
        }
    }

    if (total > 0) {
        $("#title-header").html("<h3>" + total + " propiedades en " + $("#pac-input").val() + "</h3>");
    } else {
        $("#title-header").html("<h3>Por el momento no encontramos propiedades en esta ubicaciÃ²n</h3>");
    }
}

function hideCurrentDescription() {
    var descriptions = Array.from(document.querySelectorAll('*[id^="house_description_"]'));
    descriptions.forEach(function (item) {
        if ($(item).is(":visible")) {
            $(item).hide();
        }
    });
    $("#house_cards").show();
}

/*
 * Muestra las propiedades por filtro de ciudad/estado
 */
function showPropiedadesByEstado(estado) {
    $.ajax({
        url: url + "/propiedades/search",
        type: "POST",
        data: {
            estado: estado
        },
        dataType: "JSON",
        beforeSend: function () {
            $("#wait").show();
        },
        success: function (response) {
            if (response.propiedades.length > 0) {
                var esta = $("#country option[value='" + estado + "']").text();

                $("#title-header").html("<p class='aviso animated fadeInRight'><center> " + response.propiedades.length + " propiedades en el estado de " + esta + "</center></p>");
                  $("#title-header").css({

                      "padding-bottom": ".5%",

                  });
            } else {
                var esta = $("#country option[value='" + estado + "']").text();
                $("#title-header").html("<p class='aviso animated fadeInRight'><center>Por el momento no encontramos propiedades en el estado de " + esta + "</center></p");
                $("#title-header").css({

                    "padding-bottom": ".5%",

                });
            }
            showOnlySomeCards(response.propiedades, "search");
        },
        error: function (respuesta) {
            console.log(respuesta);
        },
        complete: function () {
            $("#wait").hide();
        }
    });
}

function showPropiedadesByPrecio(min, max) {
    var ids = [];
    var t = 0;
    for (var i = allMarkers.length, bounds = map.getBounds(); i--;) {
        if (bounds.contains(allMarkers[i].getPosition())) {
            console.log(allMarkers[i].propiedad);
            ids.push(allMarkers[i].propiedad);
            t = t + 1;
        }
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
                        $("#title-header").html("<p class='aviso animated fadeInRight'><center> " + response.propiedades.length + " propiedades con un precio entre de $" + min + " y $" + max + "</center></p>");
                        $("#title-header").css({

                            "padding-bottom": ".5%",

                        });
                    }

                    if (min && !max) {
                        $("#title-header").html("<p class='aviso animated fadeInRight'><center> " + response.propiedades.length + " propiedades con un precio mayor a $" + min + "</center></p>");
                        $("#title-header").css({

                            "padding-bottom": ".5%",

                        });
                    }

                    if (max && !min) {
                        $("#title-header").html("<p class='aviso animated fadeInRight'> <center>" + response.propiedades.length + " propiedades con un costo menor a $" + max + "</center></p>");
                        $("#title-header").css({

                            "padding-bottom": ".5%",

                        });
                    }
                    hideCurrentDescription();
                    setDefaulBehaviorMarkers();
                } else {

                    if (min && max) {
                        $("#title-header").html("<p class='aviso animated fadeInRight'><center>Por el momento no encontramos propiedades en el rango de $" + min + " y $" + max + "</center></p>");
                        $("#title-header").css({

                            "padding-bottom": ".5%",

                        });

                    }

                    if (min && !max) {
                        $("#title-header").html("<p class='aviso animated fadeInRight'><center>Por el momento no encontramos propiedades con un precio mayor $" + min + "</center></p>");
                        $("#title-header").css({

                            "padding-bottom": ".5%",

                        });
                    }

                    if (max && !min) {
                        $("#title-header").html("<p class='aviso animated fadeInRight'><center>Por el momento no encontramos propiedades con un precio menor $" + max + "</center></p>");
                        $("#title-header").css({

                            "padding-bottom": ".5%",

                        });
                    }
                }
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

        if (!$(item).hasClass("search") || !$(item).hasClass("precio")) {
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

            if (box.hasClass("search") || box.hasClass("precio")) {
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

var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

function iLikeIt(id) {
    var heart = $("#heart_" + id);
    // TODO remover de favoritos
    if (heart.hasClass("iloveit")) {
        heart.removeClass("iloveit");
        heart.addClass("iDontLoveIt");
        heart.css("color", "rgba(255, 255, 255, 0.62)");
    } else { // TODO agregar a favoritos
        heart.removeClass("iDontLoveIt");
        heart.addClass("iloveit");
        heart.css("color", "rgba(255, 0, 0, 0.62)");
    }
}

function sendMail(propiedad_id) {
    event.preventDefault();
    if (!$("#form_nombre_" + propiedad_id).val() || !$("#form_telefono_" + propiedad_id).val() || !$("#form_email_" + propiedad_id).val()) {
        notificaction("Completa todos los campos requeridos", "warning");
    } else {
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
                notificaction(respuesta.mensaje, "success");
            },
            error: function (respuesta) {
                notificaction(respuesta.mensaje, "danger");
            },
            complete: function () {
                $("#wait").hide();
            }
        });
    }
}

function notificaction(msg, type) {
    var div = $("#msg");
    div.html("");
    div.html('<div class="alert alert-' + type + '"> &nbsp; ' + msg + '</div>');

    setTimeout(function () {
        div.html("");
    }, 5000);

    $('html, body').animate({
        scrollTop: $("#top").offset().top
    }, 800);
}

function modal_variables(calle, colonia, municipio, estado, terreno, constru, habitaciones, banos, patios, estacionamientos, precio, imagen, folio) {
    $("#pdf-modal").html("");
    // si el valor de folio es null -> el campo debe de estar vacÃ¬o s
    if (folio == 'null') {
        folio = '';
    }


    $("#pdf-modal").append('<div class="modal-dialog">' +

        '<div class="modal-content">' +

        '<div class="modal-body">' +
        '<div id="pdf" class="div">' +
        '<div class="row">' +
        '<div class="col-xs-7" style="padding: 0px 0px;">' +
        '<div class="row azulRevimex" align="center">' +
        '<img  class="revimexImagen" src="images/revimex-logo.png">' +
        '</div>' +

        '<div class="row arenaRevimex" align="center">' +
        '<div class="separador"></div>' +
        '<span class="titulo" style="margin-top: 80px;">Detalles</span>' +
        '<div class="separador"></div>' +
        '</div>' +
        '</div>' +

        '<div class="col-xs-5" style="padding: 0px 0px;">' +
        '<div class="row arenaRevimex" align="center">' +
        '<h4>Contacto: 01 800 200 04440</h4>' +
        '</div>' +

        '<div class="row arenaClara" align="center">' +
        '<div class="separador"></div>' +
        '<span class="titulo">' + folio + '</span>' +
        '<div class="separador"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="separador"></div>' +

        '<div class="row">' +
        '<div class="col-xs-7">' +
        '<img class="imagen-modal" src="http://revimex.mx/' + imagen + '">' +
        '</div>' +

        '<div class="col-xs-5" style="padding: 0px 0px;">' +
        '<div class="row arenaClara">' +
        '<br>' +
        '<p class="direccion" align="center">' +
        'Calle: ' + calle +
        ' Colonia: ' + colonia +
        ' Municipio: ' + municipio +
        ' Estado: ' + estado +
        '</p>' +
        '</div>' +

        '<div class="row highlight">' +
        '<div class="separador"></div>' +
        '<div class="col-xs-2">' +
        '<img class="casitaImagen" src="images/icono-casa-modal.png">' +
        '<div class="separador"></div>' +
        '</div>' +
        '<div class="col-xs-9 style="padding: 0px 0px;"" align="center">' +
        '<div class="separador"></div>' +
        '<p class="descripcion">DescripciÃ³n de propiedad</p>' +
        '</div>' +
        '</div>' +

        '<div class="separador"></div>' +
        '<div class="row">' +
        '<div class="col-xs-2 style="padding: 0px 0px;""></div>' +
        '<div class="col-xs-8 style="padding: 0px 0px;"">' +
        '<div class="row">' +
        '<div class="col-xs-2" style="padding: 0px 0px;">' +
        '<img class="sm-icon" src="images/iconoModal/terreno.png">' +
        '</div>' +
        '<div class="col-xs-10 verdeRevimex" style="padding: 0px 0px;">' +
        '<p class="des-propiedad">' + terreno + ' m<sup>2</sup></p>' +
        '</div>' +
        '</div>' +

        '<div class="separador"></div>' +
        '<div class="row">' +
        '<div class="col-xs-2" style="padding: 0px 0px;">' +
        '<img class="sm-icon" src="images/iconoModal/construccion.png">' +
        '</div>' +
        '<div class="col-xs-10 verdeRevimex" style="padding: 0px 0px;">' +
        '<p class="des-propiedad">' + constru + ' m<sup>2</sup></p>' +
        '</div>' +
        '</div>' +

        '<div class="separador"></div>' +
        '<div class="row">' +
        '<div class="col-xs-2" style="padding: 0px 0px;">' +
        '<img class="sm-icon" src="images/iconoModal/habitaciones.png">' +
        '</div>' +
        '<div class="col-xs-10 verdeRevimex" style="padding: 0px 0px;">' +
        '<p class="des-propiedad">' + habitaciones + '</p>' +
        '</div>' +
        '</div>' +

        '<div class="separador"></div>' +
        '<div class="row">' +
        '<div class="col-xs-2" style="padding: 0px 0px;">' +
        '<img class="sm-icon" src="images/iconoModal/banios.png">' +
        '</div>' +
        '<div class="col-xs-10 verdeRevimex" style="padding: 0px 0px;">' +
        '<p class="des-propiedad">' + banos + '</p>' +
        '</div>' +
        '</div>' +

        '<div class="separador"></div>' +
        '<div class="row">' +
        '<div class="col-xs-2" style="padding: 0px 0px;">' +
        '<img class="sm-icon" src="images/iconoModal/patio.png">' +
        '</div>' +
        '<div class="col-xs-10 verdeRevimex" style="padding: 0px 0px;">' +
        '<p class="des-propiedad">' + patios + '</p>' +
        '</div>' +
        '</div>' +

        '<div class="separador"></div>' +
        '<div class="row">' +
        '<div class="col-xs-2" style="padding: 0px 0px;">' +
        '<img class="sm-icon" src="images/iconoModal/estacionamiento.png">' +
        '</div>' +
        '<div class="col-xs-10 verdeRevimex" style="padding: 0px 0px;">' +
        '<p class="des-propiedad">' + estacionamientos + '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="col-xs-2" style="padding: 0px 0px;"></div>' +
        '</div>' +

        '<div class="separador"></div>' +
        '<div class="row arenaClara">' +
        '<br>' +
        '<p class="precio" align="center">' +
        '$ ' + precio +
        '</p>' +
        '<div class="separador"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');

}

function envio_pdf() {

    $('#pdf-modal').printThis({

        importCSS: true,
        loadCSS: "/Users/maquina27/Desktop/revimexmap/css/desplegar.css",

    });

}
