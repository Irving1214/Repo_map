function boxListeners() {
    var others = Array.from(document.querySelectorAll('*[id^="img-thumbnail"]'));
    others.forEach(function (item) {
        $(item).mouseover(function () {
            var aiDi = $(item).attr('id');
            aiDi = aiDi.split("_");
            hover(aiDi[1]);
            stopOthersMarkers();
            if (map.getZoom() == 17) {
                //anular hover en cercanas
            } else {
                jumping = setInterval(function () {
                    jumpMarker(aiDi[1]);
                }, 1000);
            }
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
            createModal(propiedades[aiDi[1] - 1], aiDi[1]);
            $("#house_cards").hide();
            $("#caja_" + aiDi[1]).hide();

            propiedadesCercanas(aiDi[1]);
            $("#titulocercanas").show();
            getMarker(aiDi[1]);

            $("html, body").animate({ scrollTop: 90 }, "slow");
            slider.setAttribute('disabled', true);
        });
    });
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
    if (map.getZoom() == 17) {
        //anular hover en cercanas
    } else {
        for (var i = 0; i < allMarkers.length; i++) {
            if ("marker" + id == allMarkers[i].id) {
                allMarkers[i].setIcon(markerGreen);
                allMarkers[i].setZIndex(9999999);
                map.panTo(allMarkers[i].getPosition());

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
                allMarkers[i].setZIndex(0);
                infoWindows[i].close();
                $("#markerLayer" + i).css("animation", "none");
                break;
            }
        }
    }
}

function propiedadesCercanas(id) {
    var priceRange = slider.noUiSlider.get();
    var precio_min = priceRange[0];
    precio_min = precio_min.replace(',', '');
    precio_min = precio_min.replace(',', '');
    precio_min = precio_min.replace('.', '');
    precio_min = parseInt(precio_min) / 100;

    var precio_max = priceRange[1];
    precio_max = precio_max.replace(',', '');
    precio_max = precio_max.replace(',', '');
    precio_max = precio_max.replace('.', '');
    precio_max = parseInt(precio_max) / 100;

    if (precio_max == var_max) {
        precio_max = null;
    }

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
            id: propiedad_id,
            min: precio_min,
            max: precio_max
        },
        dataType: "JSON",
        beforeSend: function () {
            $("#wait").show();
        },

        success: function (response) {
            if (response.propiedades.length > 0) {
                showOnlyCercanas(response.propiedades, "cerca");
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
