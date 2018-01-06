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
  $('#progress-bar-vida-enemigo').css('width', '100%');
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
  $('#empezarLuchaButton').off();
  // Miramos el estado de la lucha
  // Si no es turno de nadie significa que la lucha no ha empezado aún
  if (partida.jugador.lucha.turnoJugador == null) {
    $('#empezarLuchaButton').html('¡Empezar lucha!');
    $('#empezarLuchaButton').click(function() {
      empezarLucha();
    });
  }
  else {
    // Es el turno de alguien. Miramos de quién
    // Si es el turno del jugador
    if (partida.jugador.lucha.turnoJugador) {
      $('#empezarLuchaButton').html('Siguiente turno (contra enemigo)');
    }
    else {
      $('#empezarLuchaButton').html('Siguiente turno (contra jugador)');
    }
    // Es el turno de alguien, por lo que el botón iniciará el turno directamente (ya comprobará de quien es turno la función "luchar()")
    $('#empezarLuchaButton').click(function() {
      luchar();
    });
  }
  $('#lucha').slideDown();
  $('#mensaje-lucha').show();
}

function ocultarLucha() {
  $('#lucha').slideUp();
  $('#controles').slideDown();
}

function empezarLucha() {
  // Obtenemos la información del enemigo
  infoEnemigo = partida.enemigos[computeCurrentFront()];
  // Informamos de que la lucha ha empezado
  partida.jugador.lucha.activa = true;
  // El turno inicial es del jugador
  partida.jugador.lucha.turnoJugador = true;
  // Guardamos la vida máxima como vida actual del enemigo
  partida.jugador.lucha.vidaEnemigo = infoEnemigo.atributos.vida;
  // Ocultamos los controles e indicamos que estamos luchando
  disableControls = true;
  $('#controles').slideUp();
  luchar();
}

function luchar() {
  // Si es el turno del jugador
  if (partida.jugador.lucha.turnoJugador) {
    lucharContraEnemigo();
  }
  else {
    lucharContraJugador();
  }
}

function lucharContraEnemigo() {
  // Obtenemos la información del enemigo
  infoEnemigo = partida.enemigos[computeCurrentFront()];
  // Indicamos que estamos luchando
  $('#empezarLuchaButton').prop('disabled', true);
  $('#empezarLuchaButton').off();
  $('#empezarLuchaButton').html('Luchando...');
  // Operamos para comprobar si el jugador puede afectar al enemigo
  var ataqueJugador = getAtaque();
  var defensaEnemigo = infoEnemigo.atributos.defensa;
  if (ataqueJugador > defensaEnemigo) {
    // Calculamos la vida que hay que restar al enemigo
    var resta = ataqueJugador - defensaEnemigo;
    messageToConsole('¡Tu ataque ha superado la defensa del enemigo! ¡Se ha restado ' + resta + ' a la vida del enemigo!');

    var enemigoMuerto = reducirVidaEnemigo(resta);
    $('#vida-actual-enemigo').html(partida.jugador.lucha.vidaEnemigo);

    var porcentaje = (partida.jugador.lucha.vidaEnemigo * 1.0)/(infoEnemigo.atributos.vida * 1.0) * 100.0;
    $('#progress-bar-vida-enemigo').css('width', Math.round(porcentaje) + '%');

    if (enemigoMuerto) {
      // El enemigo ha muerto
      partida.jugador.numEnemigosMuertos++;
      // Pasamos los xp al jugador
      var xpTransferidos = infoEnemigo.atributos.xp;
      sumXp(infoEnemigo.atributos.xp);
      // Pasamos los objetos al jugador
      recogerObjetos(infoEnemigo.objetos);
      // Mostramos el mensaje en la consola
      messageToConsole('¡El enemigo ha muerto! Contando la muerte de este enemigo, has matado a un total de ' + partida.jugador.numEnemigosMuertos + '. ¡Puedes seguir avanzando! Se te han transferido los xp del enemigo (' + xpTransferidos + ') y sus objetos.');
      disableControls = false;
      ocultarLucha();
      // Guardamos que ya no es turno de nadie
      partida.jugador.lucha.turnoJugador = null;
      // Guardamos que la lucha ha terminado
      partida.jugador.lucha.activa = false;
      // Mostramos al enemigo triste porque ha muerto
      mostrarEnemigoTriste();
      // Quitamos al enemigo del mapa. Ponemos suelo (11)
      var frontCoords = computeCurrentFrontCoords();
      partida.mapas[partida.jugador.posicion.mapa].distribucion[frontCoords[0]][frontCoords[1]] = 11;
    }
    else {
      // El enemigo sigue vivo
      messageToConsole('El enemigo no ha muerto aún... ¡Sigue atacando en los próximos turnos!');
      $('#empezarLuchaButton').html('Siguiente turno (contra jugador)');

      // Guardamos de quien es el turno, que a continuación será del enemigo (luchar contra jugador)
      partida.jugador.lucha.turnoJugador = false;
      $('#empezarLuchaButton').click(function() {
        lucharContraJugador();
      });
    }
  }
  else {
    messageToConsole('Tu ataque no ha superado la defensa del enemigo, por lo que no se ha restado vida al enemigo...');
    $('#empezarLuchaButton').html('Siguiente turno (contra jugador)');

    // Guardamos de quien es el turno, que a continuación será del enemigo (luchar contra jugador)
    partida.jugador.lucha.turnoJugador = false;
    $('#empezarLuchaButton').click(function() {
      lucharContraJugador();
    });
  }

  $('#empezarLuchaButton').prop('disabled', false);
}

// Función que reduce la vida del enemigo según la cantidad especificada y devuelve true si ha muerto
function reducirVidaEnemigo(cantidad) {
  partida.jugador.lucha.vidaEnemigo -= cantidad;
  if (partida.jugador.lucha.vidaEnemigo <= 0) {
    // El enemigo ha muerto
    return true;
  }
  else {
    // El enemigo sigue vivo
    return false;
  }
}

function lucharContraJugador() {
  // Obtenemos la información del enemigo
  infoEnemigo = partida.enemigos[computeCurrentFront()];
  // Indicamos que estamos luchando
  $('#empezarLuchaButton').prop('disabled', true);
  $('#empezarLuchaButton').off();
  $('#empezarLuchaButton').html('Luchando...');
  // Operamos para comprobar si el enemigo puede afectar al jugador
  var ataqueEnemigo = infoEnemigo.atributos.ataque;
  var defensaJugador = getDefensa();
  if (ataqueEnemigo > defensaJugador) {
    // Calculamos la vida que hay que restar al jugador
    var resta = ataqueEnemigo - defensaJugador;
    messageToConsole('¡El ataque del enemigo ha superado tu defensa! Se ha restado ' + resta + ' a tu vida.');

    var jugadorMuerto = reducirVidaJugador(resta);
    // Actualizamos visualmente la vida del jugador
    mostrarInformacion();

    if (jugadorMuerto) {
      // El jugador ha muerto
      disableControls = false;
      messageToConsole('¡Has muerto! El juego ha acabado.');
      ocultarLucha();
      // Guardamos que ya no es turno de nadie
      partida.jugador.lucha.turnoJugador = null;
      // Mostramos al enemigo contento porque el jugador ha muerto
      mostrarEnemigoContento();
      // Terminamos el juego
      muerteJugador();
    }
    else {
      // El jugador sigue vivo
      messageToConsole('¡Sigues vivo aún! ¡Sigue atacando en los próximos turnos!');
      $('#empezarLuchaButton').html('Siguiente turno (contra enemigo)');

      // Guardamos de quien es el turno, que a continuación será del jugador (luchar contra enemigo)
      partida.jugador.lucha.turnoJugador = true;
      $('#empezarLuchaButton').click(function() {
        lucharContraEnemigo();
      });
    }
  }
  else {
    messageToConsole('El ataque del enemigo no ha superado tu defensa, por lo que no se te ha restado vida.');
    $('#empezarLuchaButton').html('Siguiente turno (contra enemigo)');

    // Guardamos de quien es el turno, que a continuación será del jugador (luchar contra enemigo)
    partida.jugador.lucha.turnoJugador = true;
    $('#empezarLuchaButton').click(function() {
      lucharContraEnemigo();
    });
  }

  $('#empezarLuchaButton').prop('disabled', false);
}

// Función que reduce la vida del jugador según la cantidad especificada y devuelve true si ha muerto
function reducirVidaJugador(cantidad) {
  partida.jugador.vida -= cantidad;
  if (partida.jugador.vida <= 0) {
    // El jugador ha muerto
    return true;
  }
  else {
    // El jugador sigue vivo
    return false;
  }
}

function mostrarEnemigoTriste() {
  var path = getImgOf(computeCurrentFront()).replace('standing', 'sad');
  // Consigue el canvas
  var canvas = document.getElementById('visor');
  var context = canvas.getContext('2d');
  var base_image = new Image();
  base_image.src = "./media/images"+path;
  base_image.onload = function () {
    // Pinta imagen en el canvas
    context.drawImage(this, 0, 0);
  }
}

function mostrarEnemigoContento() {
  var path = getImgOf(computeCurrentFront()).replace('standing', 'happy');
  // Consigue el canvas
  var canvas = document.getElementById('visor');
  var context = canvas.getContext('2d');
  var base_image = new Image();
  base_image.src = "./media/images"+path;
  base_image.onload = function () {
    // Pinta imagen en el canvas
    context.drawImage(this, 0, 0);
  }
}

function muerteJugador() {
  alert('Has muerto');
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
    imageUrl: 'media/images/GameOver.gif',
    confirmButtonText: 'Continuar',
    confirmButtonColor: '#6aade4'
  });
  disableControls = true;
  reiniciarModals();
}
