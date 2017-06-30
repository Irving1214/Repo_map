var url = "http://api.revimex.mx";
var propiedades = [];
var favoritos = ["a00i000000V7P3fAAF", "a00i000000V7PA3AAN",  "a00i000000V7P4VAAV"]; // carga las ids de la BD
var click = false;

    $(document).ready(function () {
        $("#modalEmail").modal({backdrop: 'static', keyboard: false}).show();
    });

  load_favoritos(null, null);

  function nombreMunicipio(estado) {
      if (estado == '') {
          return ''
      } else {
          return estado + ', '
      }
  }

  function load_favoritos(latitud, longitud) {
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
                  respuesta.propiedades.forEach(function (propiedad) {
                    for (var i = 0; i < favoritos.length; i++) {
                        if (favoritos[i] == propiedad.Id) {
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

                      var re = /(?:\.([^.]+))?$/;

                      $("#casas").append(
                          '<div class="col-md-6 como_estas" id="caja_' + index + '">' +
                          '<div class="thumbnail" id="img-thumbnail_' + index + '">' +
                          '<img class="imagenres" id="image_main_thumbnail_' + index + '" alt="' + propiedad.PrecioVenta__c + ' ' + propiedad.Estado__c + '" data-src="' + main_photo + '" src="' + main_photo + '" >' +

                          '<div class="caption">' +
                          '<center><h4 style="font-size: 17px; opacity: 0; position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%);" id="letrasImagen' + index + '"><div id="display_plaza_' + index + '"><div style="color: #CFDB00; ">Plaza<br> <span style="color: #FFFFFF">' + propiedad.Plaza__c + '</span> </div></div><div id="display_colonia_' + index + '" style="display: none"><div style="color: #CFDB00; ">Colonia<br> <span style="color: #FFFFFF">' + propiedad.Colonia__c + ' </span></div></div><div style="color: #CFDB00; ">Precio<br><b> ' +
                          '<span style="color: #FFFFFF">$' + propiedad.PrecioVenta__c + '</span></center></div></b></h4>' +
                          '<br><div align="center" class="divButton"><button class="estiloBton">Ver más</button></div><br>' +
                          '</div>' +
                          '</div>' +
                          '</div>');

                      var modal_casa = '<div class="col-md-6 hola_description" id="house_description_' + index + '" style="display: none">' +

                          '<div class="col-md-12">' +
                          '<div id="myCarousel_' + index + '" class="carousel slide" data-ride="carousel">' +

                          '<!-- Indicators -->' +
                          '<ol class="carousel-indicators">';

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

                          '<!-- Regreso a Cards -->' +
                          '<div style="position: absolute; z-index: 4; padding-left: 15px; padding-top: 15px;">' +
                          '<img height="13%" id="card_cubes_' + index + '" src="../../images/ICON-PIC-RETURN.png" "></i>' +
                          '</div>' +

                          '<!-- Wrapper for slides -->' +
                          '<div class="carousel-inner">';

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

                              '<img class="imgt" src="../../images/700x420.jpg" alt="Imagen no disponible">' +
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

                          '<i class="capitalize">' + nombreMunicipio(propiedad.Municipio__c) + propiedad.Estado__c + '<br>' +
                          '' + propiedad.Calle__c +
                          ', Col. ' + propiedad.Colonia__c + '<br>' +

                          '</div>' +
                          '</center>' +
                          '</div>' +

                          '<div class="row" align="center">' +
                          '<div class="col-md-4 col-md-offset-4 detelle">' +
                          '<button class="boton_detalles_auto"  class="btn btn-primary" data-toggle="modal" id="card_cubes_' + index + '" style="    margin-bottom: 4%;">Regresar</button>' +
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
                          '<div class="col-md-4">' +
                          '<button id="restaurantes_' + index +'" class="btn btn-default"><img class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_RESTAURANTES-OFF.png"></button><i class="numTarjeta"></i>' +
                          '</div>' +

                          '<div class="col-md-4">' +
                          '<button id="escuelas_' + index +'" class="btn btn-default"><img class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_ESCUELAS-OFF.png"></button><i class="numTarjeta"></i>' +
                          '</div>' +

                          '<div class="col-md-4">' +
                          '<button id="hospitales_' + index +'" class="btn btn-default"><img class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_HOSPITALES-OFF.png"></button><i class="numTarjeta"></i>' +
                          '</div>' +
                          '</div>' +
                          '</br></br>' +
                          '<div class="row" align="center">' +
                          '<div class="col-md-4">' +
                          '<button id="cormercio_' + index +'" class="btn btn-default"><img class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_COMERCIALES-OFF.png"></button><i class="numTarjeta"></i>' +
                          '</div>' +

                          '<div class="col-md-4">' +
                          '<button id="super_' + index +'" class="btn btn-default"><img class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_SUPER-OFF.png"></button><i class="numTarjeta"></i>' +
                          '</div>' +

                          '<div class="col-md-4">' +
                          '<button id="parques_' + index +'" class="btn btn-default"><img class="img_borde" class="IconTarjeta" src="images/IconoTarjetaDinamica/ICONS-PROPIEDADES-WEB_PARQUES-OFF.png"></button><i class="numTarjeta"></i>' +
                          '</div>' +
                          '</div>' +
                          '</div>' +
                          '</div>' +

                          '<div class="row" align="center">' +
                          '<div class="col-md-4 col-md-offset-4 detelle" style="margin-top: -4%;">' +
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
                          '<div class="col-md-7" style="padding-left: 0%;">' +
                          '<p  style="font-size: 15px; margin-top:13%;">' +


                          '<b><img id="heart" class="logos" src="images/CONTACT-PROPIEDADES-WEB-MAIL.png">&nbsp; &nbsp;<a href="mailto:info@revimex.mx" style="font-size:.78em; text-transform:lowercase;font-size: 16px;">info@revimex.mx</a></b><br><br>' +

                          '<b><img id="heart" class="logos" src="images/CONTACT-PROPIEDADES-WEB-PHONE.png">&nbsp; &nbsp;01 800 200 0440</b><br><br>' +

                          '<b><img id="facebook" class="logos redes_sociales" src="images/CONTACT-PROPIEDADES-WEB-FACEBOOK.png"">' +

                          '<b><img id="instagram" class="logos redes_sociales" src="images/CONTACT-PROPIEDADES-WEB-INSTAGRAM.png"">' +

                          '<b><img id="twitter" class="logos redes_sociales" src="images/CONTACT-PROPIEDADES-WEB-TWITTER.png"">' +

                          '<b><img id="youtube" class="logos redes_sociales" src="images/CONTACT-PROPIEDADES-WEB-YOUTUBE.png"">' +


                          '<br>' +

                          '</p>' +
                          '</div>' +

                          '<div class="col-md-5">' +
                          '<form>' +
                          '<div class="form-group">' +
                          '<br><br>' +
                          '<input type="text" class="input_borde" class="form-control" id="form_nombre_' + propiedad.Id + '" placeholder="  Nombre" aria-describedby="sizing-addon2">' +
                          '<br></br>' +
                          '<input type="text" class="input_borde" class="form-control" id="form_telefono_' + propiedad.Id + '" placeholder="  Telefono" aria-describedby="sizing-addon2">' +
                          '<br></br>' +
                          '<input type="text" class="input_borde" class="form-control" placeholder="  E-mail" id="form_email_' + propiedad.Id + '" aria-describedby="sizing-addon2">' +
                          '<br></br></br>' +
                          '<textarea class="input_borde" class="form-control" placeholder="  Comentarios" id="form_mensaje_' + propiedad.Id + '"></textarea><br>' +
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
                    }
                  }

                      index = index + 1;

                  });

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

  function boxListeners() {
      var others = Array.from(document.querySelectorAll('*[id^="img-thumbnail"]'));
      others.forEach(function (item) {
          $(item).mouseover(function () {
              var aiDi = $(item).attr('id');
              aiDi = aiDi.split("_");
              hover(aiDi[1]);
          });

          $(item).mouseout(function () {
              var aiDi = $(item).attr('id');
              aiDi = aiDi.split("_");
              out(aiDi[1]);

          });

          $(item).click(function () {
              var aiDi = $(item).attr('id');
              aiDi = aiDi.split("_");
              $("#house_description_" + aiDi[1]).show();
              $("#house_cards").hide();

          });
      });

      others = Array.from(document.querySelectorAll('*[id^="card_cubes_"]'));
      others.forEach(function (item) {
          $(item).click(function () {
              var aiDi = $(item).attr('id');
              aiDi = aiDi.split("_");
              $("#house_cards").show();
              $("#house_description_" + aiDi[2]).hide();
          });
      });

      others = Array.from(document.querySelectorAll('*[id^="heart_"]'));
      others.forEach(function (item) {
          $(item).click(function () {
              var aiDi = $(item).attr('id');
              aiDi = aiDi.split("_");

              iLikeIt(aiDi[1]);
          });
      });

      others = Array.from(document.querySelectorAll('*[id^="escuelas_"]'));
      others.forEach(function (item) {
          $(item).click(function () {
              var aiDi = $(item).attr('id');
              aiDi = aiDi.split("_");

          });
      });

      others = Array.from(document.querySelectorAll('*[id^="restaurantes_"]'));
      others.forEach(function (item) {
          $(item).click(function () {
              var aiDi = $(item).attr('id');
              aiDi = aiDi.split("_");

          });
      });

      others = Array.from(document.querySelectorAll('*[id^="hospitales_"]'));
      others.forEach(function (item) {
          $(item).click(function () {
              var aiDi = $(item).attr('id');
              aiDi = aiDi.split("_");

          });
      });

      others = Array.from(document.querySelectorAll('*[id^="cormercio_"]'));
      others.forEach(function (item) {
          $(item).click(function () {
              var aiDi = $(item).attr('id');
              aiDi = aiDi.split("_");

          });
      });

      others = Array.from(document.querySelectorAll('*[id^="parques_"]'));
      others.forEach(function (item) {
          $(item).click(function () {
              var aiDi = $(item).attr('id');
              aiDi = aiDi.split("_");


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
