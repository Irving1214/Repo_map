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
        source: function (request, response) {
            if (map.getZoom() >= 10) {
              getColoniasSalesForce(response);
            } else {
              getCiudadesSalesForce(response);
            }
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

            console.log(ui);
            moveMap(ui.item.lat, ui.item.lng);

            return false;
        }
    });
});

function getCiudadesSalesForce(response) {
    $.ajax({
        type: 'POST',
        post: 'autoSearch',
        url: url + "/propiedades/ciudades",
        data: {
            search: $("#pac-input").val()
        },
        dataType: "JSON",
        success: function (data) {
            response($.map(data.ciudades, function (el) {
                return {
                    label: el.Plaza__c,
                    value: el.center.Plaza__c,
                    lat: el.center.latitude,
                    lng: el.center.longitude
                };
            }));
        }
    });
}

function getColoniasSalesForce(response) {
  $.ajax({
      type: 'POST',
      post: 'autoSearch',
      url: url + "/propiedades/colonias",
      data: {
          search: $("#pac-input").val()
      },
      dataType: "JSON",
      success: function (data) {
          response($.map(data.colonias, function (el) {
              return {
                  label: el.Colonia__c,
                  value: el.center.Colonia__c,
                  lat: el.center.latitude,
                  lng: el.center.longitude
              };
          }));
      }
  });
}

function moveMap(lat, lng) {
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
            map.setZoom(11);

            showPropiedadesBySearch(results[0]);
        }
    });
}
