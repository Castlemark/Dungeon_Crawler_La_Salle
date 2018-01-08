var token = '844dc4d3-d096-4a5b-b6bf-b6515691cce6';

function descargarPartidaNueva(callback) {
  console.log('Descargando la configuración de partida nueva...');
  $.ajax({
    dataType: 'json',
    method: 'get',
    encoding: 'UTF-8',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token + '&slot=nueva',
    success: function(json) {
      console.log('Descargada la configuración de partida nueva.');
      console.log(json);
      // Ahora que ya tenemos la información podemos inicializar la variable global de la partida
      partida = json;
      callback();
    },
    error: function(responseText) {
      console.log('ERROR: Es posible que aún no exista la configuración de partida nueva. A continuación se imprime informacion sobre el error:');
      console.log(responseText);
      swal({
        title: 'Error al cargar nueva partida',
        text: 'Es posible que aún no exista la configuración de partida nueva o que no tengas conexión con el servidor. Por favor, vuelve a intentarlo.',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#6aade4',
      });
      volverModalNuevaPartida();
    }
  });
}

function descargarInfoSlots(callback) {
  console.log('Descargando la información de los slots...');
  $.ajax({
    dataType: 'json',
    method: 'get',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token,
    success: function(json) {
      console.log('Descargada la información de los slots.');
      console.log(json);
      callback(json);
    },
    error: function(responseText) {
      console.log('ERROR: Es posible el token sea incorrecto. A continuación se imprime informacion sobre el error:');
      console.log(responseText);
      swal({
        title: 'Error al cargar los slots',
        text: 'Es posible que no tengas conexión con el servidor. Por favor, vuelve a intentarlo.',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#6aade4',
      });
      // Hacemos que el modal se pueda cerrar
      loadGameModalDisableClose = false;
      $('#loadGameModalClose').fadeTo('fast', 1);
      // Hacemos que el modal se pueda cerrar
      saveGameModalDisableClose = false;
      $('#saveGameModalClose').fadeTo('fast', 1);
    }
  });
}

function descargarPartida(slot, callback) {
  console.log('Descargando la configuración de partida existente...');
  $.ajax({
    dataType: 'json',
    method: 'get',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token + '&slot=' + slot,
    success: function(json) {
      console.log('Descargada la configuración de partida existente.');
      console.log(json);
      // Ahora que ya tenemos la información podemos guardarla en la variable global de la partida
      partida = json;

      callback();
    },
    error: function(responseText) {
      console.log('ERROR: Es posible que el slot solicitado esté vacío. A continuación se imprime informacion sobre el error:');
      console.log(responseText);
      swal({
        title: 'Error al cargar la partida',
        text: 'Es posible que no tengas conexión con el servidor. Por favor, vuelve a intentarlo.',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#6aade4',
      });
      // Hacemos que el modal se pueda cerrar
      loadGameModalDisableClose = false;
      $('#loadGameModalClose').fadeTo('fast', 1);
    }
  });
}

function guardarPartida(slot, callback) {
  console.log('Guardando partida en slot...');
  $.ajax({
    dataType: 'text',
    method: 'post',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token + '&slot=' + slot,
    data: {json: JSON.stringify(partida)},
    success: function(json) {
      console.log('Partida guardada en el slot.');
      callback();
      //refrescarSlotsGuardarPartida();
    },
    error: function(responseText) {
      console.log('ERROR: Es posible que el slot no esté libre. A continuación se imprime informacion sobre el error:');
      console.log(responseText);
      swal({
        title: 'Error al guardar la partida',
        text: 'Es posible que no tengas conexión con el servidor. Por favor, vuelve a intentarlo.',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#6aade4',
      });
      refrescarSlotsGuardarPartida();
      // Hacemos que el modal se pueda cerrar
      saveGameModalDisableClose = false;
      $('#saveGameModalClose').fadeTo('fast', 1);
    }
  });
}

function vaciarSlot(slot, callback) {
  console.log('Vaciando slot...');
  $.ajax({
    dataType: 'text',
    method: 'delete',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token + '&slot=' + slot,
    success: function(json) {
      console.log('Slot vaciado.');
      callback();
      //refrescarSlotsGuardarPartida();
    },
    error: function(responseText) {
      console.log('ERROR: Es posible que no exista partida guardada en el slot solicitado o que se haya indicado un slot erróneo. A continuación se imprime informacion sobre el error:');
      console.log(responseText);
      swal({
        title: 'Error al vaciar el slot',
        text: 'Es posible que no tengas conexión con el servidor. Por favor, vuelve a intentarlo.',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#6aade4',
      });
      refrescarSlotsGuardarPartida();
      // Hacemos que el modal se pueda cerrar
      saveGameModalDisableClose = false;
      $('#saveGameModalClose').fadeTo('fast', 1);
    }
  });
}
