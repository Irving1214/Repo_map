var url = "http://api.revimex.mx";
var propiedades = [];
var click = false;
var request = window.indexedDB.open("favoritos", 2);
var db;
var propiedadesStorage = [];
var eliminar = true;
var serverRequest = "";

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
    $("#enviarPropiedades, #enviarPropiedades_xs").click(function () {
        sendToUser();
    });

    /*
     * Recibe el email del usuario
     */
    $("#enviar").click(function () {
        event.preventDefault();
        // limpia seccion de error
        $("#error").fadeIn(1000, function () {
            $("#error").html("");
        });
        // si campo esta vacío
        if (!$("#email").val()) {
            $("#error").fadeIn(1000, function () {
                $("#error").html('<div class="alert alert-warning"> &nbsp; Ingresa tu email</div>');
            });
        } else { // si no esta vacìo
            if (!isCorreoValido($("#email").val())) { // si formato de email no es correcto
                $("#email").val('');
                $("#error").fadeIn(1000, function () {
                    $("#error").html('<div class="alert alert-warning"> &nbsp; Escribe tu email correctamente</div>');
                });
            } else { // si es correcto
                email = $("#email").val();
                telefono = null;
                $("#modalEmail").modal('toggle');
            }
        }
    });

    /*
     * Recibe el número de teléfono
     */
    $("#enviarTelefono").click(function () {
        var msjError = '';
        event.preventDefault();
        // limpia seccion de error
        $("#errorTel").fadeIn(1000, function () {
            $("#errorTel").html("");
        });

        if (!$("#tels").val() || !$("#lada").val() ) { // si ambos campos vacios
            if (!$("#tels").val()) {
                msjError += '&nbsp;<span>*Escriba su telefono</span><br>';
            }
            if (!$("#lada").val()) {
                msjError += '&nbsp;<span>*Escriba su lada</span><br>';
            }
        } else { // si no estan vacios
            $("#errorTel").fadeIn(1000, function () {
                $("#errorTel").html("");
            });
            if ( !isTelValido($("#tels").val()) || !isLadaValida($("#lada").val()) ) { // si uno de los campos no es valido
                if (!isTelValido($("#tels").val()) ) { // si el formato del telefono no es valido
                    $("#tels").val('');
                    msjError += '&nbsp;<span>*Escriba su telefono correctamente (sólo 10 números)</span><br>';
                }
                if (!isLadaValida($("#lada").val()) ) { // si el formato del telefono no es valido
                    $("#lada").val('');
                    msjError += '&nbsp;<span>*Escriba su lada correctamente (sólo 2 números)</span><br>';
                }
            } else { // si todos son validos
                telefono = $("#tels").val();
                lada = $("#lada").val();
                email = null;
                $("#modalTel").modal('toggle');
            }
        }
        $("#errorTel").fadeIn(1000, function () {
            $("#errorTel").html('<div class="alert alert-warning"> &nbsp;' + msjError + '</div>');
        });
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
    $("#deleteButton, #deleteButton_xs").click(function () {
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
        $("#deleteButton, #deleteButton_xs").html("Terminar");
    } else {
        deleteListeners(false);
        boxes.forEach(function (item) {
            $(item).removeClass("red");
        });
        $("#deleteButton, #deleteButton_xs").html("Eliminar");
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
        $('#enviarPropiedades, #enviarPropiedades_xs').prop('disabled', false);
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

                '<button class="boton-detalles" onclick="modal_variables(\'' +
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

                '\');">Detalles</button>'+
                '</div>'+
                '</div>'+
                '</div>'
            );

            index = index + 1;

            boxListeners();
        });
    } else {
        $('#enviarPropiedades, #enviarPropiedades_xs').prop('disabled', true);
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

/*
 * Envia las propuedades por sms al número del usuario
 */
function sendToSMS() {
    $.ajax({
        url: url + "/favoritos/msg",
        type: "POST",
        data: serverRequest,
        dataType: "JSON",
        beforeSend: function () {
            $("#wait").show();
        },
        success: function (respuesta) {
            if (respuesta.status == 1) {
                notificaction(respuesta.mensaje, "success");
            } else {
                notificaction(respuesta.mensaje, "warning");
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

/*
 * Envia las propuedades por sms al teléfonodel usuario
 */
function sendToEmail() {
    $.ajax({
        url: url + "/favoritos/email",
        type: "POST",
        data: serverRequest,
        dataType: "JSON",
        beforeSend: function () {
            $("#wait").show();
        },
        success: function (respuesta) {
            if (respuesta.status == 1) {
                notificaction(respuesta.mensaje, "success");
            } else {
                notificaction(respuesta.mensaje, "warning");
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


/*
 * Envía los datos al email o número de teléfono del usuario
 * Crear un arreglo con la información de favoritos del usuario
 */
function sendToUser() {
    var sendToMail = true;
    // Lo envia por email
    if (telefono && !email) {
        sendToMail = false;
        serverRequest = 'lada=+' + lada + '&number=' + telefono;
    }

    // Lo envia por email
    if (email && !telefono) {
        serverRequest = 'email=' + email;
    }

    var request = db.transaction(["propiedades"], "readwrite").objectStore("propiedades").getAll();
    request.onsuccess = function (event) {
        request.result.forEach(function (result) {
            serverRequest = serverRequest + '&propiedades[]=' + result.propiedad.Id;
        });

        if (sendToMail) {
            sendToEmail();
        } else {
            sendToSMS();
        }
    };
}

/*
 * Envia una notiificación al usuario
 */
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
    var pdfModal = $("#pdf-modal");
    pdfModal.html("");
    // si el valor de folio es null -> el campo debe de estar vacÃ¬o s
    if (folio == 'null') {
        folio = '';
    }
    pdfModal.append('<div class="modal-dialog-detalles">' +
'<div class="modal-content-detalles">' +
                '<div class="modal-body">' +

                '<div id="pdf" class="div">' +

                    '<div class="row">' +
                        '<div class="col-xs-12 col-md-7" style="padding: 0px 0px;">' +
                            '<div class="row azulRevimex" align="center">' +
                                '<img  class="revimexImagen" src="images/revimex-logo.png">' +
                            '</div>' +

                            '<div class="row arenaRevimex" align="center">' +
                                '<div class="separador"></div>' +
                                    '<span class="titulo" style="margin-top: 80px;">Detalles</span>' +
                                '<div class="separador"></div>' +
                            '</div>' +
                        '</div>' +

                        '<div class="col-xs-12 col-md-5" style="padding: 0px 0px;">' +
                            '<div class="col-xs-6 col-md-12 arenaRevimex mod-resp" align="center">' +
                                '<span class="titulo-contacto">Contacto: 01 800 200 04440</span>' +
                            '</div>' +

                            '<div class="col-xs-6 col-md-12 arenaClara mod-resp" align="center">' +
                                '<div class="separador"></div>' +
                                    '<span class="titulo-resp">' + folio + '</span>' +
                                '<div class="separador"></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +

                    '<div class="separador"></div>' +

                    '<div class="row">' +
                        '<div class="col-xs-12 col-md-7">' +
                            '<img class="imagen-modal-detalles" src="' + imagen + '">' +
                        '</div>' +

                        '<div class="col-xs-12 col-md-5" style="padding: 0px 0px;">' +
                            '<div class="row arenaClara">' +
                                '<br>' +
                                '<p class="direccion" align="center">' +
                                'Calle: '      + calle +
                                ' Colonia: '   + colonia +
                                ' Municipio: ' + municipio +
                                ' Estado: '    + estado +
                                '</p>' +
                            '</div>' +

                            '<div class="row highlight">' +
                                '<div class="separador"></div>' +
                                '<div class="col-xs-2 col-md-2">' +
                                    '<img class="casitaImagen" src="images/icono-casa-modal.png">' +
                                    '<div class="separador"></div>' +
                                '</div>' +

                                '<div class="col-md-9 style="padding: 0px 0px;"" align="center">' +
                                    '<div class="separador"></div>' +
                                    '<p class="descripcion">Descripción de propiedad</p>' +
                                '</div>' +
                            '</div>' +

                            '<div class="separador"></div>' +

                            '<div class="row">' +
                                '<div class="col-xs-1 col-md-2 style="padding: 0px 0px;""></div>' +
                                '<div class="col-xs-10 col-md-8 style="padding: 0px 0px;"">' +
                                    '<div class="row">' +
                                        '<div class="col-xs-2 col-md-2" style="padding: 0px 0px;">' +
                                            '<img class="sm-icon" src="images/iconoModal/terreno.png">' +
                                        '</div>' +
                                        '<div class="col-xs-10 col-md-10 verdeRevimex" style="padding: 0px 0px;">' +
                                            '<p class="des-propiedad"> Terreno: '+ terreno + ' m<sup>2</sup></p>' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="separador"></div>' +

                                    '<div class="row">' +
                                        '<div class="col-xs-2 col-md-2" style="padding: 0px 0px;">' +
                                            '<img class="sm-icon" src="images/iconoModal/construccion.png">' +
                                        '</div>' +
                                        '<div class="col-xs-10 col-md-10 verdeRevimex" style="padding: 0px 0px;">' +
                                        '   <p class="des-propiedad"> Construcción: ' + constru + ' m<sup>2</sup></p>' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="separador"></div>' +

                                    '<div class="row">' +
                                        '<div class="col-xs-2 col-md-2" style="padding: 0px 0px;">' +
                                            '<img class="sm-icon" src="images/iconoModal/habitaciones.png">' +
                                        '</div>' +
                                        '<div class="col-xs-10 col-md-10 verdeRevimex" style="padding: 0px 0px;">' +
                                            '<p class="des-propiedad">Habitaciones: ' + habitaciones + '</p>' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="separador"></div>' +
                    
                                    '<div class="row">' +
                                        '<div class="col-xs-2 col-md-2" style="padding: 0px 0px;">' +
                                            '<img class="sm-icon" src="images/iconoModal/banios.png">' +
                                        '</div>' +
                                        '<div class="col-xs-10 col-md-10 verdeRevimex" style="padding: 0px 0px;">' +
                                            '<p class="des-propiedad">Baños: ' + banos + '</p>' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="separador"></div>' +

                                    '<div class="row">' +
                                        '<div class="col-xs-2 col-md-2" style="padding: 0px 0px;">' +
                                            '<img class="sm-icon" src="images/iconoModal/patio.png">' +
                                        '</div>' +
                                        '<div class="col-xs-10 col-md-10 verdeRevimex" style="padding: 0px 0px;">' +
                                            '<p class="des-propiedad">Patios: ' + patios + '</p>' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="separador"></div>' +

                                    '<div class="row">' +
                                        '<div class="col-xs-2 col-md-2" style="padding: 0px 0px;">' +
                                            '<img class="sm-icon" src="images/iconoModal/estacionamiento.png">' +
                                        '</div>' +
                                        '<div class="col-xs-10 col-md-10 verdeRevimex" style="padding: 0px 0px;">' +
                                            '<p class="des-propiedad">Estacionamientos: ' + estacionamientos + '</p>' +
                                        '</div>' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="col-md-2" style="padding: 0px 0px;"></div>' +
                                '</div>' +

                                '<div class="separador"></div>' +
                                
                                '<div class="row arenaClara">' +
                                    '<p class="precio" align="center">' +
                                    '$ ' + precio +
                                    '</p>' +
                                '</div>' +
                            '</div>' +

                        '<div class="col-md-12 divButton" align="center">' +
                            '<button class="estiloBton-detalles"  class="btn btn-primary" data-toggle="modal" data-target="#pdf-modal" >Cerrar</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>');

    pdfModal.modal().toggle();
}

// validaciones
function isCorreoValido(email){
    var caract = new RegExp(/^([a-zA-Z0-9\._-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    if (caract.test(email) == false){
        return false;
    } else {
      return true;
    }
}

function isTelValido(telefono){
    var caract = new RegExp(/^([0-9]{10,10})+$/);
    if (caract.test(telefono) == false){
        return false;
    } else {
      return true;
    }
}

function isLadaValida(lada){
    var caract = new RegExp(/^([0-9]{1,2})+$/);
    if (caract.test(lada) == false){
        return false;
    } else {
      return true;
    }
}
