var token = '844dc4d3-d096-4a5b-b6bf-b6515691cce6';

var newGameModalDisableClose = false;
var loadGameModalDisableClose = false;
var saveGameModalDisableClose = false;

/* Inicializar la partida */
var partida = {};
partida.mapa = mapa;
partida.enemigos = [];
partida.objetos = objetos;
partida.jugador = player;

function iniciarJuego() {
  /* TODO */
  //preparar objetos de la partida
  partida.objetos = {};

  //mostramos la imagen de inicio en el visor
  pintaImagen('first-frame.png', 0, 0);

  //inicializamos los tooltips
  $('.tooltip-element').tooltip();

  //mostramos el mensaje de bienvenida por Consola
  messageToConsole("Bienvenido a LaSalle Dungeon! Seleccione 'Nueva Partida' o 'Cargar Partida' para empezar a jugar");
}

/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  /* TODO */
}

function descargarPartidaNueva(callback) {
  console.log('Descargando la configuración de partida nueva...');
  $.ajax({
    dataType: 'json',
    method: 'get',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token + '&slot=nueva',
    statusCode: {
      200: function(json) {
        console.log('Descargada la configuración de partida nueva.');
        console.log(json);
        // Ahora que ya tenemos la información podemos inicializar la variable global de la partida
        partida = json;
        callback();
      },
      404: function(responseText) {
        console.log('ERROR: Es posible que aún no exista la configuración de partida nueva. A continuación se imprime informacion sobre el error:');
        console.log(responseText);
      }
    }
  });
}

function descargarInfoSlots(callback) {
  console.log('Descargando la información de los slots...');
  $.ajax({
    dataType: 'json',
    method: 'get',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token,
    statusCode: {
      200: function(json) {
        console.log('Descargada la información de los slots.');
        console.log(json);
        callback(json);
      },
      404: function(responseText) {
        console.log('ERROR: Es posible el token sea incorrecto. A continuación se imprime informacion sobre el error:');
        console.log(responseText);
      }
    }
  });
}

//Abre el modal #newGameForm con la configuración para iniciar una nueva partida
function modalNuevaPartida() {
  $('#name').prop('value', '');
  $('#avatarId').prop('value', 0);
  $('.avatar_selected').removeClass('avatar_selected');
  $('#iniciarPartidaButton').prop('hidden', false);
  $('#newGameModal-info').prop('hidden', false);
  $('#cambiarInfoButton').prop('hidden', true);
  $('#newGameModalLabel').html('NUEVA PARTIDA');
  $('#newGameModal').modal('show');
  $('#newGameModal').on('hide.bs.modal', function(e) {
    if (newGameModalDisableClose) {
      e.preventDefault();
    }
   });
}

function modalCargarPartida() {
  // En primer lugar "desatamos" (unbind) los eventos de click de los botones
  $('#slot1-load').off();
  $('#slot2-load').off();
  // Mostramos el modal
  $('#loadGameModal').modal('show');
  $('#loadGameModal').on('hide.bs.modal', function(e) {
    if (loadGameModalDisableClose) {
      e.preventDefault();
    }
   });
   descargarInfoSlots(function(json) {
     // Slot 1
     if ($.inArray('1', json) > -1) {
       // Slot 1 tiene una partida guardada
       $('#slot1-load').removeClass('disabled');
       $('#slot1-load').removeClass('btn-secondary');
       $('#slot1-load').addClass('btn-salle');
       $('#slot1-load').text('Slot 1: partida guardada (click para cargar)');
       $('#slot1-load').click(function() {
         // En primer lugar "desatamos" (unbind) el evento de click de este botón
         $(this).off();
         // Hacemos que el modal no se pueda cerrar
         loadGameModalDisableClose = true;
         $('#loadGameModalClose').fadeTo('fast', 0);
         // Avisamos de que estamos descargando la partida
         $(this).text('Descargando partida de slot 1...');
         descargarPartida('1', function() {
           // Partida descargada
           // Hacemos que el modal se pueda cerrar
           loadGameModalDisableClose = false;
           $('#loadGameModalClose').fadeTo('fast', 1);
           // Refrescamos la info de la UI
           refrescarInfoJugador();
           mostrarMenusPartida();
           // Cerramos el modal
           $('#loadGameModal').modal('hide');
         });
       });
     }
     else {
       // Slot 1 está vacío
       $('#slot1-load').text('Slot 1: vacío');
     }

     // Slot 2
     if ($.inArray('2', json) > -1) {
       // Slot 2 tiene una partida guardada
       $('#slot2-load').removeClass('disabled');
       $('#slot2-load').removeClass('btn-secondary');
       $('#slot2-load').addClass('btn-salle');
       $('#slot2-load').text('Slot 2: partida guardada (click para cargar)');
       $('#slot2-load').click(function() {
         // En primer lugar "desatamos" (unbind) el evento de click de este botón
         $(this).off();
         // Hacemos que el modal no se pueda cerrar
         loadGameModalDisableClose = true;
         $('#loadGameModalClose').fadeTo('fast', 0);
         // Avisamos de que estamos descargando la partida
         $(this).text('Descargando partida de slot 2...');
         descargarPartida('2', function() {
           // Partida descargada
           // Hacemos que el modal se pueda cerrar
           loadGameModalDisableClose = false;
           $('#loadGameModalClose').fadeTo('fast', 1);
           // Refrescamos la info de la UI
           refrescarInfoJugador();
           mostrarMenusPartida();
           // Cerramos el modal
           $('#loadGameModal').modal('hide');
         });
       });
     }
     else {
       // Slot 2 está vacío
       $('#slot2-load').text('Slot 2: vacío');
     }
   });
}

function descargarPartida(slot, callback) {
  console.log('Descargando la configuración de partida existente...');
  $.ajax({
    dataType: 'json',
    method: 'get',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token + '&slot=' + slot,
    statusCode: {
      200: function(json) {
        console.log('Descargada la configuración de partida existente.');
        console.log(json);
        // Ahora que ya tenemos la información podemos guardarla en la variable global de la partida
        partida = json;
        callback();
      },
      404: function(responseText) {
        console.log('ERROR: Es posible que el slot solicitado esté vacío. A continuación se imprime informacion sobre el error:');
        console.log(responseText);
      }
    }
  });
}

//Abre el modal #newGameModal con la configuración para cambiar la info
function modalCambiarInfo() {
  $('#name').prop('value', partida.jugador.nombre);
  $('#avatarId').prop('value', partida.jugador.avatar);
  $('.avatar_selected').removeClass('avatar_selected');
  $('#avatar_' + partida.jugador.avatar).addClass('avatar_selected');
  $('#newGameModal-info').show();
  $('#newGameForm').show();
  $('#iniciarPartidaButton').css('opacity', 1);
  $('#newGameModal-info-downloading').hide();
  $('#iniciarPartidaButton').prop('hidden', true);
  $('#cambiarInfoButton').prop('hidden', false);
  $('#newGameModal-info').prop('hidden', true);
  $('#newGameModalLabel').html('EDITAR INFORMACIÓN PARTIDA');
  $('#newGameModal').modal('show');
}

//Remarca el avatar selecionado en el modal
function selectAvatar(id) {
  $('#avatarId').prop('value', id);
  $('.avatar_selected').removeClass('avatar_selected');
  $('#avatar_' + id).addClass('avatar_selected');
}

//función que se llama al iniciar partida en el modal
function iniciarPartida() {
  if ($('#name').val() != '' && $('#avatarId').val() != 0) {
    // Hacemos que el modal no se pueda cerrar
    newGameModalDisableClose = true;
    $('#newGameModalClose').fadeTo('fast', 0);
    // Avisamos al usuario de que estamos descargando la configuración de partida nueva
    $('#newGameModal-info').slideUp();
    $('#newGameForm').slideUp();
    $('#iniciarPartidaButton').fadeTo('fast', 0);
    $('#newGameModal-info-downloading').slideDown();
    // Realizamos la petición para descargar la configuración de partida nueva
    descargarPartidaNueva(function() {
      partida.jugador.nombre = $('#name').val();
      partida.jugador.avatar = $('#avatarId').val();
      refrescarInfoJugador();
      mostrarMenusPartida();
      // Hacemos que el modal se pueda cerrar
      newGameModalDisableClose = false;
      $('#newGameModalClose').fadeTo('fast', 1);
      // Cerramos el modal
      $('#newGameModal').modal('hide');
      messageToConsole('Bienvenid@ ' + partida.jugador.nombre + '! ¿List@ para enfrentarte a los peligros de LaSalle?');
    });
  }
}

//función que se llama al guardar cambios del jugador en el modal
function cambiarInfoJugador() {
  if($('#name').val() != '' && $('#avatarId').val() != 0){
    partida.jugador.nombre = $('#name').val();
    partida.jugador.avatar = $('#avatarId').val();
    refrescarInfoJugador();
    $('#newGameModal').modal('hide');
  }
}

function refrescarInfoJugador() {
  $('header .player-name').html(partida.jugador.nombre);
  $('header .avatar').prop('src', 'media/images/avatar' + partida.jugador.avatar + '.png');
}

function mostrarMenusPartida() {
  $('#menu-nuevaPartida').prop('hidden', true);
  $('#menu-cargarPartida').prop('hidden', true);
  $('#menu-jugador').prop('hidden', false);
  $('#menu-guardarPartida').prop('hidden', false);
  $('#menu-salir').prop('hidden', false);
}

//Funcion que va añadiendo mensajes a la consola y que usa la librería moment.js para poner la hora
function messageToConsole(msg) {
  var now = new moment();
  $('#console-text').prepend('[' + now.format("HH:mm:ss") + '] ' + msg + '<br>');
}

function modalGuardarPartida() {
  // En primer lugar "desatamos" (unbind) los eventos de click de los botones
  $('#slot1-save').off();
  $('#slot2-save').off();
  // Mostramos el modal
  $('#saveGameModal').modal('show');
  $('#saveGameModal').on('hide.bs.modal', function(e) {
    if (saveGameModalDisableClose) {
      e.preventDefault();
    }
   });
   descargarInfoSlots(function(json) {
     // Slot 1
     if ($.inArray('1', json) > -1) {
       // Slot 1 está ocupado
       $('#slot1-save').removeClass('disabled');
       $('#slot1-save').removeClass('btn-secondary');
       $('#slot1-save').addClass('btn-danger');
       $('#slot1-save').text('Slot 1: ocupado (click para vaciar)');
       $('#slot1-save').click(function() {
         // En primer lugar "desatamos" (unbind) el evento de click de este botón
         $(this).off();
         // Hacemos que el modal no se pueda cerrar
         saveGameModalDisableClose = true;
         $('#saveGameModalClose').fadeTo('fast', 0);
         // Avisamos de que estamos vaciando el slot
         $(this).text('Vaciando el slot 1...');
         vaciarSlot('1', function() {
           // Slot vaciado
           // Hacemos que el modal se pueda cerrar
           saveGameModalDisableClose = false;
           $('#saveGameModalClose').fadeTo('fast', 1);
           // Avisamos de que el slot se ha vaciado correctamente
           $('#slot1-save').removeClass('btn-danger');
           $('#slot1-save').addClass('btn-success');
           $('#slot1-save').text('Slot 1: libre (click para guardar partida)');
         });
       });
     }
     else {
       // Slot 1 está libre
       $('#slot1-save').removeClass('disabled');
       $('#slot1-save').removeClass('btn-secondary');
       $('#slot1-save').addClass('btn-success');
       $('#slot1-save').text('Slot 1: libre (click para guardar partida)');
       $('#slot1-save').click(function() {
         // En primer lugar "desatamos" (unbind) el evento de click de este botón
         $(this).off();
         // Hacemos que el modal no se pueda cerrar
         saveGameModalDisableClose = true;
         $('#saveGameModalClose').fadeTo('fast', 0);
         // Avisamos de que estamos guardando la partida en el slot
         $(this).text('Guardando la partida en el slot 1...');
         guardarPartida('1', function() {
           // Partida guardada en el slot
           // Hacemos que el modal se pueda cerrar
           saveGameModalDisableClose = false;
           $('#saveGameModalClose').fadeTo('fast', 1);
           // Avisamos de que la partida se ha guardado en el slot correctamente
           $('#slot1-save').removeClass('btn-success');
           $('#slot1-save').addClass('btn-salle');
           $('#slot1-save').text('Partida guardada en el slot 1');
         });
       });
     }

     // Slot 2
     if ($.inArray('2', json) > -1) {
       // Slot 2 está ocupado
       $('#slot2-save').removeClass('disabled');
       $('#slot2-save').removeClass('btn-secondary');
       $('#slot2-save').addClass('btn-danger');
       $('#slot2-save').text('Slot 2: ocupado (click para vaciar)');
       $('#slot2-save').click(function() {
         // En primer lugar "desatamos" (unbind) el evento de click de este botón
         $(this).off();
         // Hacemos que el modal no se pueda cerrar
         saveGameModalDisableClose = true;
         $('#saveGameModalClose').fadeTo('fast', 0);
         // Avisamos de que estamos vaciando el slot
         $(this).text('Vaciando el slot 2...');
         vaciarSlot('2', function() {
           // Slot vaciado
           // Hacemos que el modal se pueda cerrar
           saveGameModalDisableClose = false;
           $('#saveGameModalClose').fadeTo('fast', 1);
           // Avisamos de que el slot se ha vaciado correctamente
           $('#slot2-save').removeClass('btn-danger');
           $('#slot2-save').addClass('btn-success');
           $('#slot2-save').text('Slot 2: libre (click para guardar partida)');
         });
       });
     }
     else {
       // Slot 2 está libre
       $('#slot2-save').removeClass('disabled');
       $('#slot2-save').removeClass('btn-secondary');
       $('#slot2-save').addClass('btn-success');
       $('#slot2-save').text('Slot 2: libre (click para guardar partida)');
       $('#slot2-save').click(function() {
         // En primer lugar "desatamos" (unbind) el evento de click de este botón
         $(this).off();
         // Hacemos que el modal no se pueda cerrar
         saveGameModalDisableClose = true;
         $('#saveGameModalClose').fadeTo('fast', 0);
         // Avisamos de que estamos guardando la partida en el slot
         $(this).text('Guardando la partida en el slot 2...');
         guardarPartida('2', function() {
           // Partida guardada en el slot
           // Hacemos que el modal se pueda cerrar
           saveGameModalDisableClose = false;
           $('#saveGameModalClose').fadeTo('fast', 1);
           // Avisamos de que la partida se ha guardado en el slot correctamente
           $('#slot2-save').removeClass('btn-success');
           $('#slot2-save').addClass('btn-salle');
           $('#slot2-save').text('Partida guardada en el slot 2');
         });
       });
     }
   });
}

function vaciarSlot(slot, callback) {
  console.log('Vaciando slot...');
  $.ajax({
    dataType: 'json',
    method: 'delete',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token + '&slot=' + slot,
    statusCode: {
      202: function() {
        console.log('Slot vaciado.');
        callback();
      },
      404: function(responseText) {
        console.log('ERROR: Es posible que no exista partida guardada en el slot solicitado o que se haya indicado un slot erróneo. A continuación se imprime informacion sobre el error:');
        console.log(responseText);
      }
    }
  });
}

function guardarPartida(slot, callback) {
  console.log('Guardando partida en slot...');
  $.ajax({
    dataType: 'json',
    method: 'post',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token + '&slot=' + slot,
    data: {json: JSON.stringify(partida)},
    statusCode: {
      200: function() {
        console.log('Partida guardada en el slot.');
        callback();
      },
      404: function(responseText) {
        console.log('ERROR: Es posible que el slot no esté libre. A continuación se imprime informacion sobre el error:');
        console.log(responseText);
      }
    }
  });
}
