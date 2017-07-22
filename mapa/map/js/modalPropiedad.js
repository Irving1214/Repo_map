/**
 * Created by maquina81 on 03/07/17.
 */

// Expresion regular para obtener extension de archivo
var re = /(?:\.([^.]+))?$/;

/*
 + Construe el modal para una propiedad
 */
 var mrkrPlace = '';
function createModal(propiedad, index) {
  mrkrPlace = false;
    $("#description-casas").html("");

    var modal_casa = '<div class="col-md-6 hola_description" id="house_description_' + index + '" style="display: block">' +

        '<div class="col-md-12 carr">' +
        '<div id="myCarousel_' + index + '" class="carousel slide" data-ride="carousel">' +
        '<!-- Indicators -->' +
        '<ol class="carousel-indicators">';

    var main_photo = "images/700x420.jpg";
    if (!jQuery.isEmptyObject(propiedad.fotoPrincipal)) {
        main_photo = propiedad.fotoPrincipal;
    }

    if (propiedad.files.length > 0) {
        var ind = 0;
        propiedad.files.forEach(function (file) {
            if (re.exec(file.nombre)[1] != "mp4") {
                if (ind === 0) {
                    modal_casa = modal_casa + '<li data-target="#myCarousel_' + index + '" data-slide-to="0" class="active"></li>';
                } else {
                    modal_casa = modal_casa + '<li data-target="#myCarousel_' + index + '" data-slide-to="' + ind + '"></li>';
                }
                ind += 1;
            }

        });
    } else {
        modal_casa = modal_casa + '<li data-target="#myCarousel_' + index + '" data-slide-to="0" class="active"></li>';
    }


    modal_casa = modal_casa +
        '</ol>' +

        '<!-- CorazÃ³n de Like -->' +
        '<div style="cursor: pointer; position: absolute; z-index: 4; padding-right: : 10px; padding-top: 15px; margin-left: 90%">' +
        '<img height="13%" id="heart_' + index + '" src="images/ICON-PIC-HEART.png" "></i>' +
        '</div>' +

        '<!-- Regreso a Cards -->' +
        '<div style="cursor: pointer; position: absolute; z-index: 4; padding-left: 15px; padding-top: 15px;">' +
        '<img height="13%" id="card_cubes_' + index + '" src="images/ICON-PIC-RETURN.png" "></i>' +
        '</div>' +

        '<!-- Wrapper for slides -->' +
        '<div class="carousel-inner">' +

        '<div class="caption" id="modalFavoritos' + index + '" style="background-color:White;display:none;position:absolute;z-index:3;margin-left: 38%;margin-top:8%; height:200px;width:180px;border-style:solid;border-color:#49BEEF">' +
        '<center>' +
        '<br>' +
        '<button id = "GoToFavorites_' + index + '" class="bg-primary">Ir a favoritos</button>' +
        '<br>' +
        '<br>' +
        '<br>' +
        '<button id = "KeepWhatching_' + index + '" class="bg-primary">Seguir viendo</button>' +
        '</center>' +
        '</div>';

    if (propiedad.files.length > 0) {
        ind = 0;
        propiedad.files.forEach(function (file) {
            if (re.exec(file.nombre)[1] != "mp4") {
                if (ind === 0) {
                    modal_casa = modal_casa +
                        '<div class="item active">' +
                        '<center>' +
                        '<img class="imgt" src="' + file.linkPublico + '" alt="' + file.nombre + '">' +
                        '<center>' +
                        '<div class="carousel-caption">' +
                        '</div>' +
                        '</div>';
                } else {
                    modal_casa = modal_casa +
                        '<div class="item">' +
                        '<center>' +
                        '<img class="imgt" src="' + file.linkPublico + '" alt="' + file.nombre + '">' +
                        '</center>' +
                        '<div class="carousel-caption">' +
                        '</div>' +
                        '</div>';
                }
                ind += 1;


            }
        });
    } else {
        modal_casa = modal_casa +
            '<div class="item active">' +
            '<center>' +

            '<img class="imgt" src="images/700x420.jpg" alt="Imagen no disponible">' +
            '<center>' +
            '<div class="carousel-caption">' +
            '</div>' +
            '</div>';
    }


    modal_casa = modal_casa +
        '</div>' +
        '<!-- Left and right controls -->' +
        '<a class="left carousel-control" href="#myCarousel_' + index + '" data-slide="prev">' +
        '<span class="glyphicon glyphicon-chevron-left"></span>' +
        '<span class="sr-only">Anterior</span>' +
        '</a>' +

        '<a class="right carousel-control" href="#myCarousel_' + index + '" data-slide="next">' +
        '<span class="glyphicon glyphicon-chevron-right"></span>' +
        '<span class="sr-only">Siguiente</span>' +
        '</a>' +
        '</div>' +
        '<center>' +
        '<div class="revimexBlue"><br>' +

        '<i class="capitalize" style="font-size: 120%">' + nombreMunicipio(propiedad.Municipio__c) + propiedad.Estado__c + '<br>' +
        '' + propiedad.Calle__c +
        ', Col. ' + propiedad.Colonia__c + '<br>' +
        '</i>' +
        '</div>' +
        '</center>' +
        '</div>' +

        '<div class="row" align="center">' +
        '<div class="col-md-4 col-md-offset-4 detelle">' +
        '<button class="boton_detalles_auto"  class="btn btn-primary" data-toggle="modal" id="back_to_' + index + '" style="    margin-bottom: 4%;">Regresar</button>' +
        '</div>' +
        '</div>' +

        // INFORMACION CASAS
        '<div class="row revimexBlue">' +
        // Caracteristicas
        '<div class="col-md-6"><br>' +

        '<div class="row">' +
        '<p class="bg-primary" align="center">Características</p>' +
        '<ul><br>' +
        '<li><strong>ID: </strong>' + propiedad.oferta + '</li>' +
        '<li><strong>Precio:</strong> $' + propiedad.PrecioVenta__c + '</li>' +

        '<li><div><strong> Terreno:</strong> ' + propiedad.Terreno_m2__c + '&nbsp;m<sup>2</sup></div>' + '</li>' +
        '<li><strong>Construcción:</strong> ' + propiedad.Construccion_m2__c + '&nbsp;m<sup>2</sup>' + '</li>' +
        '<li><strong>Niveles:</strong> ' + propiedad.Niveles_Plantas__c + '</li>' +

        '<li><strong>Habitaciones: </strong>' + propiedad.N_de_Habitaciones__c + '</li>' +
        '<li><strong>Baños: </strong>' + propiedad.N_de_Ba_os__c + '</li>' +
        '<li><strong>Estacionamientos: </strong> ' + propiedad.Estacionamiento__c + '</li>' +

        '</ul>' +
        '</div>' +

        '<div class="row" align="center">' +
        '<div class="col-md-4">' +

        '</div>' +
        '<div class="col-md-4">' +

        '</div>' +
        '<div class="col-md-4">' +

        '</div>' +
        '</div>' +
        '<br><br>' +
        '</div>' +

        // Lugares Cercanos
        '<div class="col-md-6" align="center"><br>' +
        '<p class="bg-primary">Lugares cercanos</p>' +
        '<br>' +
        '<div class="row" align="center">' +     
        '<div class="col-xs-4 col-md-4">' +
        '<button id="cormercio_' + index + '" class="btn btn-default"><img id="img_cormercio_' + index + '" class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_COMERCIALES-OFF.png"></button><i class="numTarjeta"></i>' +
        '</div>' +
        '<div class="col-xs-4 col-md-4">' +
        '<button id="escuelas_' + index + '" class="btn btn-default"><img id="img_escuelas_' + index + '" class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_ESCUELAS-OFF.png"></button><i class="numTarjeta"></i>' +
        '</div>' +
        '<div class="col-xs-4 col-md-4">' +
        '<button id="super_' + index + '" class="btn btn-default"><img id="img_super_' + index + '" class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_SUPER-OFF.png"></button><i class="numTarjeta"></i>' +
        '</div>' +
        '</div>' +
        
        '</br></br>' +
        
        '<div class="row" align="center">' +
        '<div class="col-xs-4 col-md-4">' +
        '<button id="hospitales_' + index + '" class="btn btn-default"><img id="img_hospitales_' + index + '" class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_HOSPITALES-OFF.png"></button><i class="numTarjeta"></i>' +
        '</div>' +
        '<div class="col-xs-4 col-md-4">' +
        '<button id="restaurantes_' + index + '" class="btn btn-default"><img id="img_restaurantes_' + index + '" class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_RESTAURANTES-OFF.png"></button><i class="numTarjeta"></i>' +
        '</div>' +
        '<div class="col-xs-4 col-md-4">' +
        '<button id="parques_' + index + '" class="btn btn-default"><img id="img_parques_' + index + '" class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_PARQUES-OFF.png"></button><i class="numTarjeta"></i>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="row" align="center">' +
        '<div class="col-md-4 col-md-offset-4 detalle">' +
        '<button class="boton_detalles_auto"  class="btn btn-primary" onclick="modal_variables(\'' +
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

        '\');" data-toggle="modal" data-target="#pdf-modal" >Detalles</button>' +
        '</div>' +
        '</div>' +

        '</br></br>' +

        //SECCION GERENTE
        '<div class="row">' +
        '<div class="col-md-12" style="margin-top: -3%;">' +
        '<p class="bg-primary" align="center">Ejecutivo de Ventas</p>' +
        '<div class="row revimexBlue" style="margin-top: -4%;">' +
        '<br><div id="msg_form"></div>' +
        '<div class="col-md-7" class="res-ventas">' +
            
            '<div class="col-xs-12">' +
                '<p class="ventas-detalle">' +
                    '<b><img id="heart" class="logos-rs" src="images/CONTACT-PROPIEDADES-WEB-MAIL.png">&nbsp; &nbsp;<a href="mailto:info@revimex.mx" style="font-size:.78em; text-transform:lowercase;font-size: 16px;">info@revimex.mx</a></b><br><br>' +
                '</p>' +
            '</div>' +

            '<div class="col-xs-12">' +
                '<p class="ventas-detalle">' +
                    '<b><img id="heart" class="logos-rs" src="images/CONTACT-PROPIEDADES-WEB-PHONE.png">&nbsp; &nbsp;01 800 200 0440</b><br><br>' +
                '</p>' +
            '</div>' +  

            '<div class="col-xs-12" align="center">' +
                '<div class="ventas-detalleII">' +

                    '<div class="col-xs-3" align="center">' +
                        '<b><a target="_blank" href="https://www.facebook.com/REVIMEXOFICIAL/"><img id="facebook" class="logos-rs" src="images/CONTACT-PROPIEDADES-WEB-FACEBOOK.png""></a>' +
                    '</div>' + 

                    '<div class="col-xs-3" align="center">' +
                        '<b><a target="_blank" href="https://www.instagram.com/revimex_oficial/"><img id="instagram" class="logos-rs" src="images/CONTACT-PROPIEDADES-WEB-INSTAGRAM.png""></a>' +
                    '</div>' +

                    '<div class="col-xs-3" align="center">' +
                        '<b><a target="_blank" href="https://twitter.com/oficialrevimex"><img id="twitter" class="logos-rs" src="images/CONTACT-PROPIEDADES-WEB-TWITTER.png""></a>' +
                    '</div>' +

                    '<div class="col-xs-3" align="center">' +
                        '<b><a target="_blank" href="https://www.youtube.com/channel/UCdn2VMwAvrJ_Te9nJqFYHYg/videos"><img id="youtube" class="logos-rs" src="images/CONTACT-PROPIEDADES-WEB-YOUTUBE.png""></a>' +
                    '</div>' +

                '</div>' +
            '</div>' + 

            '<br>' +
        '</div>' +

        '<div class="col-md-5">' +
        '<form id="form_EjecutivoVtas">' +
        '<div class="form-group">' +
        '<br><br>' +
        '<input type="text" class="input_borde" class="form-control" id="form_nombre_' + propiedad.Id + '" placeholder="  Nombre" aria-describedby="sizing-addon2" maxlength="140">' +
        '<br></br>' +
        '<input type="text" class="input_borde" class="form-control" id="form_telefono_' + propiedad.Id + '" placeholder="  Telefono" aria-describedby="sizing-addon2" maxlength="10">' +
        '<br></br>' +
        '<input type="text" class="input_borde" class="form-control" placeholder="  E-mail" id="form_email_' + propiedad.Id + '" aria-describedby="sizing-addon2">' +
        '<br></br></br>' +
        '<textarea class="input_borde" class="form-control" placeholder="  Comentarios" id="form_mensaje_' + propiedad.Id + '" maxlength="900"></textarea><br>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '<br>' +
        '</div>' +
        '</div>' +

        '<div class="row" align="center">' +
        '<div class="col-md-4 col-md-offset-4">' +
        '<button type="button" onclick="sendMail(\'' + propiedad.Id + '\');" class ="boton_detalles_auto" class="btn btn-primary">Enviar</button>' +
        '</div>' +
        '</div>' +

        '</br>';
    $("#description-casas").append(modal_casa);


    // Si ya esta en favoritos le cambia el color del corazón
    isFavorite(propiedad.Id, index);

    modalListeners(index);
}

/*
 * Agrega una coma al nombre del estado
 */
function nombreMunicipio(estado) {
    if (estado == '') {
        return ''
    } else {
        return estado + ', '
    }
}

/*
 * Activa los listeners del modal
 */
function modalListeners(index) {
        $("#card_cubes_" + index + ", #back_to_" + index).click(function () {
            // Sale de la vista de Street maps
            map.getStreetView().setVisible(false);

            // Resetea el slider
            slider.noUiSlider.updateOptions({
                start: [0, 1500000]
            });

            $('#casas').appendTo('#house_cards');
            $("#house_description_" + index).hide();
            $("#house_cards").show();
             restoreMarkers();
            $('#casas_cercanas').hide();
            setDefaulBehaviorMarkers(propiedades);
          
            $("#titulocercanas").hide();
            
            stateCenter(index);
            /*
            if(map.getZoom() == 17){
                stateCenter(index);
            } else {
                reCentrar();
            }
            */

          
            $("#modalFavoritos" + index).hide();

            if (markesrsSerives.length > 0) {
                for (var i = 0; i < markesrsSerives.length; i++) {
                    markesrsSerives[i].setMap(null);
                }
            }

                       
            stopOthersMarkers();
            stopOthersClickedMarkers();
            slider.removeAttribute('disabled');
        });

        $("#heart_" + index).click(function () {
            iLikeIt(index);
        });

        $("#escuelas_" + index).click(function () {
            if (markesrsSerives.length > 0) {
              if (mrkrPlace == 1) {
                  clearServicesAndReCenter(index);
              } else {
                clearServicesAndReCenter(index);
                getMarkersPlace(index, 1);
                changeButtonColor(this.id, index);
              }
            } else {
              changeButtonColor(this.id, index);
              getMarkersPlace(index, 1);
            }
        });

        $("#restaurantes_" + index).click(function () {
            if (markesrsSerives.length > 0) {
              if (mrkrPlace == 2) {
                  clearServicesAndReCenter(index);
              } else {
                clearServicesAndReCenter(index);
                getMarkersPlace(index, 2);
                changeButtonColor(this.id, index);
              }
            } else {
              changeButtonColor(this.id, index);
              getMarkersPlace(index, 2);
            }
        });

    //barrido

        $("#hospitales_" + index).click(function () {
            if (markesrsSerives.length > 0) {
              if (mrkrPlace == 5) {
                  clearServicesAndReCenter(index);
              } else {
                clearServicesAndReCenter(index);
                getMarkersPlace(index, 5);
                changeButtonColor(this.id, index);
              }
            } else {
              changeButtonColor(this.id, index);
              getMarkersPlace(index, 5);
            }
        });

        $("#cormercio_" + index).click(function () {
            if (markesrsSerives.length > 0) {
              if (mrkrPlace == 6) {
                  clearServicesAndReCenter(index);
              } else {
                clearServicesAndReCenter(index);
                getMarkersPlace(index, 6);
                changeButtonColor(this.id, index);
              }
            } else {
              changeButtonColor(this.id, index);
              getMarkersPlace(index, 6);
            }
        });

        $("#parques_" + index).click(function () {
            if (markesrsSerives.length > 0) {
              if (mrkrPlace == 7) {
                  clearServicesAndReCenter(index);
              } else {
                clearServicesAndReCenter(index);
                getMarkersPlace(index, 7);
                changeButtonColor(this.id, index);
              }
            } else {
                changeButtonColor(this.id, index);
                getMarkersPlace(index, 7);
            }
        });

        $("#super_" + index).click(function () {
            if (markesrsSerives.length > 0) {
              if (mrkrPlace == 8) {
                  clearServicesAndReCenter(index);
              } else {
                clearServicesAndReCenter(index);
                getMarkersPlace(index, 8);
                changeButtonColor(this.id, index);
              }
            } else {
                changeButtonColor(this.id, index);
                getMarkersPlace(index, 8);
            }
        });

        $("#GoToFavorites_" + index).click(function () {
            window.location.href = 'favoritos.html';
        });

        $("#KeepWhatching_" + index).click(function () {
            $("#modalFavoritos" + index).hide();
        });
}

function clearServicesAndReCenter(id) {
    offAllButtons(id); // Devuelve los botones a su color original

    for (var i = 0; i < markesrsSerives.length; i++) {
        markesrsSerives[i].setMap(null);
    }

    markesrsSerives = [];

    for (i = 0; i < allMarkers.length; i++) {
        var ij = "marker" + id;

        if (ij == allMarkers[i].id) {
            map.setZoom(17);
            map.setCenter(allMarkers[i].getPosition());
        }
    }
}

function offAllButtons(index) {
    $("#img_restaurantes_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_RESTAURANTES-OFF.png");
    $("#img_escuelas_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_ESCUELAS-OFF.png");
    $("#img_hospitales_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_HOSPITALES-OFF.png");
    $("#img_cormercio_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_COMERCIALES-OFF.png");
    $("#img_super_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_SUPER-OFF.png");
    $("#img_parques_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_PARQUES-OFF.png");
}

function changeButtonColor(id, index) {
    if ("restaurantes_" + index == id) {
        $("#img_restaurantes_" + index).attr("src", "images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_RESTAURANTES-ON.png");
    } else {
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

function modal_variables(calle, colonia, municipio, estado, terreno, constru, habitaciones, banos, patios, estacionamientos, precio, imagen, folio) {
    $("#pdf-modal").html("");
    // si el valor de folio es null -> el campo debe de estar vacÃ¬o s
    if (folio == 'null') {
        folio = '';
    }
    $("#pdf-modal").append('<div class="modal-dialog-detalles">' +
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
}
