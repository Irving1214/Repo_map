/**
 * Created by @HackeaMesta on 10/07/17.
 */
var excepciones = ['Vallarta ', 'La Paz ', 'Palmas del Sol ', "Ampliacion Cerrada las Margaritas ",  "Ampliacion Rinconada de las Brisas ", "Anahuac ",  "Arcos del Sol (csl) ", 'Astilleros ',  "Benito Juarez (qr) ", "Bosque la Loma ",
                  "Bosques del Centinela ", "Brisas del Pacifico ", "Centro (ppn) ", "Cerrito Colorado ", "Chapultepec Ii Poligono Iv ", "Ciudad Galaxia los Reyes ", "Costa Dorada (jal) ",
                  "Costa Dorada (vrz) ", "Cuchilla ", "Del Valle ", "El Centenario ", "El Laurel (bc) ",  "El Pueblito de San Angel I ",  "Enrique Olivares Santana ", "Francisco Villa (bc) ",
                  "Geovillas de Terranova ", "Gloria ", "Hacienda los Fresnos ",  "Hacienda Quinta Real ",  "Hacienda Real de Tultepec ", "Infonavit C.t.m. San Pablo Tultepec ", "Jardines de la Hacienda (ton) ",
                  "Jardines de San Jose (edo) ", "Jardines de Santiago ",  "Jardines del Eden (jal) ", "Jose Lopez Portillo (son) ",  "Joyas de Torreon ", "La Amistad ",  "La Floresta (dur) ", "La Paz ", "Lopez Portillo (ppe) ",
                  "Los Altos (bcs) ","Los Angeles (caj) ","Los Angeles Ii ","Los Heroes (edo) ","Los Heroes Tecamac ","Los Impresionistas ", "Los Molinos (dgo) ","Fraccionamiento los Nogales (qro) ","Los Tejavanes ","Mediterraneo (bc) ",
                  "Miravalle ","Misiones de Santa Fe (csl) ","Monterreal ","Paraiso Cancun ","Paseo de las Arboledas (ver) ","Paseo de las Lomas ","Paseo del Pedregal (son) ","Portal del Sol ","Pradera Dorada (chi) ","Privada los Azahares ","Pueblo Alegre ",
                 "Pueblo del Oro ","Puerta del Rey ","Quinta San Fernando ","Santa Fe Oro (csl) ","Quintas California (csl) ","Quintas San Isidro ","Rancho la Capilla ","Real de Costitlan "] ;
excepciones.push( );

$(document).ready(function () {
    $("#pac-input").on("keydown", function (event) {
        if (event.keyCode === $.ui.keyCode.TAB &&
            $(this).autocomplete("instance").menu.active) {
            event.preventDefault();
        }
    }).autocomplete({
        minLength: 2,
        source: function (request, response) {
            getPlaces(response);
        },
        focus: function () {
            // prevent value inserted on focus
            return false;
        },
        delay: 300,
        select: function (event, ui) {
            var terms = String(this.value).split(".");
            // remove the current input
            terms.pop();
            // add the selected item
            terms.push(ui.item.value);
            // add placeholder to get the comma-and-space at the end
            terms.push("");
            this.value = terms.join("");
            moveMap(ui.item.lat, ui.item.lng, ui.item.zoom, ui.item.value);
   stopOthersClickedMarkers();
            return false;
        }
    });
});

function getPlaces(response) {
    $.ajax({
        type: 'POST',
        url: url + "/propiedades/places",
        data: {
            search: $("#pac-input").val()
        },
        dataType: "JSON",
        success: function (data) {
            response($.map(data.places, function (el) {
                if (el.is_plaza == 1) {
                    return returnCity(el);
                } else {
                    return returnColonia(el);
                }
            }));
        }
    });
}

function returnCity(el) {
    return {
        label: el.place,
        value: el.place,
        is_plaza: el.is_plaza,
        zoom: 13,
        lat: el.latitude,
        lng: el.longitude
    };
}

function returnColonia(el) {
    return {
        label: el.place,
        value: el.place,
        is_plaza: el.is_plaza,
        zoom: 5,
        lat: el.latitude,
        lng: el.longitude
    };
}

function moveMap(lat, lng, zoom, place) { // comparar lat y lng
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        address: $("#pac-input").val()
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0].geometry.viewport) {
                map.fitBounds(results[0].geometry.viewport);
                zoomLevels(results[0]);

            } else {
                map.setCenter(results[0].geometry.location);
                zoomLevels(results[0]);
            }

            showPropiedadesBySearch(results[0]);
            excepciones.forEach(function (ciudad) {
                if (ciudad == $("#pac-input").val()) {
                    myMoveMap(lat, lng, zoom, place, results);
                }
            });
        } else {
            myMoveMap(lat, lng, zoom, place, results);
        }
    });
}

function myMoveMap(lat, lng, zoom, place, results) {
    var z = getZoom(place);
    console.log(z);
    map.setCenter(new google.maps.LatLng(lat, lng));
    map.setZoom(z);
    showPropiedadesBySearch(results[0]);
}


function getZoom(place) {
    var ciudades = [
        {
            "Plaza__c": "Acolman ",
            "center": {
                "latitude": 19.642061,
                "longitude": -98.910737,
                "zoom": 15
            }
        }, {
            "Plaza__c": "Aguascalientes ",
            "center": {
                "latitude": 21.885256,
                "longitude": 102.291568,
                "zoom": 10
            }
        },
        {
            "Plaza__c": "Cabo San Lucas ",
            "center": {
                "latitude": 22.9077915,
                "longitude": -109.9372085,
                "zoom": 14
            }
        },
        {
            "Plaza__c": "Cajeme ",
            "center": {
                "latitude": 27.50401477075,
                "longitude": -109.91492587485,
                "zoom": 9
            }
        },
        {
            "Plaza__c": "Cancun ",
            "center": {
                "latitude": 21.124902036,
                "longitude": -86.8771666521,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Celaya ",
            "center": {
                "latitude": 20.5263645,
                "longitude": -100.82908355,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Chicoloapan ",
            "center": {
                "latitude": 19.41852601185,
                "longitude": -98.8827095,
                "zoom": 14
            }
        },
        {
            "Plaza__c": "Chihuahua ",
            "center": {
                "latitude": 28.685211,
                "longitude": -106.10358,
                "zoom": 12
            }
        },
        {
            "Plaza__c": "Ciudad Juarez ",
            "center": {
                "latitude": 31.642452,
                "longitude": -106.4275975,
                "zoom": 12
            }
        },
        {
            "Plaza__c": "Ciudad Obregon ",
            "center": {
                "latitude": 27.482773,
                "longitude": -109.930367,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Coacalco de Berriozabal ",
            "center": {
                "latitude": 19.630452619531,
                "longitude": -99.08928695,
                "zoom": 14
            }
        },
        {
            "Plaza__c": "Cuautitlan Izcalli ",
            "center": {
                "latitude": 19.650233818,
                "longitude": -99.260304489,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Ecatepec de Morelos ",
            "center": {
                "latitude": 19.56905855125,
                "longitude": -99.0407489139,
                "zoom": 12
            }
        },
        {
            "Plaza__c": "Ensenada ",
            "center": {
                "latitude": 31.8364895,
                "longitude": -116.5898805,
                "zoom": 12
            }
        },
        {
            "Plaza__c": "Gomez Palacio ",
            "center": {
                "latitude": 25.589148,
                "longitude": -103.485862,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Guadalajara ",
            "center": {
                "latitude": 20.6613703,
                "longitude": -103.366127,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Hermosillo ",
            "center": {
                "latitude": 29.08436063555,
                "longitude": -110.98356899205,
                "zoom": 12
            }
        },
        {
            "Plaza__c": "Huehuetoca ",
            "center": {
                "latitude": 19.8248220557,
                "longitude": -99.207995135,
                "zoom": 15
            }
        },
        {
            "Plaza__c": "Ixtapaluca ",
            "center": {
                "latitude": 19.3090538,
                "longitude": -98.9079782,
                "zoom": 14
            }
        },
        {
            "Plaza__c": "La Paz ",
            "center": {
                "latitude": 24.142641,
                "longitude": -110.312753,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Lerdo ",
            "center": {
                "latitude": 24.781755942654,
                "longitude": -104.08202005,
                "zoom": 14
            }
        },
        {
            "Plaza__c": "Los Mochis ",
            "center": {
                "latitude": 25.78131656405,
                "longitude": -108.98520435,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Matamoros ",
            "center": {
                "latitude": 25.860291494801,
                "longitude": -97.544759084367,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Mexicali ",
            "center": {
                "latitude": 32.609505,
                "longitude": -115.409699,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Monterrey ",
            "center": {
                "latitude": 25.6931503,
                "longitude": -100.316113,
                "zoom": 12
            }
        },
        {
            "Plaza__c": "Morelia ",
            "center": {
                "latitude": 19.763491,
                "longitude": -101.103608,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Nuevo Laredo ",
            "center": {
                "latitude": 27.46824812035,
                "longitude": -99.60059663109,
                "zoom": 12
            }
        },
        {
            "Plaza__c": "Puerto Penasco ",
            "center": {
                "latitude": 31.32607961005,
                "longitude": -113.53646028305,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Queretaro ",
            "center": {
                "latitude": 20.588818,
                "longitude": -100.38988760000001,
                "zoom": 9
            }
        },
        {
            "Plaza__c": "San Jose del Cabo ",
            "center": {
                "latitude": 23.0636562,
                "longitude": -109.7024376,
                "zoom": 14
            }
        },
        {
            "Plaza__c": "San Luis Potosi ",
            "center": {
                "latitude": 22.1565651,
                "longitude": -100.9854628,
                "zoom": 8
            }
        },
        {
            "Plaza__c": "Tarimbaro ",
            "center": {
                "latitude": 19.7697405,
                "longitude": -101.1240152,
                "zoom": 16
            }
        },
        {
            "Plaza__c": "Tecamac ",
            "center": {
                "latitude": 19.7122732,
                "longitude": -98.96830729999999,
                "zoom": 12
            }
        },
        {
            "Plaza__c": "Tijuana ",
            "center": {
                "latitude": 32.4852305,
                "longitude": -116.937389,
                "zoom": 12
            }
        },
        {
            "Plaza__c": "Tlajomulco ",
            "center": {
                "latitude": 20.4736865,
                "longitude": -103.44793140000002,
                "zoom": 15.
            }
        },
        {
            "Plaza__c": "Tlalnepantla de Baz ",
            "center": {
                "latitude": 19.532574189933,
                "longitude": -99.197715268411,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Tonala ",
            "center": {
                "latitude": 20.631491,
                "longitude": -103.253422,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Torreon ",
            "center": {
                "latitude": 25.5428443,
                "longitude": -103.40678609999998,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Tultepec ",
            "center": {
                "latitude": 19.6848383,
                "longitude": -99.1295326,
                "zoom": 14
            }
        },
        {
            "Plaza__c": "Vallarta ",
            "center": {
                "latitude": 20.653407,
                "longitude": -105.2253316,
                "zoom": 13
            }
        },
        {
            "Plaza__c": "Veracruz ",
            "center": {
                "latitude": 18.6048135,
                "longitude": -95.4163635,
                "zoom": 13
            }
        }
    ];

    var colonias = [
        {
            "Colonia__c": "Ampliacion Cerrada las Margaritas ",
            "center": {
                "latitude": 25.56053,
                "longitude": -103.531433,
                "zoom": 18
            }
        },
        {
            "Colonia__c": "Ampliacion Rinconada de las Brisas ",
            "center": {
                "latitude": 25.857240453013,
                "longitude": -97.556946241734,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Anahuac ",
            "center": {
                "latitude": 25.7755196,
                "longitude": -108.9912777,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Arcos del Sol (csl) ",
            "center": {
                "latitude": 22.905718,
                "longitude": -109.928852,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Astilleros ",
            "center": {
                "latitude": 19.213349,
                "longitude": -96.18594,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Banus Residencial (tlj) ",
            "center": {
                "latitude": 20.4927555,
                "longitude": -103.4876135,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Benito Juarez (qr) ",
            "center": {
                "latitude": 21.121209,
                "longitude": -86.877861,
                "zoom": 19
            }
        },
        {
            "Colonia__c": "Benito Juarez (tam) ",
            "center": {
                "latitude": 27.4656585,
                "longitude": -99.582692,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Bosque la Loma ",
            "center": {
                "latitude": 20.569246,
                "longitude": -103.494448,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Bosques del Centinela ",
            "center": {
                "latitude": 20.7534946,
                "longitude": -103.3797981,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Brisas del Pacifico ",
            "center": {
                "latitude": 22.897878,
                "longitude": -109.934532,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Centro (ppn) ",
            "center": {
                "latitude": 31.31781,
                "longitude": -113.53611,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Cerrito Colorado ",
            "center": {
                "latitude": 20.6368970384,
                "longitude": -100.4682715228,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Chapultepec Ii Poligono Iv ",
            "center": {
                "latitude": 31.787688,
                "longitude": -116.600979,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Ciudad Galaxia los Reyes ",
            "center": {
                "latitude": 19.42410881185,
                "longitude": -98.87899377395,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Colinas Plus (sjc) ",
            "center": {
                "latitude": 23.072625,
                "longitude": -109.7184445,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Costa Dorada (jal) ",
            "center": {
                "latitude": 20.7113036361,
                "longitude": -105.21674220245,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Costa Dorada (vrz) ",
            "center": {
                "latitude": 19.207173,
                "longitude": -96.2159675,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Cuchilla ",
            "center": {
                "latitude": 25.7871135281,
                "longitude": -108.981301411,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Del Valle ",
            "center": {
                "latitude": 23.9935382,
                "longitude": -104.6442068,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Domingo Arrieta ",
            "center": {
                "latitude": 23.993490846895,
                "longitude": -104.66829603189,
                "zoom": 14
            }
        },
        {
            "Colonia__c": "El Centenario ",
            "center": {
                "latitude": 25.6307915,
                "longitude": -103.4977425,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "El Laurel (bc) ",
            "center": {
                "latitude": 32.461835,
                "longitude": -116.842509,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "El Pueblito de San Angel I ",
            "center": {
                "latitude": 20.5285841,
                "longitude": -100.8366781,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Enrique Olivares Santana ",
            "center": {
                "latitude": 21.894308,
                "longitude": -102.314014,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Ex Hacienda la Perla (coh) ",
            "center": {
                "latitude": 25.4917395,
                "longitude": -103.352268,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Fraccionamiento Jardines Universidad (coh) ",
            "center": {
                "latitude": 25.523571,
                "longitude": -103.327281,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Fraccionamiento Santa Sofia (coh) ",
            "center": {
                "latitude": 25.4896125,
                "longitude": -103.3598615,
                "zoom": 18
            }
        },
        {
            "Colonia__c": "Francisco Villa (bc) ",
            "center": {
                "latitude": 32.508626,
                "longitude": -117.053062,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Fundadores (que) ",
            "center": {
                "latitude": 20.382462394956,
                "longitude": -99.939939955017,
                "zoom": 14
            }
        },
        {
            "Colonia__c": "Geovillas de Terranova ",
            "center": {
                "latitude": 19.59903405,
                "longitude": -98.97836105,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Gloria ",
            "center": {
                "latitude": 28.685211,
                "longitude": -106.10358,
                "zoom": 18
            }
        },
        {
            "Colonia__c": "Hacienda los Fresnos ",
            "center": {
                "latitude": 20.4736865,
                "longitude": -103.4479314,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Hacienda Quinta Real ",
            "center": {
                "latitude": 25.861353119687,
                "longitude": -97.5337009635,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Hacienda Real de Tultepec ",
            "center": {
                "latitude": 19.65449,
                "longitude": -99.11433,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Infonavit C.t.m. San Pablo Tultepec ",
            "center": {
                "latitude": 19.651305,
                "longitude": -99.11137,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Jardines de la Hacienda (ton) ",
            "center": {
                "latitude": 20.593611,
                "longitude": -103.237806,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Jardines de San Jose (edo) ",
            "center": {
                "latitude": 19.645392839061,
                "longitude": -99.091797667494,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Jardines de Santiago ",
            "center": {
                "latitude": 20.646727,
                "longitude": -100.39236,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Jardines del Eden (jal) ",
            "center": {
                "latitude": 20.532866,
                "longitude": -103.358604,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Jose Lopez Portillo (son) ",
            "center": {
                "latitude": 31.33398692285,
                "longitude": -113.5396239941,
                "zoom": 14
            }
        },
        {
            "Colonia__c": "Joyas de Torreon ",
            "center": {
                "latitude": 25.549922,
                "longitude": -103.315705,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "La Amistad ",
            "center": {
                "latitude": 25.553762,
                "longitude": -103.361379,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "La Floresta (dur) ",
            "center": {
                "latitude": 25.613604,
                "longitude": -103.488164,
                "zoom": 19
            }
        },
        {
            "Colonia__c": "La Paz ",
            "center": {
                "latitude": 25.590283,
                "longitude": -103.360572,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "La Rueda ",
            "center": {
                "latitude": 20.427077,
                "longitude": -99.98826,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Las Almeras ",
            "center": {
                "latitude": 31.598684,
                "longitude": -106.428162,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Las Fuentes Ecatepec ",
            "center": {
                "latitude": 19.5662876675,
                "longitude": -99.0395237975,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Las Huertas (dgo) ",
            "center": {
                "latitude": 25.5673011,
                "longitude": -103.5258961,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Loma Bonita (bcs) ",
            "center": {
                "latitude": 32.5045963,
                "longitude": -116.8976994,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Loma Dorada (gdl) ",
            "center": {
                "latitude": 20.631491,
                "longitude": -103.253422,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Loma Real (dgo) ",
            "center": {
                "latitude": 25.5488471981,
                "longitude": -103.5412845981,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Lomas de Coacalco ",
            "center": {
                "latitude": 19.6155124,
                "longitude": -99.0937479,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Lomas de la Presa (ens) ",
            "center": {
                "latitude": 31.9005535,
                "longitude": -116.5697915,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Lomas de la Unidad Modelo ",
            "center": {
                "latitude": 25.730881,
                "longitude": -100.354467,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Lomas de San Francisco Tepojaco ",
            "center": {
                "latitude": 19.650233818,
                "longitude": -99.260304489,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Lomas del Valle (csl) ",
            "center": {
                "latitude": 22.929972,
                "longitude": -109.946056,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Lopez Portillo (ppe) ",
            "center": {
                "latitude": 31.3343492201,
                "longitude": -113.5332564779,
                "zoom":17
            }
        },
        {
            "Colonia__c": "Los Altos (bcs) ",
            "center": {
                "latitude": 32.526142,
                "longitude": -117.077937,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Los Angeles (caj) ",
            "center": {
                "latitude": 27.50401477075,
                "longitude": -109.91492587485,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Los Angeles Ii ",
            "center": {
                "latitude": 29.14868,
                "longitude": -110.966311,
                "zoom": 9
            }
        },
        {
            "Colonia__c": "Los Heroes (edo) ",
            "center": {
                "latitude": 19.325541,
                "longitude": -98.872119,
                "zoom":16
            }
        },
        {
            "Colonia__c": "Los Heroes Tecamac ",
            "center": {
                "latitude": 19.629815,
                "longitude": -99.037761,
                "zoom": 15
            }
        },
        {
            "Colonia__c": "Los Impresionistas ",
            "center": {
                "latitude": 20.523724,
                "longitude": -100.821489,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Los Molinos (dgo) ",
            "center": {
                "latitude": 25.569846626947,
                "longitude": -103.53626779511,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Fraccionamiento los Nogales (qro) ",
            "center": {
                "latitude": 20.4164809177,
                "longitude": -99.9990962884,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Los RuiseÑores (mch) ",
            "center": {
                "latitude": 19.763491,
                "longitude": -101.103608,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Los Tejavanes ",
            "center": {
                "latitude": 19.532574189933,
                "longitude": -99.197715268411,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Mediterraneo (bc) ",
            "center": {
                "latitude": 31.884354,
                "longitude": -116.611352,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Miravalle ",
            "center": {
                "latitude": 25.606565,
                "longitude": -103.4931005,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Misiones de Santa Fe (csl) ",
            "center": {
                "latitude": 22.9065835,
                "longitude": -109.9289725,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Monterreal ",
            "center": {
                "latitude": 25.50989,
                "longitude": -103.354397,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Palmas del Sol ",
            "center": {
                "latitude": 31.601519,
                "longitude": -106.432551,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Paraiso Cancun ",
            "center": {
                "latitude": 21.152759,
                "longitude": -86.849405,
                "zoom": 19
            }
        },
        {
            "Colonia__c": "Paseo de las Arboledas (ver) ",
            "center": {
                "latitude": 19.20613,
                "longitude": -96.214961,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Paseo de las Lomas ",
            "center": {
                "latitude": 19.372528,
                "longitude": -99.266432,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Paseo del Pedregal (son) ",
            "center": {
                "latitude": 29.174187,
                "longitude": -111.020333,
                "zoom": 18
            }
        },
        {
            "Colonia__c": "Portal del Sol ",
            "center": {
                "latitude": 19.8248220557,
                "longitude": -99.207995135,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Pradera Dorada (chi) ",
            "center": {
                "latitude": 31.695639,
                "longitude": -106.422644,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Privada los Azahares ",
            "center": {
                "latitude": 22.1275907,
                "longitude": -100.9386696,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Pueblo Alegre ",
            "center": {
                "latitude": 29.1544111409,
                "longitude": -111.012876008,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Pueblo del Oro ",
            "center": {
                "latitude": 29.1593567334,
                "longitude": -111.0090919368,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Puerta del Rey ",
            "center": {
                "latitude": 29.167470015796,
                "longitude": -111.01348291475,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Quinta San Fernando ",
            "center": {
                "latitude": 25.570015885307,
                "longitude": -103.53134858756,
                "zoom": 18
            }
        },
        {
            "Colonia__c": "Quintas California (csl) ",
            "center": {
                "latitude": 22.886987,
                "longitude": -109.9329025,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Quintas San Isidro ",
            "center": {
                "latitude": 25.573714,
                "longitude": -103.41,
                "zoom": 18
            }
        },
        {
            "Colonia__c": "Rancho la Capilla ",
            "center": {
                "latitude": 19.6972410773,
                "longitude": -98.9418530424,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Real de Costitlan ",
            "center": {
                "latitude": 19.4092121,
                "longitude": -98.8871689,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Real del Sol (coh) ",
            "center": {
                "latitude": 25.559024,
                "longitude": -103.330405,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Residencial del Bosque (gto) ",
            "center": {
                "latitude": 20.5289538,
                "longitude": -100.8308685,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Residencial Grand Santa Fe ",
            "center": {
                "latitude": 21.128388,
                "longitude": -86.869411,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Rincon de la Merced ",
            "center": {
                "latitude": 25.5027465,
                "longitude": -103.3865655,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Rincon las Huertas ",
            "center": {
                "latitude": 25.56609442165,
                "longitude": -103.531046192,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Rincon San Alberto ",
            "center": {
                "latitude": 25.6152255,
                "longitude": -103.484156,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Rinconadas Hamburgo ",
            "center": {
                "latitude": 25.594392371905,
                "longitude": -103.49701662148,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "San Alberto ",
            "center": {
                "latitude": 25.6111055,
                "longitude": -103.4854065,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "San Antonio (dgo) ",
            "center": {
                "latitude": 25.5681191162,
                "longitude": -103.5264424942,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "San Carlos (dgo) ",
            "center": {
                "latitude": 25.5608916929,
                "longitude": -103.5341612884,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "San Daniel ",
            "center": {
                "latitude": 25.5459496,
                "longitude": -103.5395635319,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "San Gregorio ",
            "center": {
                "latitude": 25.560429206496,
                "longitude": -103.5365564,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "San Juan (qro) ",
            "center": {
                "latitude": 20.411552,
                "longitude": -100.010639,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "San Pablo (son) ",
            "center": {
                "latitude": 29.131194,
                "longitude": -111.014743,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "San Rafael Coacalco ",
            "center": {
                "latitude": 19.638323,
                "longitude": -99.084826,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Santa Fe Oro (csl) ",
            "center": {
                "latitude": 22.9068155,
                "longitude": -109.92918,
                "zoom": 16
            }
        },
        {
            "Colonia__c": "Santa Isabel (ags) ",
            "center": {
                "latitude": 22.080929,
                "longitude": -102.268609,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Sierra Hermosa ",
            "center": {
                "latitude": 19.696862311855,
                "longitude": -99.010988234131,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Tabachines ",
            "center": {
                "latitude": 25.7846362,
                "longitude": -108.979148,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Valle de Ecatepec ",
            "center": {
                "latitude": 19.5690677454,
                "longitude": -99.0222848933,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Valle de Santa Lucia ",
            "center": {
                "latitude": 25.7457406,
                "longitude": -100.3513599,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Valle del Marquez (jrz) ",
            "center": {
                "latitude": 31.589265,
                "longitude": -106.425903,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Valle Dorado (bc) ",
            "center": {
                "latitude": 32.609505,
                "longitude": -115.409699,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Valle Real (dgo) ",
            "center": {
                "latitude": 25.6031408,
                "longitude": -103.487459,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Valle Real (mic) ",
            "center": {
                "latitude": 19.7697405,
                "longitude": -101.1240152,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villa de las Flores (dgo) ",
            "center": {
                "latitude": 25.5427353,
                "longitude": -103.5055097,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villa del Real (edo) ",
            "center": {
                "latitude": 19.6755725156,
                "longitude": -98.9789910213,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villa Residencial del Real (chi) ",
            "center": {
                "latitude": 31.612287,
                "longitude": -106.430926,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villa Residencial del Real (ens) ",
            "center": {
                "latitude": 31.771289,
                "longitude": -116.569709,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villanapoles ",
            "center": {
                "latitude": 25.5896736,
                "longitude": -103.49148355,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villas de Cortez (sjc) ",
            "center": {
                "latitude": 23.0982365,
                "longitude": -109.728899,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villas de la Hacienda ",
            "center": {
                "latitude": 20.53351,
                "longitude": -103.37973,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villas de la Joya (coh) ",
            "center": {
                "latitude": 25.546289,
                "longitude": -103.346488,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villas de Oradel ",
            "center": {
                "latitude": 27.4708377407,
                "longitude": -99.61850126218,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villas de Tulpetlac ",
            "center": {
                "latitude": 19.571829435,
                "longitude": -99.0592129345,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villas de Zaragoza ",
            "center": {
                "latitude": 25.5128955,
                "longitude": -103.3472555,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villas del Arte ",
            "center": {
                "latitude": 21.122605,
                "longitude": -86.877795,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villas del Encanto ",
            "center": {
                "latitude": 24.103254,
                "longitude": -110.328625,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villas del Refugio ",
            "center": {
                "latitude": 25.5904355,
                "longitude": -103.5148015,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villas las Misiones ",
            "center": {
                "latitude": 25.5911965,
                "longitude": -103.44965895,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Villasol ",
            "center": {
                "latitude": 20.66082,
                "longitude": -105.23456,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Vista Real ",
            "center": {
                "latitude": 28.993898,
                "longitude": -110.943111,
                "zoom": 17
            }
        },
        {
            "Colonia__c": "Vistas de Palmillas ",
            "center": {
                "latitude": 32.468508,
                "longitude": -116.821716,
                "zoom": 17
            }
        }
    ];

    for (var i = 0; i < ciudades.length; i++) {
        if (ciudades[i].Plaza__c == place) {
            return ciudades[i].center.zoom;
        }
    }

    for (i = 0; i < colonias.length; i++) {
        if (colonias[i].Colonia__c == place) {
            return colonias[i].center.zoom;
        }
    }

    // Zoom estandar
    return 11;
}
