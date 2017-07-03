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
            $("#titulocercanas").show();
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
            /*
             var casasContainer = $("#casas");
             var casaScroll = $("#img-thumbnail_" + index_id);
             casasContainer.animate({
             scrollTop: casaScroll.offset().top - casasContainer.offset().top + casasContainer.scrollTop()
             }, 'fast', 'linear');*/
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
