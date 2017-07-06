

var radius = 5000;
var jumping = null;
/* CARGA EL MAPA */
function initMap() {
    var mx = {lat: 24.2436666, lng: -102.4551421};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: mx,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        //zoomControl: false,
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
            map.fitBounds(place.geometry.viewport);
            zoomLevels(ubicacion);

        } else {
            map.setCenter(place.geometry.location);
            zoomLevels(ubicacion);
        }

        showPropiedadesBySearch(ubicacion);
    });

    places = new google.maps.places.PlacesService(map);

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


    service = new google.maps.places.PlacesService(map);
}

function zoomLevels(ubicacion) {
    var zoom_default = true;
    //Gómez palacios, Torreón, Aguascalientes, Ciudad de México, Estado de México (Tecamac,Chapa de Mota),Huimilpan	 Queretaro, Veracruz Jáltipan
    if (ubicacion.place_id == "ChIJ-7NFu6nbj4YRHaCucJl6zIs" || ubicacion.place_id == "ChIJr9SXsc7Zj4YRzbjXdRQ7oUI" || ubicacion.place_id == "ChIJNdBqxVEAKoQRqXI-fdOzRWc"
        || ubicacion.place_id == "ChIJUT-QGF0cKoQRC0ThotRJwL4" || ubicacion.place_id == "ChIJ81fdg_t1goYRhwQtPLxkqKY" || ubicacion.place_id == "ChIJB3UJ2yYAzoURQeheJnYQBlQ"
        || ubicacion.place_id == "ChIJJyk1sTYAzoURW4rR6E6e_d4" || ubicacion.place_id == "ChIJE0xwqWGuKIQRrALQftSl2K8" || ubicacion.place_id == "ChIJhbc-7drs0YURlEUtP8V7oU8"
        || ubicacion.place_id == "ChIJW2g7hQDDYoYRxse9Oun-WKY" || ubicacion.place_id == "ChIJ_8vl92FH0oURD15IqMtrVOA" || ubicacion.place_id == "ChIJ8c3K9m9A04URxv09vLG_wYc"
        || ubicacion.place_id == "ChIJk-aVLdgf6oURjX7H2Dji-Xc") {
        map.setZoom(12);

        zoom_default = false;
    }

    //Baja California Norte y Sur, QuintanaRoo,sonora,tamaulipas
    if (ubicacion.place_id == "ChIJ0913qAxw14ARjt4YA5_9pPw" || ubicacion.place_id == "ChIJyR6itTnTr4YRGFmnqTqz33E" || ubicacion.place_id == "ChIJlSbD6vD8T48RnI1MSCrF8MQ" || ubicacion.place_id == "ChIJWSQe265TeYYRJRnoNVqfhTM" || ubicacion.place_id == "ChIJD9JN52kpmIYRdOO7_Br_Vs0" || ubicacion.place_id == "ChIJKR6Opr1yiIYROXrNFNeaAGQ") {
        map.setZoom(7);

        zoom_default = false;
    }
    //Comondu BCS, Mulege BCS, Michoacan , queretaro ,
    if (ubicacion.place_id == "ChIJj809JiiHs4YRQbvAdUpuXxY" || ubicacion.place_id == "ChIJBXXEtigGNYEREX41__43rKE" || ubicacion.place_id == "ChIJt1yzHj5fKoQR1OBL8wxlxzs" || ubicacion.place_id == "ChIJVZJb3I9b04URL4MbVqqUsJc" || ubicacion.place_id == "ChIJbRNrF5Yz-IURRGLylUyOPek") {
        map.setZoom(9);

        zoom_default = false;
    }
    //veracruz ,sinaloa"",chiapas
    if (ubicacion.place_id == "ChIJxXjKRUJBw4URmwE26ULWpBg" || ubicacion.place_id == "ChIJWUmnKJRTn4YR71--DXbfe5w" || ubicacion.place_id == "ChIJZ85Xl7REjYURFdYZRoIzAM8" || ubicacion.place_id == "ChIJc9-8GKW3m4YR1EpsOqaO3b8") {
        zoom_default = false;

        map.setZoom(8);
    }

    //Los Cabos , Nuevo leon, yucatan, Hidalgo, SLP Salinas,Sonora (Villa Pesqueira, Rosario, General Plutarco Elías Calles, México), Sonora Bácum,
    if (ubicacion.place_id == "ChIJS5Kav3Bor4YRLVXbc_dWi_c" || ubicacion.place_id == "ChIJXbClooSVYoYRxrtsw0L0HXA" || ubicacion.place_id == "ChIJ7QTWqvgPVI8RCj0IMXUhzMw" || ubicacion.place_id == "ChIJ5y_OIgQK0YURG3hAeb_FUoE" || ubicacion.place_id == "ChIJT9hqL5uVgYYR9WTjtjI2pgE"
        || ubicacion.place_id == "ChIJuTjrjtASz4YRQERzAiM2mk4" || ubicacion.place_id == "ChIJ0yHMgWozxoYR0pCD0Hb6LUM" || ubicacion.place_id == "ChIJ0UmBXRjFKoERnJgFanz2tYc" || ubicacion.place_id == "ChIJxeIgXHJPyIYROn_m0017jiY") {
        zoom_default = false;

        map.setZoom(10);
    }


    //Matamoros Coahuila,Estado de México(Atizapán,San Martín de las Pirámides, Tezoyuca, Teotihuacán, Cuautitlán, La Paz, Coacalco de Berriozabal, Valle de Chalco Solidaridad, Nicolás Romero, Tlalnepantla de Baz, Atenco, Chimalhuacán), SLP (San Nicolás Tolentino, Armadillo de los Infante),
    if (ubicacion.place_id == "ChIJg8a6tSrBj4YRh7lkZj_TyB0" || ubicacion.place_id == "ChIJX_RmQYnYj4YRaO-E7cVHm-I" || ubicacion.place_id == "6bK4QRH1Ybg9VQKQs"
        || ubicacion.place_id == "ChIJ94hqw-6bK4QRH1Ybg9VQKQs" || ubicacion.place_id == "ChIJ__vTAocc0oUR4MjngvxrWsU" || ubicacion.place_id == "ChIJfbgR0SnA0YURqQWY-TBkb84" || ubicacion.place_id == "ChIJF5S1SyPp0YURTS8DzT9iSOg"
        || ubicacion.place_id == "ChIJPZLKHuPq0YURATNi5_pvM0k" || ubicacion.place_id == "ChIJcRh0VXX10YUR6W9HLTCTeWI" || ubicacion.place_id == "ChIJrS6bGbHg0YURxsO9CVT1-2U" || ubicacion.place_id == "ChIJPTF2Pcbz0YURha_3SsBjLRM" || ubicacion.place_id == "ChIJ7z-C0zUczoURDvbvTV8zbJE"
        || ubicacion.place_id == "ChIJBYowjGMZ0oUR2NFMw95vx8E" || ubicacion.place_id == "ChIJYxCNbHb40YUR9s1Fdr8kGJk" || ubicacion.place_id == "ChIJtdHh1Dfv0YURxQPuxebxw40" || ubicacion.place_id == "ChIJmdc6XHDj0YUR94fvy-Tt4Ok" || ubicacion.place_id == "ChIJQcVvE5mqKoQRwtU4I8A-PsY"
        || ubicacion.place_id == "ChIJS_kh7Bp10oUR7R7x9VUnDiE" || ubicacion.place_id == "ChIJd4pEP6ihKoQR4VMDvJIKkZA") {
        zoom_default = false;

        map.setZoom(14);
    }
    //tlaquepaque, Tlajomulco de Zúñiga (jalisco),Estado de Mexico (Chicoloapan, Cuautitlán Izcalli, Naucalpan de Juárez, Nezahualcóyotl, Ecatepec de Morelos), Morelia (Michoacan),SLP (Zaragoza, Soledad de Graciano Sánchez), Sonora Guaymas,
    if (ubicacion.place_id == "ChIJA0pBpoezKIQREKq-cByLC14" || ubicacion.place_id == "ChIJk0R9BvdTL4QRL95OIvTG3_k" || ubicacion.place_id == "ChIJReN4bmzh0YURFUI1P18AqsM"
        || ubicacion.place_id == "ChIJZ0Krr9Qd0oURiE3bnk3X6Aw" || ubicacion.place_id == "ChIJ7y7PWEkB0oURn-ssxjwYNsA" || ubicacion.place_id == "ChIJSXRXRqn80YURSM_kDwcjHXk" || ubicacion.place_id == "ChIJoXf3chzy0YURgGayQgpU1Ew" || ubicacion.place_id == "ChIJ46edsqILLYQRIIacZ3hpAQQ"
        || ubicacion.place_id == "ChIJE1GbkUq0KoQR1HGQzqitdPk" || ubicacion.place_id == "ChIJ7x3QuPQVyYYRhPkF6AJU2ZY") {
        zoom_default = false;

        map.setZoom(13);
    }
    //cabo corrientes(jalisco), Monterrey, tlaxcala, nayarit,Hidalgo (Michoacan), Sonora (Quiriego), Tamaulipas (Guerrero, Río Bravo), Veracruz(Veracruz),
    if (ubicacion.place_id == "ChIJ32f63CPeI4QRXw0LQ0pIuxA" || ubicacion.place_id == "ChIJ74hS7tlp0oURTL_vhuAJEhM" || ubicacion.place_id == "ChIJR9s-5pyoIIQROdKUhqL1yMI" || ubicacion.place_id == "ChIJ9fg3tDGVYoYRlJjIasrT06M" || ubicacion.place_id == "ChIJE2EAHD_Zz4UR4L181Friujg"
        || ubicacion.place_id == "ChIJZ3eaCsvL0oUR71cnLMg63nM" || ubicacion.place_id == "ChIJj5BTOebox4YR1XMAujfOkA8" || ubicacion.place_id == "ChIJEX-8asZeYYYRgCaiC-QpIXw" || ubicacion.place_id == "ChIJT8OQoodDZYYRGyKC5nStVu0" || ubicacion.place_id == "ChIJxXjKRUJBw4URmwE26ULWpBg") {
        zoom_default = false;

        map.setZoom(11);
    }
    //Tonanitla, (Estado México)
    if (ubicacion.place_id == "ChIJ9ahdi_3y0YURnRVIwHqIKkU") {
        zoom_default = false;

        map.setZoom(15);
    }

    if (zoom_default === true) {
        map.setZoom(10);
    }
}

function showPropiedadesBySearch(ubicacion) {
    restoreMarkers();
    hideCurrentDescription();
    setDefaulBehaviorMarkers();
    changePlazaToColonia(true);
    var total = 0;
    hideCajas("search");

    var priceRange = slider.noUiSlider.get();

    // Cierra las similares y muestra las normales
    $("#titulocercanas").hide();
    $('#casas').appendTo('#house_cards');
    $('#casas_cercanas').hide();

    for (var i = allMarkers.length, bounds = map.getBounds(); i--;) {
        if (bounds.contains(allMarkers[i].getPosition())) {

            var costo = allMarkers[i].precio;
            costo = costo.replace(',', '');
            costo = costo.replace('.', '');
            costo = parseInt(costo);

            var precio_min = priceRange[0];
            precio_min = precio_min.replace(',', '');
            precio_min = precio_min.replace('.', '');
            precio_min = parseInt(precio_min) / 100;

            var precio_max = priceRange[1];
            precio_max = precio_max.replace(',', '');
            precio_max = precio_max.replace('.', '');
            precio_max = parseInt(precio_max) / 100;

            if ((costo >= precio_min) && (costo <= precio_max)) {
                total += 1;
                $("#caja_" + allMarkers[i].index).show();
            }
        }
    }

    if (total > 0) {

        $("#title-header").html("<h3><center>" + total + " propiedades en " + $("#pac-input").val() + "</center></h3>");
        $("#title-header").css({
            "padding-top": ".5%",
            "padding-bottom": ".5%"
        });
    } else {
        $("#title-header").html("<h3><center>No hay propiedades en esta ubicación</center></h3>");
        $("#title-header").css({
            "padding-top": ".5%",
            "padding-bottom": ".5%"
        });
    }

    setTimeout(function(){
        // despeus de 3 segunda se desapareces este resumen
        $("#title-header").html("");
        $("#title-header").css({"padding": "0"});
    },6000);
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
            index = index + 1;
        });
    } else {
        var others = Array.from(document.querySelectorAll('*[id^="display_colonia_"]'));

        var index = 1;
        others.forEach(function (item) {
            $(item).hide();
            $("#display_plaza_" + index).css('display', 'block');
            index = index + 1;
        });
    }
}

function reCentrar() {
    var others = Array.from(document.querySelectorAll('*[id^="caja_"]'));
    others.forEach(function (item) {
        $(item).css("display", "block");
    });
    changePlazaToColonia(false);

    map.setCenter(new google.maps.LatLng(24.2436666, -102.4551421));
    map.setZoom(5);
}

function stateCenter(index) {
    var latlng = {lat: allMarkers[index].getPosition().lat(), lng: allMarkers[index].getPosition().lng()};
    var geo = new google.maps.Geocoder();
    var state = "";

    geo.geocode({'location': latlng}, function (results, status) {
        if (status === 'OK') {
            if (results[1]) {
                var data = results[0].address_components;
                for (var i in data) {
                    if (data[i].types.includes("administrative_area_level_1")) {
                        state = data[i].long_name;
                        break;
                    }
                }
                geo.geocode({'address': state}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        //map.setCenter(results[0].geometry.location);
                        map.setCenter(latlng);
                        map.setZoom(7);
                    } else {
                        alert("Could not find location: " + location);
                    }
                });
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}
