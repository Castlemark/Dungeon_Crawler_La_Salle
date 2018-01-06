function comprobarEnemigo() {
  // Comprobamos si delante tenemos un enemigo (se está viendo un enemigo en el visor)
  if (computeCurrentFront() >= 30 && computeCurrentFront() <= 39) {
    cargarInfoEnemigo();
    mostrarLucha();
  }
  else {
    ocultarLucha();
  }
}

function cargarInfoEnemigo() {
  console.log(partida.enemigos[computeCurrentFront()]);
  var infoEnemigo = partida.enemigos[computeCurrentFront()];
  $('#nombre-enemigo').text(infoEnemigo.nombre);
  $('#vida-actual-enemigo').text(infoEnemigo.atributos.vida);
  $('#vida-maxima-enemigo').text(infoEnemigo.atributos.vida);
  $('#ataque-enemigo').text(infoEnemigo.atributos.ataque);
  $('#defensa-enemigo').text(infoEnemigo.atributos.defensa);
  $('#xp-enemigo').text(infoEnemigo.atributos.xp);
  $('#objetos-enemigo').children().each(function() {
    $(this).tooltip('hide');
    $(this).tooltip('disable');
    $(this).remove();
    console.log($(this));
  });
  for (i = 0; i < infoEnemigo.objetos.length; i++) {
    var infoObjeto = partida.objetos[infoEnemigo.objetos[i]];
    var appended = $('#objetos-enemigo').append('<img id="enemigo-objeto-' + i + '" src="' + imagenPeqObjeto(infoObjeto.id) + '" class="tooltip-element" data-toggle="tooltip" title="' + infoObjeto.nombre + '" alt="' + infoObjeto.nombre + '"/>').tooltip();
    $('#enemigo-objeto-' + i).tooltip();
  }
}

function mostrarLucha() {
  $('#lucha').slideDown();
}

function ocultarLucha() {
  $('#lucha').slideUp();
}

function empezarLucha() {
  $('#controles').slideUp();
  $('#empezarLuchaButton').prop('disabled', true);
  $('#empezarLuchaButton').html('Luchando...');
}

$(document).ready(function() {
  $('#area-cabeza').hover(function() {
    $('#protection-selector').addClass('protection-selector-cabeza');
  }, function() {
    $('#protection-selector').removeClass('protection-selector-cabeza');
  });
  $('#area-torso').hover(function() {
    $('#protection-selector').addClass('protection-selector-torso');
  }, function() {
    $('#protection-selector').removeClass('protection-selector-torso');
  });
  $('#area-piernas').hover(function() {
    $('#protection-selector').addClass('protection-selector-piernas');
  }, function() {
    $('#protection-selector').removeClass('protection-selector-piernas');
  });
});

//llamamos la función cuando muere el jugador
function muerteJugador(){
  swal({
    title: 'Has muerto!',
    confirmButtonText: 'Continuar',
    confirmButtonColor: '#6aade4'
  });
  disableControls = true;
  reiniciarModals();

}
