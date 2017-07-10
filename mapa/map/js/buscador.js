/**
 * Created by @HackeaMesta on 10/07/17.
 */
var ciuades=[];
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
            moveMap(ui.item.lat, ui.item.lng, ui.item.zoom);

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

function moveMap(lat, lng, zoom) {
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
            map.setCenter(new google.maps.LatLng(lat, lng));
            map.setZoom(zoom);

            showPropiedadesBySearch(results[0]);
        }
    });
}







function Ciuadades(Plaza__c,latitude , longitude, zoom){
    $.ajax({
        url: "http://api.revimex.mx/propiedades/ciudades",
        type: "POST",
        data: {
            Plaza__c: Plaza__c,
            latitud: latitud,
            longitud: longitud,
            zoom: zoom
        },
        dataType: "JSON",
        beforeSend: function () {
           
        },
        success: function (respuesta) {
        
    respuesta.ciudades.forEach(function (ciudad) {
    ciudad.index=index;
    ciudades.push=ciudad;
        
        
        
    var ciudad: [



                                        {
                                        "Plaza__c": "Acolman ",
                                        "center": {
                                            "latitude": 19.642061,
                                            "longitude": -98.910737,
                                            "zoom": 15
                                        }
                                    },
                                    {
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
                                            "longitude":    -86.8771666521,
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
                                            "longitude": -110.312753
                            ,
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


                                 ];//arreglo

                            }
    
                 )};
        
    });//ajax
}//funcion



