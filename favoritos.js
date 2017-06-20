var url = "http://api.revimex.mx";
var propiedades = [];
$( document ).ready(function() {
    var x = document.getElementById("#casas");
    var texto = [0,1];
    var cajas = texto.length;
    var y= (cajas) %4;
    var z = (cajas)%3;
    var w = (cajas)%2;
   if(y==0){
                       
                        $(texto).each(function(numeros){
                            $("#casas").append(
           
                        '<div class="col-md-6 como_estas" id="caja_' + numeros + '">' +
                        '<div class="thumbnail" id="img-thumbnail_' + numeros + '">' +
                        '<img class="imagenres" id="image_main_thumbnail_' + numeros + '" alt="' + numeros + ' ' + numeros + '" data-src="http://revimex.mx/' + numeros + '" src="http://revimex.mx/' + numeros + '" >' +

                        '<div class="caption">' +
                        '<center><h4 style="font-size: 17px; opacity: 0; position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%);" id="letrasImagen' + numeros + '"><div id="display_plaza_' + numeros + '"><div style="color: #CFDB00; ">Plaza<br> <span style="color: #FFFFFF">'+ numeros + '</span> </div></div><br><div id="display_colonia_' + numeros + '" style="display: none"><div style="color: #CFDB00; ">Colonia<br> <span style="color: #FFFFFF">' + numeros + ' </span></div></div><div style="color: #CFDB00; ">Precio<br><b> ' +
                        '<span style="color: #FFFFFF">$' + numeros + '</span></center></div></b></h4>' +
                        '<br><div align="center" class="divButton"><button class="estiloBton">Ver más</button></div><br>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                                );
                        });
       
       
       
   }
    else if(z==0){
                            
                       
                        $(texto).each(function(numeros){
                            $("#casas").append(
           
                        '<div class="col-md-6 otro3" id="caja_' + numeros + '">' +
                        '<div class="thumbnail" id="img-thumbnail_' + numeros + '">' +
                        '<img class="imagenres" id="image_main_thumbnail_' + numeros + '" alt="' + numeros + ' ' + numeros + '" data-src="http://revimex.mx/' + numeros + '" src="http://revimex.mx/' + numeros + '" >' +

                        '<div class="caption">' +
                        '<center><h4 style="font-size: 17px; opacity: 0; position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%);" id="letrasImagen' + numeros + '"><div id="display_plaza_' + numeros + '"><div style="color: #CFDB00; ">Plaza<br> <span style="color: #FFFFFF">'+ numeros + '</span> </div></div><br><div id="display_colonia_' + numeros + '" style="display: none"><div style="color: #CFDB00; ">Colonia<br> <span style="color: #FFFFFF">' + numeros + ' </span></div></div><div style="color: #CFDB00; ">Precio<br><b> ' +
                        '<span style="color: #FFFFFF">$' + numeros + '</span></center></div></b></h4>' +
                        '<br><div align="center" class="divButton"><button class="estiloBton">Ver más</button></div><br>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                                );
                        });
       
            
            
            
            
            
            
            
            }
    
    else if(w==0){
            
                        $(texto).each(function(numeros){
                            $("#casas").append(
           
                        '<div class="col-md-6 otro2" id="caja_' + numeros + '">' +
                        '<div class="thumbnail" id="img-thumbnail_' + numeros + '">' +
                        '<img class="imagenres" id="image_main_thumbnail_' + numeros + '" alt="' + numeros + ' ' + numeros + '" data-src="http://revimex.mx/' + numeros + '" src="http://revimex.mx/' + numeros + '" >' +

                        '<div class="caption">' +
                        '<center><h4 style="font-size: 17px; opacity: 0; position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%);" id="letrasImagen' + numeros + '"><div id="display_plaza_' + numeros + '"><div style="color: #CFDB00; ">Plaza<br> <span style="color: #FFFFFF">'+ numeros + '</span> </div></div><br><div id="display_colonia_' + numeros + '" style="display: none"><div style="color: #CFDB00; ">Colonia<br> <span style="color: #FFFFFF">' + numeros + ' </span></div></div><div style="color: #CFDB00; ">Precio<br><b> ' +
                        '<span style="color: #FFFFFF">$' + numeros + '</span></center></div></b></h4>' +
                        '<br><div align="center" class="divButton"><button class="estiloBton">Ver más</button></div><br>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                                );
                        });
       
            
            
            
            
            }
    
    
    
    
    
    
 
});