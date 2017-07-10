/**
 * Created by @HackeaMesta on 10/07/17.
 */

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
