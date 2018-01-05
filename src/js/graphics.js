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

  var ataqueIzq = 0;
  var defensaIzq = 0;
  if(partida.jugador.manos.izq != null){
    ataqueIzq = partida.jugador.manos.izq.atributos.ataque;
    defensaIzq = partida.jugador.manos.izq.atributos.defensa;
  }

  var ataqueDer = 0;
  var defensaDer = 0;
  if(partida.jugador.manos.der != null){
    ataqueIzq = partida.jugador.manos.der.atributos.ataque;
    defensaIzq = partida.jugador.manos.der.atributos.defensa;
  }

  $('#progress-bar-ataque').html(partida.jugador.ataque + " + " + ataqueIzq + " + " + ataqueDer);
  $('#label-ataque').html(getAtaque());
  $('#progress-bar-defensa').html(partida.jugador.defensa + " + " + defensaIzq + " + " + defensaDer);
  $('#label-defensa').html(getDefensa());

  $('#progress-bar-vida').css('width', partida.jugador.vida/getMaxVidas(partida.jugador.nivel) *100 + '%');
  $('#label-vida').html(partida.jugador.vida + '/' + getMaxVidas(partida.jugador.nivel));
}
