var url = "http://api.revimex.mx";
var propiedades = [];
var click = false;
var request = window.indexedDB.open("favoritos", 2);
var db;
var propiedadesStorage = [];
var eliminar = true;

/*
 * Instancia de la BD
 */
request.onerror = function (event) {
    console.log("Error opening DB", event);
};

request.onupgradeneeded = function (event) {
    console.log("Upgrading");
    db = event.target.result;
    var objectStore = db.createObjectStore("propiedades", {keyPath: "id"});
};

request.onsuccess = function (event) {
    console.log("Success opening DB");
    db = event.target.result;

    var transaction = db.transaction(["propiedades"], "readwrite");
    transaction.oncomplete = function (event) {
        console.log("Success");
    };

    transaction.onerror = function (event) {
        console.log("Error");
    };

    var request = db.transaction(["propiedades"], "readwrite").objectStore("propiedades").getAll();
    request.onsuccess = function (event) {
        request.result.forEach(function (result) {
            propiedadesStorage.push(result.propiedad);
        });

        load_favoritos();
    };
};

$(document).ready(function () {
    /*
     * Muestra el modal de correo
     */
    $("#modalEmail").modal({backdrop: 'static', keyboard: false}).show();

    /*
     * Envía las propiedades al email
     */
    $("#enviarPropiedades").click(function () {
        //sendByEmail();
    });

    /*
     * Recibe el email del usuario
     */
    $("#enviar").click(function () {
        event.preventDefault();
        $("#error").fadeIn(1000, function () {
            $("#error").html("");
        });

        if (!$("#email").val()) {
            $("#error").fadeIn(1000, function () {
                $("#error").html('<div class="alert alert-warning"> &nbsp; Ingresa tu email</div>');
            });
        } else {
            email = $("#email").val();
            $("#modalEmail").modal('toggle');
        }
    });

    /*
     * Recibe el número de teléfono
     */
    $("#enviarTelefono").click(function () {
        event.preventDefault();
        $("#errorTel").fadeIn(1000, function () {
            $("#errorTel").html("");
        });

        if (!$("#tels").val() || !$("#lada").val() ) {
            if (!$("#tels").val()) {
                $("#errorTel").fadeIn(1000, function () {
                    $("#errorTel").html('<div class="alert alert-warning"> &nbsp; Ingresa tu número de teléfono</div>');
                });
            } else {
                $("#errorTel").fadeIn(1000, function () {
                    $("#errorTel").html('<div class="alert alert-warning"> &nbsp; Ingresa tu lada</div>');
                });
            }
        } else {
            telefono = $("#tels").val();
            $("#modalTel").modal('toggle');
        }
    });

    /*
     * Abre el modal del número de teléfono
     */
    $("#openPhoneModal").click(function () {
        $("#modalEmail").modal('toggle');
        $("#modalTel").modal({backdrop: 'static', keyboard: false}).show();
    });

    /*
     * On close session click
     */
    $("#closeSession, #closeSession_xs").click(function () {
        closeSession();
    });

    /*
     * Click en eliminar
     */
    $("#deleteButton").click(function () {
        markToDelete();
    });
});

/*
 * Pone un borde en rojo a todas las propiedades para poder eliminarlas
 */
function markToDelete() {
    var boxes = Array.from(document.querySelectorAll('*[id^="img-thumbnail_"]'));

    if (eliminar) {
        deleteListeners(true);
        boxes.forEach(function (item) {
            $(item).addClass("red");
        });
        $("#deleteButton").html("Terminar");
    } else {
        deleteListeners(false);
        boxes.forEach(function (item) {
            $(item).removeClass("red");
        });
        $("#deleteButton").html("Eliminar");
    }

    eliminar = !eliminar;
}

/*
 * Activa/Desactiva los listeners cuanndo se da click en el botón de eliminar
 */
function deleteListeners(activate) {
    if (activate) {
        var others = Array.from(document.querySelectorAll('*[id^="caja_"]'));
        others.forEach(function (item) {
            var id = $(item).attr('id');
            id = id.split("_");

            $(item).off('mouseover');
            $(item).off('mouseout');
            $(item).on('click', function() {
                deleteOnClick(id[1]);
            });
        });
    } else {
        boxListeners();
    }
}

/*
 * Remueve una propiedad de mi lista de favoritos y de la base de datos
 */
function deleteOnClick(id) {
    var box = $("#caja_" + id);

    var request = db.transaction(["propiedades"], "readwrite").objectStore("propiedades").delete(box.attr('data-id'));
    request.onsuccess = function (event) {
        box.remove();
    };
}

/*
 * Cierra sesión y borra la lista de favoritos
 */
function closeSession() {
    var request = db.transaction(["propiedades"], "readwrite").objectStore("propiedades").clear();
    request.onsuccess = function (event) {
        window.location.href = 'mapas2.html';
    };
}

/*
 * Muestra los favoritos en la BD
 */
function load_favoritos() {
    var index = 1;
    if (propiedadesStorage.length > 0) {
        $('#enviarPropiedades').prop('disabled', false);
        $("#casas").html("");
        $("#description-casas").html("");

        propiedadesStorage.forEach(function (propiedad) {
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

            $("#casas").append(
                '<div class="col-xs-12 col-sm-4 col-md-3" id="caja_' + index + '" align="center" data-id="' + propiedad.Id + '">'+
                '<div class="box" id="img-thumbnail_' + index + '">'+
                '<div class="thumbnail-fav">'+
                '<img class="imagenres2" id="image_main_thumbnail_' + index + '" alt="' + propiedad.PrecioVenta__c + ' ' + propiedad.Estado__c + '" data-src="' + main_photo + '" src="' + main_photo + '" >' +

                '<div class="caption">' +
                '<center><h4 style="font-size: 17px; opacity: 0; position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%);" id="letrasImagen' + index + '"><div id="display_plaza_' + index + '"><div style="color: #CFDB00; ">Plaza<br> <span style="color: #FFFFFF">' + propiedad.Plaza__c + '</span> </div></div><div id="display_colonia_' + index + '" style="display: none"><div style="color: #CFDB00; ">Colonia<br> <span style="color: #FFFFFF">' + propiedad.Colonia__c + ' </span></div></div><div style="color: #CFDB00; ">Precio<br><b> ' +
                '<span style="color: #FFFFFF">$' + propiedad.PrecioVenta__c + '</span></center></div></b></h4>' +
                '</div>' +

                '<button class="boton-detalles">Detalles</button>'+
                '</div>'+
                '</div>'+
                '</div>'
            );

            index = index + 1;

            boxListeners();
        });
    } else {
        $('#enviarPropiedades').prop('disabled', true);
    }
}

/*
 * Listeners básicos
 */
function boxListeners() {
    var others = Array.from(document.querySelectorAll('*[id^="caja_"]'));
    others.forEach(function (item) {
        $(item).on('mouseover', function () {
            var aiDi = $(item).attr('id');
            aiDi = aiDi.split("_");
            hover(aiDi[1]);
        });

        $(item).on('mouseout', function () {
            var aiDi = $(item).attr('id');
            aiDi = aiDi.split("_");
            out(aiDi[1]);
        });


        $(item).off('click');
    });
}

function hover(id) {
    $("#img-thumbnail_" + id).addClass("yellow");

    $("#image_main_thumbnail_" + id).css({
        "filter": "brightness(0.30)"
    });

    $("#letrasImagen" + id).css({
        "opacity": "1",
        "color": "#fff",
        "posistion": "relative",
        "z-index": "532"
    });
}

function out(id) {
    $("#img-thumbnail_" + id).removeClass("yellow");

    $("#image_main_thumbnail_" + id).css({
        "filter": ""
    });

    $("#letrasImagen" + id).css({
        "opacity": "0",
        "position": "absolute",
        "top": "30%",
        "left": "50%",
        "transform": "translate(-50%, -50%)"
    });

}
