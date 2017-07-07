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

var radius = 5000;
var jumping = null;

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
            map.fitBounds(place.geometry.viewport);
            //Gómez palacios, Torreón, Aguascalientes, Ciudad de México, Estado de México (Tecamac,Chapa de Mota),Huimilpan	 Queretaro, Veracruz Jáltipan
            if (ubicacion.place_id == "ChIJ-7NFu6nbj4YRHaCucJl6zIs" || ubicacion.place_id == "ChIJr9SXsc7Zj4YRzbjXdRQ7oUI" || ubicacion.place_id == "ChIJNdBqxVEAKoQRqXI-fdOzRWc"
                || ubicacion.place_id == "ChIJUT-QGF0cKoQRC0ThotRJwL4" || ubicacion.place_id == "ChIJ81fdg_t1goYRhwQtPLxkqKY" || ubicacion.place_id == "ChIJB3UJ2yYAzoURQeheJnYQBlQ"
                || ubicacion.place_id == "ChIJJyk1sTYAzoURW4rR6E6e_d4" || ubicacion.place_id == "ChIJE0xwqWGuKIQRrALQftSl2K8" || ubicacion.place_id == "ChIJhbc-7drs0YURlEUtP8V7oU8"
                || ubicacion.place_id == "ChIJW2g7hQDDYoYRxse9Oun-WKY" || ubicacion.place_id == "ChIJ_8vl92FH0oURD15IqMtrVOA" || ubicacion.place_id == "ChIJ8c3K9m9A04URxv09vLG_wYc"
                || ubicacion.place_id == "ChIJk-aVLdgf6oURjX7H2Dji-Xc") {
                map.setZoom(12);
            }

            //Baja California Norte y Sur, QuintanaRoo,sonora,tamaulipas
            if (ubicacion.place_id == "ChIJ0913qAxw14ARjt4YA5_9pPw" || ubicacion.place_id == "ChIJyR6itTnTr4YRGFmnqTqz33E" || ubicacion.place_id == "ChIJlSbD6vD8T48RnI1MSCrF8MQ" || ubicacion.place_id == "ChIJWSQe265TeYYRJRnoNVqfhTM" || ubicacion.place_id == "ChIJD9JN52kpmIYRdOO7_Br_Vs0" || ubicacion.place_id == "ChIJKR6Opr1yiIYROXrNFNeaAGQ") {

                map.setZoom(7);

            }
            //Comondu BCS, Mulege BCS, Michoacan , queretaro ,
            if (ubicacion.place_id == "ChIJj809JiiHs4YRQbvAdUpuXxY" || ubicacion.place_id == "ChIJBXXEtigGNYEREX41__43rKE" || ubicacion.place_id == "ChIJt1yzHj5fKoQR1OBL8wxlxzs" || ubicacion.place_id == "ChIJVZJb3I9b04URL4MbVqqUsJc" || ubicacion.place_id == "ChIJbRNrF5Yz-IURRGLylUyOPek") {

                map.setZoom(9);

            }
            //veracruz ,sinaloa"",chiapas
            if (ubicacion.place_id == "ChIJxXjKRUJBw4URmwE26ULWpBg" || ubicacion.place_id == "ChIJWUmnKJRTn4YR71--DXbfe5w" || ubicacion.place_id == "ChIJZ85Xl7REjYURFdYZRoIzAM8" || ubicacion.place_id == "ChIJc9-8GKW3m4YR1EpsOqaO3b8") {

                map.setZoom(8);

            }

            //Los Cabos , Nuevo leon, yucatan, Hidalgo, SLP Salinas,Sonora (Villa Pesqueira, Rosario, General Plutarco Elías Calles, México), Sonora Bácum,
            if (ubicacion.place_id == "ChIJS5Kav3Bor4YRLVXbc_dWi_c" || ubicacion.place_id == "ChIJXbClooSVYoYRxrtsw0L0HXA" || ubicacion.place_id == "ChIJ7QTWqvgPVI8RCj0IMXUhzMw" || ubicacion.place_id == "ChIJ5y_OIgQK0YURG3hAeb_FUoE" || ubicacion.place_id == "ChIJT9hqL5uVgYYR9WTjtjI2pgE"
                || ubicacion.place_id == "ChIJuTjrjtASz4YRQERzAiM2mk4" || ubicacion.place_id == "ChIJ0yHMgWozxoYR0pCD0Hb6LUM" || ubicacion.place_id == "ChIJ0UmBXRjFKoERnJgFanz2tYc" || ubicacion.place_id == "ChIJxeIgXHJPyIYROn_m0017jiY") {

                map.setZoom(10);

            }


            //Matamoros Coahuila,Estado de México(Atizapán,San Martín de las Pirámides, Tezoyuca, Teotihuacán, Cuautitlán, La Paz, Coacalco de Berriozabal, Valle de Chalco Solidaridad, Nicolás Romero, Tlalnepantla de Baz, Atenco, Chimalhuacán), SLP (San Nicolás Tolentino, Armadillo de los Infante),
            if (ubicacion.place_id == "ChIJg8a6tSrBj4YRh7lkZj_TyB0" || ubicacion.place_id == "ChIJX_RmQYnYj4YRaO-E7cVHm-I" || ubicacion.place_id == "6bK4QRH1Ybg9VQKQs"
                || ubicacion.place_id == "ChIJ94hqw-6bK4QRH1Ybg9VQKQs" || ubicacion.place_id == "ChIJ__vTAocc0oUR4MjngvxrWsU" || ubicacion.place_id == "ChIJfbgR0SnA0YURqQWY-TBkb84" || ubicacion.place_id == "ChIJF5S1SyPp0YURTS8DzT9iSOg"
                || ubicacion.place_id == "ChIJPZLKHuPq0YURATNi5_pvM0k" || ubicacion.place_id == "ChIJcRh0VXX10YUR6W9HLTCTeWI" || ubicacion.place_id == "ChIJrS6bGbHg0YURxsO9CVT1-2U" || ubicacion.place_id == "ChIJPTF2Pcbz0YURha_3SsBjLRM" || ubicacion.place_id == "ChIJ7z-C0zUczoURDvbvTV8zbJE"
                || ubicacion.place_id == "ChIJBYowjGMZ0oUR2NFMw95vx8E" || ubicacion.place_id == "ChIJYxCNbHb40YUR9s1Fdr8kGJk" || ubicacion.place_id == "ChIJtdHh1Dfv0YURxQPuxebxw40" || ubicacion.place_id == "ChIJmdc6XHDj0YUR94fvy-Tt4Ok" || ubicacion.place_id == "ChIJQcVvE5mqKoQRwtU4I8A-PsY"
                || ubicacion.place_id == "ChIJS_kh7Bp10oUR7R7x9VUnDiE" || ubicacion.place_id == "ChIJd4pEP6ihKoQR4VMDvJIKkZA") {

                map.setZoom(14);

            }
            //tlaquepaque, Tlajomulco de Zúñiga (jalisco),Estado de Mexico (Chicoloapan, Cuautitlán Izcalli, Naucalpan de Juárez, Nezahualcóyotl, Ecatepec de Morelos), Morelia (Michoacan),SLP (Zaragoza, Soledad de Graciano Sánchez), Sonora Guaymas,
            if (ubicacion.place_id == "ChIJA0pBpoezKIQREKq-cByLC14" || ubicacion.place_id == "ChIJk0R9BvdTL4QRL95OIvTG3_k" || ubicacion.place_id == "ChIJReN4bmzh0YURFUI1P18AqsM"
                || ubicacion.place_id == "ChIJZ0Krr9Qd0oURiE3bnk3X6Aw" || ubicacion.place_id == "ChIJ7y7PWEkB0oURn-ssxjwYNsA" || ubicacion.place_id == "ChIJSXRXRqn80YURSM_kDwcjHXk" || ubicacion.place_id == "ChIJoXf3chzy0YURgGayQgpU1Ew" || ubicacion.place_id == "ChIJ46edsqILLYQRIIacZ3hpAQQ"
                || ubicacion.place_id == "ChIJE1GbkUq0KoQR1HGQzqitdPk" || ubicacion.place_id == "ChIJ7x3QuPQVyYYRhPkF6AJU2ZY") {
                map.setZoom(13);
            }
            //cabo corrientes(jalisco), Monterrey, tlaxcala, nayarit,Hidalgo (Michoacan), Sonora (Quiriego), Tamaulipas (Guerrero, Río Bravo), Veracruz(Veracruz),
            if (ubicacion.place_id == "ChIJ32f63CPeI4QRXw0LQ0pIuxA" || ubicacion.place_id == "ChIJ74hS7tlp0oURTL_vhuAJEhM" || ubicacion.place_id == "ChIJR9s-5pyoIIQROdKUhqL1yMI" || ubicacion.place_id == "ChIJ9fg3tDGVYoYRlJjIasrT06M" || ubicacion.place_id == "ChIJE2EAHD_Zz4UR4L181Friujg"
                || ubicacion.place_id == "ChIJZ3eaCsvL0oUR71cnLMg63nM" || ubicacion.place_id == "ChIJj5BTOebox4YR1XMAujfOkA8" || ubicacion.place_id == "ChIJEX-8asZeYYYRgCaiC-QpIXw" || ubicacion.place_id == "ChIJT8OQoodDZYYRGyKC5nStVu0" || ubicacion.place_id == "ChIJxXjKRUJBw4URmwE26ULWpBg") {
                map.setZoom(11);
            }
            //Tonanitla, (Estado México)
            if (ubicacion.place_id == "ChIJ9ahdi_3y0YURnRVIwHqIKkU") {
                map.setZoom(15);
            }

        } else {
            map.setCenter(place.geometry.location);
            //Gómez palacios, Torreón, Aguascalientes, Ciudad de México, Estado de México (Tecamac,Chapa de Mota),Huimilpan  Queretaro, Veracruz Jáltipan
            if (ubicacion.place_id == "ChIJ-7NFu6nbj4YRHaCucJl6zIs" || ubicacion.place_id == "ChIJr9SXsc7Zj4YRzbjXdRQ7oUI" || ubicacion.place_id == "ChIJNdBqxVEAKoQRqXI-fdOzRWc"
                || ubicacion.place_id == "ChIJUT-QGF0cKoQRC0ThotRJwL4" || ubicacion.place_id == "ChIJ81fdg_t1goYRhwQtPLxkqKY" || ubicacion.place_id == "ChIJB3UJ2yYAzoURQeheJnYQBlQ"
                || ubicacion.place_id == "ChIJJyk1sTYAzoURW4rR6E6e_d4" || ubicacion.place_id == "ChIJE0xwqWGuKIQRrALQftSl2K8" || ubicacion.place_id == "ChIJhbc-7drs0YURlEUtP8V7oU8"
                || ubicacion.place_id == "ChIJW2g7hQDDYoYRxse9Oun-WKY" || ubicacion.place_id == "ChIJ_8vl92FH0oURD15IqMtrVOA" || ubicacion.place_id == "ChIJ8c3K9m9A04URxv09vLG_wYc"
                || ubicacion.place_id == "ChIJk-aVLdgf6oURjX7H2Dji-Xc") {
                map.setZoom(12);
            }

            //Baja California Norte y Sur, QuintanaRoo,sonora,tamaulipas
            if (ubicacion.place_id == "ChIJ0913qAxw14ARjt4YA5_9pPw" || ubicacion.place_id == "ChIJyR6itTnTr4YRGFmnqTqz33E" || ubicacion.place_id == "ChIJlSbD6vD8T48RnI1MSCrF8MQ" || ubicacion.place_id == "ChIJWSQe265TeYYRJRnoNVqfhTM" || ubicacion.place_id == "ChIJD9JN52kpmIYRdOO7_Br_Vs0" || ubicacion.place_id == "ChIJKR6Opr1yiIYROXrNFNeaAGQ") {

                map.setZoom(7);

            }
            //Comondu BCS, Mulege BCS, Michoacan , queretaro ,
            if (ubicacion.place_id == "ChIJj809JiiHs4YRQbvAdUpuXxY" || ubicacion.place_id == "ChIJBXXEtigGNYEREX41__43rKE" || ubicacion.place_id == "ChIJt1yzHj5fKoQR1OBL8wxlxzs" || ubicacion.place_id == "ChIJVZJb3I9b04URL4MbVqqUsJc" || ubicacion.place_id == "ChIJbRNrF5Yz-IURRGLylUyOPek") {

                map.setZoom(9);

            }
            //veracruz ,sinaloa"",chiapas
            if (ubicacion.place_id == "ChIJxXjKRUJBw4URmwE26ULWpBg" || ubicacion.place_id == "ChIJWUmnKJRTn4YR71--DXbfe5w" || ubicacion.place_id == "ChIJZ85Xl7REjYURFdYZRoIzAM8" || ubicacion.place_id == "ChIJc9-8GKW3m4YR1EpsOqaO3b8") {

                map.setZoom(8);

            }

            //Los Cabos , Nuevo leon, yucatan, Hidalgo, SLP Salinas,Sonora (Villa Pesqueira, Rosario, General Plutarco Elías Calles, México), Sonora Bácum,
            if (ubicacion.place_id == "ChIJS5Kav3Bor4YRLVXbc_dWi_c" || ubicacion.place_id == "ChIJXbClooSVYoYRxrtsw0L0HXA" || ubicacion.place_id == "ChIJ7QTWqvgPVI8RCj0IMXUhzMw" || ubicacion.place_id == "ChIJ5y_OIgQK0YURG3hAeb_FUoE" || ubicacion.place_id == "ChIJT9hqL5uVgYYR9WTjtjI2pgE"
                || ubicacion.place_id == "ChIJuTjrjtASz4YRQERzAiM2mk4" || ubicacion.place_id == "ChIJ0yHMgWozxoYR0pCD0Hb6LUM" || ubicacion.place_id == "ChIJ0UmBXRjFKoERnJgFanz2tYc" || ubicacion.place_id == "ChIJxeIgXHJPyIYROn_m0017jiY") {

                map.setZoom(10);

            }


            //Matamoros Coahuila,Estado de México(Atizapán,San Martín de las Pirámides, Tezoyuca, Teotihuacán, Cuautitlán, La Paz, Coacalco de Berriozabal, Valle de Chalco Solidaridad, Nicolás Romero, Tlalnepantla de Baz, Atenco, Chimalhuacán), SLP (San Nicolás Tolentino, Armadillo de los Infante),
            if (ubicacion.place_id == "ChIJg8a6tSrBj4YRh7lkZj_TyB0" || ubicacion.place_id == "ChIJX_RmQYnYj4YRaO-E7cVHm-I" || ubicacion.place_id == "6bK4QRH1Ybg9VQKQs"
                || ubicacion.place_id == "ChIJ94hqw-6bK4QRH1Ybg9VQKQs" || ubicacion.place_id == "ChIJ__vTAocc0oUR4MjngvxrWsU" || ubicacion.place_id == "ChIJfbgR0SnA0YURqQWY-TBkb84" || ubicacion.place_id == "ChIJF5S1SyPp0YURTS8DzT9iSOg"
                || ubicacion.place_id == "ChIJPZLKHuPq0YURATNi5_pvM0k" || ubicacion.place_id == "ChIJcRh0VXX10YUR6W9HLTCTeWI" || ubicacion.place_id == "ChIJrS6bGbHg0YURxsO9CVT1-2U" || ubicacion.place_id == "ChIJPTF2Pcbz0YURha_3SsBjLRM" || ubicacion.place_id == "ChIJ7z-C0zUczoURDvbvTV8zbJE"
                || ubicacion.place_id == "ChIJBYowjGMZ0oUR2NFMw95vx8E" || ubicacion.place_id == "ChIJYxCNbHb40YUR9s1Fdr8kGJk" || ubicacion.place_id == "ChIJtdHh1Dfv0YURxQPuxebxw40" || ubicacion.place_id == "ChIJmdc6XHDj0YUR94fvy-Tt4Ok" || ubicacion.place_id == "ChIJQcVvE5mqKoQRwtU4I8A-PsY"
                || ubicacion.place_id == "ChIJS_kh7Bp10oUR7R7x9VUnDiE" || ubicacion.place_id == "ChIJd4pEP6ihKoQR4VMDvJIKkZA") {

                map.setZoom(14);

            }
            //tlaquepaque, Tlajomulco de Zúñiga (jalisco),Estado de Mexico (Chicoloapan, Cuautitlán Izcalli, Naucalpan de Juárez, Nezahualcóyotl, Ecatepec de Morelos), Morelia (Michoacan),SLP (Zaragoza, Soledad de Graciano Sánchez), Sonora Guaymas,
            if (ubicacion.place_id == "ChIJA0pBpoezKIQREKq-cByLC14" || ubicacion.place_id == "ChIJk0R9BvdTL4QRL95OIvTG3_k" || ubicacion.place_id == "ChIJReN4bmzh0YURFUI1P18AqsM"
                || ubicacion.place_id == "ChIJZ0Krr9Qd0oURiE3bnk3X6Aw" || ubicacion.place_id == "ChIJ7y7PWEkB0oURn-ssxjwYNsA" || ubicacion.place_id == "ChIJSXRXRqn80YURSM_kDwcjHXk" || ubicacion.place_id == "ChIJoXf3chzy0YURgGayQgpU1Ew" || ubicacion.place_id == "ChIJ46edsqILLYQRIIacZ3hpAQQ"
                || ubicacion.place_id == "ChIJE1GbkUq0KoQR1HGQzqitdPk" || ubicacion.place_id == "ChIJ7x3QuPQVyYYRhPkF6AJU2ZY") {
                map.setZoom(13);
            }
            //cabo corrientes(jalisco), Monterrey, tlaxcala, nayarit,Hidalgo (Michoacan), Sonora (Quiriego), Tamaulipas (Guerrero, Río Bravo), Veracruz(Veracruz),
            if (ubicacion.place_id == "ChIJ32f63CPeI4QRXw0LQ0pIuxA" || ubicacion.place_id == "ChIJ74hS7tlp0oURTL_vhuAJEhM" || ubicacion.place_id == "ChIJR9s-5pyoIIQROdKUhqL1yMI" || ubicacion.place_id == "ChIJ9fg3tDGVYoYRlJjIasrT06M" || ubicacion.place_id == "ChIJE2EAHD_Zz4UR4L181Friujg"
                || ubicacion.place_id == "ChIJZ3eaCsvL0oUR71cnLMg63nM" || ubicacion.place_id == "ChIJj5BTOebox4YR1XMAujfOkA8" || ubicacion.place_id == "ChIJEX-8asZeYYYRgCaiC-QpIXw" || ubicacion.place_id == "ChIJT8OQoodDZYYRGyKC5nStVu0" || ubicacion.place_id == "ChIJxXjKRUJBw4URmwE26ULWpBg") {
                map.setZoom(11);
            }
            //Tonanitla, (Estado México)
            if (ubicacion.place_id == "ChIJ9ahdi_3y0YURnRVIwHqIKkU") {
                map.setZoom(15);
            }
            //map.setZoom(17);  // Why 17? Because it looks good.
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

    map.setCenter(new google.maps.LatLng(24.2436666, -102.4551421));
    map.setZoom(5);
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


                    //$("#description-casas").append(modal_casa);

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

function jumpMarker(index) {
    //Brincar marker
    var flag = 0;
    for (var k = 0; k < allMarkers.length; k++) {
        if ("marker" + index == allMarkers[k].id) {
            allMarkers[k].setAnimation(google.maps.Animation.BOUNCE);
            flag = 1;
            break;
        }
    }

    if (flag == 1) {
        console.log(index);
        console.log(allMarkers[index].id);
    }
}

function stopOthersMarkers(index) {
    if (jumping) {
        clearInterval(jumping);
    }

    for (var k = 0; k < allMarkers.length; k++) {
        allMarkers[k].setIcon(markerBlue);
        allMarkers[k].setAnimation(null);
        infoWindows[k].close();
        $("#markerLayer" + k).css("animation", "none");
    }
}

function boxListeners() {
    var others = Array.from(document.querySelectorAll('*[id^="img-thumbnail"]'));
    others.forEach(function (item) {
        $(item).mouseover(function () {
            var aiDi = $(item).attr('id');
            aiDi = aiDi.split("_");
            hover(aiDi[1]);

            jumping = setInterval(function() {
                jumpMarker(aiDi[1]);
            }, 1000);
        });

        $(item).mouseout(function () {
            var aiDi = $(item).attr('id');
            aiDi = aiDi.split("_");
            out(aiDi[1]);

            if (jumping) {
                clearInterval(jumping);
                jumping = null;
            }
        });

        $(item).click(function () {
            var aiDi = $(item).attr('id');
            aiDi = aiDi.split("_");
            /*
            for (var i = 0; i < others.length; i++) {
                if ($("#house_description_" + i).css('display') == "block") {
                    $("#house_description_" + i).hide();
                }
            }
            */

            //$("#house_description_" + aiDi[1]).show();
            createModal(propiedades[aiDi[1]-1], aiDi[1]);
            $("#house_cards").hide();
            $("#caja_" + aiDi[1]).hide();

            console.log(jumping);
            // Para los demas markers
            stopOthersMarkers(aiDi[1]);

            //Brincar marker
            jumping = setInterval(function() {
                jumpMarker(aiDi[1]);
            }, 1000);
            console.log(jumping);

            propiedadesCercanas(aiDi[1]);
            $("#titulocercanas").show();
            getMarker(aiDi[1]);
        });
    });
}

function changeButtonColor(id, index) {
    var button = ["restaurantes_", "escuelas_", "hospitales_", "cormercio_", "super_", "parques_"];


    if ("restaurantes_" + index == id) {
        console.log(10);
        $("#img_restaurantes_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_RESTAURANTES-ON.png");
    } else {
        console.log(20);
        $("#img_restaurantes_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_RESTAURANTES-OFF.png");
    }

    if ("escuelas_" + index == id) {
        $("#img_escuelas_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_ESCUELAS-ON.png");
    } else {
        $("#img_escuelas_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_ESCUELAS-OFF.png");
    }

    if ("hospitales_" + index == id) {
        $("#img_hospitales_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_HOSPITALES-ON.png");
    } else {
        $("#img_hospitales_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_HOSPITALES-OFF.png");
    }

    if ("cormercio_" + index == id) {
        $("#img_cormercio_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_COMERCIALES-ON.png");
    } else {
        $("#img_cormercio_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_COMERCIALES-OFF.png");
    }

    if ("super_" + index == id) {
        $("#img_super_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_SUPER-ON.png");
    } else {
        $("#img_super_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_SUPER-OFF.png");
    }

    if ("parques_" + index == id) {
        $("#img_parques_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_PARQUES-ON.png");
    } else {
        $("#img_parques_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_PARQUES-OFF.png");
    }
}

function propiedadesCercanas(id) {

    var propiedad_id = null;
    for (var i = 0; i < allMarkers.length; i++) {
        if ("marker" + id == allMarkers[i].id) {
            propiedad_id = allMarkers[i].propiedad;
            break;
        }
    }

    $.ajax({
        url: url + "/propiedades/cercanas",
        type: "POST",
        data: {
            id: propiedad_id
        },
        dataType: "JSON",
        beforeSend: function () {
            $("#wait").show();
        },

        success: function (response) {
            if (response.propiedades.length > 0) {
                showOnlySomeCards(response.propiedades, "cerca");
            }
        },
        error: function (respuesta) {
            console.log(respuesta);
        },
        complete: function () {
            $("#wait").hide();
        }
    });

    $('#casas').appendTo('#casas_cercanas');
    $('#casas_cercanas').show();
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

            'Calle: ' + propiedad.Calle__c + '<br />' + ' Colonia: ' + propiedad.Colonia__c +
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
        marker.precio = propiedad.PrecioVenta__c;

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

            createModal(propiedades[index_id-1], index_id);
            $("#house_cards").hide();
            $('#casas').appendTo('#casas_cercanas');
            $('#casas_cercanas').show();
            //al dar click en el marker entra a detalle, debe cambiar a rojo y saltar estand oen detalle     border: 4px solid #46BEEF;
            stopOthersMarkers();

            //marker.setAnimation(google.maps.Animation.BOUNCE);
            jumping = setInterval(function() {
                jumpMarker(index_id);
            }, 1000);

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
                "position": "relative",
                "z-index": "1032",
                "border-color": "#CFDB00"
            });

            // Mover arriba a la izquierda
            var house_selected = $("#caja_" + index_id).html();
            $("#caja_" + index_id).hide();
            var back = $("#casas").html();

            $("#casas").html('<div class="col-md-6 como_estas" id="caja_' + index_id + '">' + house_selected + '</div>' + back);
            boxListeners();


            marker.setAnimation(google.maps.Animation.BOUNCE);
            //$("#markerLayer" + i).css("animation", "pulse .5s infinite alternate");
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
             marker.setAnimation(google.maps.Animation.NONE);
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

            allMarkers[i].setAnimation(google.maps.Animation.BOUNCE);
            $("#markerLayer" + i).css("animation", "pulse .5s infinite alternate");

            map.panTo(allMarkers[i].getPosition());
            stateCenter(i);

            //map.setZoom(17);
            break;
        }
    }
}

function stateCenter(index) {
    var latlng = {lat: allMarkers[index].getPosition().lat(), lng: allMarkers[index].getPosition().lng()};
    var geo = new google.maps.Geocoder();
    var state = "";

    /*  EJEMPLO DE CENTRADO
    var mx = {lat: 24.2436666, lng: -102.4551421};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: mx
    }
    */

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

function getMarkersPlace(id, action) {
    for (var i = 0; i < allMarkers.length; i++) {
        var ij = "marker" + id;

        if (ij == allMarkers[i].id) {
            var latLng = new google.maps.LatLng(allMarkers[i].getPosition().lat(), allMarkers[i].getPosition().lng());

            switch (action) {
                case 1: // Escuelas
                    service.nearbySearch({
                        location: latLng,
                        radius: radius,
                        types: ['school']
                    }, processResultsEscuelas);
                    break;
                case 2: //Restauran
                    service.nearbySearch({
                        location: latLng,
                        radius: radius,
                        types: ['cafe', 'restaurant']
                    }, processResultsResta);
                    break;
                case 6: //Servicios
                    service.nearbySearch({
                        location: latLng,
                        radius: radius,
                        types: ['bank', 'library', 'police', 'bus_station', 'airport']
                    }, processResultsServicios);
                    break;
                case 8: //Tiendas
                    service.nearbySearch({
                        location: latLng,
                        radius: radius,
                        types: ['shopping_mall', 'store']
                    }, processResultsTiendas);
                    break;

                case 5: //Hospitales
                    service.nearbySearch({
                        location: latLng,
                        radius: radius,
                        types: ['hospital', 'pharmacy']
                    }, processResults);
                    break;

                case 7: // Parkes
                    service.nearbySearch({
                        location: latLng,
                        radius: radius,
                        type: ['park']
                    }, processResultsRecreo);
                    break;
            }

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

    if (map.getZoom() > 10) {
        console.log("si");
    }

    else {
        for (var i = 0; i < allMarkers.length; i++) {
            if ("marker" + id == allMarkers[i].id) {
                allMarkers[i].setIcon(markerRed);
                infoWindows[i].open(map, allMarkers[i]);

                //  AQUI DEBE IR ESTE PUTO PERO NO FUNCIONA
                //allMarkers[i].setAnimation(google.maps.Animation.BOUNCE);
                //$("#markerLayer" + i).css("animation", "pulse .5s infinite alternate");

                if (map.getZoom() > 16) {
                    map.panTo(allMarkers[i].getPosition());
                    map.setZoom(17);
                }

                break;
            }
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

function showPropiedadesBySearch(ubicacion) {
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

function showPropiedadesByPrecio(min, max) {
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

            if (box.hasClass("search") || box.hasClass("precio") || box.hasClass("cerca")) {
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
    } else { // agregar a favoritos
        heart.removeClass("iDontLoveIt");
        heart.addClass("iloveit");
        heart.css("color", "rgba(255, 0, 0, 0.62)");

        var propiedad_id = null;
        for (var i = 0; i < allMarkers.length; i++) {
            if ("marker" + id == allMarkers[i].id) {
                propiedad_id = allMarkers[i].propiedad;
                break;
            }
        }

        $.ajax({
            url: url + '/favoritos/store',
            type: 'POST',
            data: {
                id: propiedad_id
            },
            dataType: 'JSON',
            beforeSend: function () {
                $("#wait").show();
            },
            success: function (respuesta) {
                notificaction("La propiedad se agrego a tus favoritos", "success");
                $('#modalFavoritos' + id).show();
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

function processResultsEscuelas(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        createMarkersEscuelas(results);
    }
}

function createMarkersEscuelas(places) {
    var bounds = new google.maps.LatLngBounds();

    if (markesrsSerives.length > 0) {
        for (var i = 0; i < markesrsSerives.length; i++) {
            markesrsSerives[i].setMap(null);
        }
    }

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: "images/PIN-PROPIEDADES-WEB_ESCUELAS.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        markesrsSerives.push(marker);

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}

function processResultsResta(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        createMarkersRes(results);
    }
}

function createMarkersRes(places) {
    var bounds = new google.maps.LatLngBounds();

    if (markesrsSerives.length > 0) {
        for (var i = 0; i < markesrsSerives.length; i++) {
            markesrsSerives[i].setMap(null);
        }
    }

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: "images/PIN-PROPIEDADES-WEB_RESTAURANTES.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        markesrsSerives.push(marker);

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}

function processResultsServicios(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        createMarkers6(results);
    }
}

function createMarkers6(places) {
    var bounds = new google.maps.LatLngBounds();

    if (markesrsSerives.length > 0) {
        for (var i = 0; i < markesrsSerives.length; i++) {
            markesrsSerives[i].setMap(null);
        }
    }

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: "images/PIN-PROPIEDADES-WEB_COMERCIAL.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        markesrsSerives.push(marker);

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}

function processResultsTiendas(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        createMarkers7(results);
    }
}

function createMarkers7(places) {
    var bounds = new google.maps.LatLngBounds();

    if (markesrsSerives.length > 0) {
        for (var i = 0; i < markesrsSerives.length; i++) {
            markesrsSerives[i].setMap(null);
        }
    }

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: "images/PIN-PROPIEDADES-WEB_SUPER.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        markesrsSerives.push(marker);

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}

function processResultsRecreo(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        createMarkers4(results);
    }
}

function createMarkers4(places) {
    var bounds = new google.maps.LatLngBounds();

    if (markesrsSerives.length > 0) {
        for (var i = 0; i < markesrsSerives.length; i++) {
            markesrsSerives[i].setMap(null);
        }
    }

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: "images/PIN-PROPIEDADES-WEB_PARQUES.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        markesrsSerives.push(marker);

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}

function processResults(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        createMarkers(results);
    }
}

function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();

    if (markesrsSerives.length > 0) {
        for (var i = 0; i < markesrsSerives.length; i++) {
            markesrsSerives[i].setMap(null);
        }
    }

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: "images/PIN-PROPIEDADES-WEB_HOSPITALES.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        markesrsSerives.push(marker);

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
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
        '<img class="imagen-modal" src="' + imagen + '">' +
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
        '<p class="descripcion">Descripción de propiedad</p>' +
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

$("#uno_carlos").mouseover(function () {
    $("#uno_carlos").css({
        "background-color": "#002967",
        "height": "78px"
    });
});

$("#uno_carlos").mouseleave(function () {
    $("#uno_carlos").css({
        "background-color": "rgba(0, 41, 103, 0)"
    });
});

$("#dos_carlos").mouseover(function () {
    $("#dos_carlos").css({
        "background-color": "#002967",
        "height": "78px"
    });
});

$("#dos_carlos").mouseleave(function () {
    $("#dos_carlos").css({
        "background-color": "rgba(0, 41, 103, 0)"
    });
});

$("#tres_carlos").mouseover(function () {
    $("#tres_carlos").css({
        "background-color": "#002967",
        "height": "78px"
    });
});

$("#tres_carlos").mouseleave(function () {
    $("#tres_carlos").css({
        "background-color": "rgba(0, 41, 103, 0)"
    });
});

$("#cuatro_carlos").mouseover(function () {
    $("#cuatro_carlos").css({
        "background-color": "#002967",
        "height": "78px"
    });
});

$("#cuatro_carlos").mouseleave(function () {
    $("#cuatro_carlos").css({
        "background-color": "rgba(0, 41, 103, 0)"
    });
});

$("#cinco_carlos").mouseover(function () {
    $("#cinco_carlos").css({
        "background-color": "#002967",
        "height": "78px"
    });
});

$("#cinco_carlos").mouseleave(function () {
    $("#cinco_carlos").css({
        "background-color": "rgba(0, 41, 103, 0)"
    });
});

$("#seis_carlos").mouseover(function () {
    $("#seis_carlos").css({
        "background-color": "#002967",
        "height": "78px"
    });
});

$("#seis_carlos").mouseleave(function () {
    $("#seis_carlos").css({
        "background-color": "rgba(0, 41, 103, 0)"
    });
});
