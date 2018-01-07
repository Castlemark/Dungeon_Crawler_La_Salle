var token = '844dc4d3-d096-4a5b-b6bf-b6515691cce6';

function descargarPartidaNueva(callback) {
  console.log('Descargando la configuración de partida nueva...');
  $.ajax({
    dataType: 'json',
    method: 'get',
    encoding: 'UTF-8',
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
        swal({
          title: 'Error al cargar nueva partida',
          text: 'Es posible que aún no exista la configuración de partida nueva. Por favor, vuelve a intentarlo.',
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#6aade4',
        });
      },
      default: function(responseText) {
        console.log('ERROR: Es posible que aún no exista la configuración de partida nueva. A continuación se imprime informacion sobre el error:');
        console.log(responseText);
        swal({
          title: 'Error al cargar nueva partida',
          text: 'Es posible que aún no exista la configuración de partida nueva. Por favor, vuelve a intentarlo.',
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#6aade4',
        });
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
        swal({
          title: 'Error al connectar slots',
          text: responseText,
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#6aade4',
        });
      }
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
        swal({
          title: 'Error al cargar la partida',
          text: responseText,
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#6aade4',
        });
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
        //refrescarSlotsGuardarPartida();
      },
      404: function(responseText) {
        console.log('ERROR: Es posible que el slot no esté libre. A continuación se imprime informacion sobre el error:');
        console.log(responseText);
        swal({
          title: 'Error al guardar la partida',
          text: 'Por favor, vuelve a intentarlo.',
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#6aade4',
        });
        refrescarSlotsGuardarPartida();
      }
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
        //refrescarSlotsGuardarPartida();
      },
      404: function(responseText) {
        console.log('ERROR: Es posible que no exista partida guardada en el slot solicitado o que se haya indicado un slot erróneo. A continuación se imprime informacion sobre el error:');
        console.log(responseText);
        swal({
          title: 'Error al vaciar el slot',
          text: 'Por favor, vuelve a intentarlo.',
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#6aade4',
        });
        refrescarSlotsGuardarPartida();
      }
    }
  });
}
