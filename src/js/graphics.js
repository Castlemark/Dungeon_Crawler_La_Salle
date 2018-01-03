//Remarca el avatar selecionado en el modal
function selectAvatar(id) {
  $('#avatarId').prop('value', id);
  $('.avatar_selected').removeClass('avatar_selected');
  $('#avatar_' + id).addClass('avatar_selected');
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
  $('#console-text').prepend($('#first-console-text').html());
  $('#first-console-text').html('[' + now.format("HH:mm:ss") + '] ' + msg + '<br>');
}

//función que al llamarla actualiza las barras de xp, ataque, defensa y vida
function mostrarInformacion(){
  var nextLevelP = 20;
  var distPoints = 20;
  while(nextLevelP < partida.jugador.experiencia){
    nextLevelP += distPoints + 10;
    distPoints += 10;
  }

  $('#progress-bar-xp').attr('aria-valuemax', nextLevelP).attr('aria-valuenow', partida.jugador.experiencia).css('width', partida.jugador.experiencia/$('#progress-bar-xp').attr('aria-valuemax') *100 + '%');
  $('#label-xp').html(partida.jugador.experiencia + '/' + $('#progress-bar-xp').attr('aria-valuemax') + ' (Nivel ' + getNivel(partida.jugador.experiencia) + ')');
  $('#progress-bar-ataque').attr('aria-valuenow', partida.jugador.ataque).css('width', partida.jugador.ataque/$('#progress-bar-ataque').attr('aria-valuemax') *100 + '%');
  $('#label-ataque').html(partida.jugador.ataque + '/' + $('#progress-bar-ataque').attr('aria-valuemax'));
  $('#progress-bar-defensa').attr('aria-valuenow', partida.jugador.defensa).css('width', partida.jugador.defensa/$('#progress-bar-defensa').attr('aria-valuemax') *100 + '%');
  $('#label-defensa').html(partida.jugador.defensa + '/' + $('#progress-bar-defensa').attr('aria-valuemax'));
  $('#progress-bar-vida').attr('aria-valuenow', partida.jugador.vida).css('width', partida.jugador.vida/$('#progress-bar-vida').attr('aria-valuemax') *100 + '%');
  $('#label-vida').html(partida.jugador.vida + '/' + $('#progress-bar-vida').attr('aria-valuemax'));
}
