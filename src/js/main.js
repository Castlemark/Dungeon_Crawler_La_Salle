var token = '844dc4d3-d096-4a5b-b6bf-b6515691cce6';

/* Inicializar el juego */
var enemigos = [];

function iniciarJuego() {
  /* TODO */
  //preparar objetos del juego
  objetos = {};

  //mostramos la imagen de inicio en el visor
  pintaImagen('first-frame.png', 0, 0);

  //inicializamos los tooltips
  $('.tooltip-element').tooltip();
}


//listener de nueva partida
function nuevaPartidaListener (){
  var json = JSON.parse(this.responseText).items;
  partidaNueva(json);
}

//variable ajax para llamar a nueva partida
var ajaxNuevaPartida = {
    request: function (url){
        var xhr = new XMLHttpRequest();
	       xhr.addEventListener("load", nuevaPartidaListener);
        xhr.open("GET", url, true);
        xhr.send();
    }
};


/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  /* TODO */
}

function partidaNueva() {
  console.log('Descargando la configuración de partida nueva...');
  $.ajax({
    dataType: 'json',
    method: 'get',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token + '&slot=nueva',
    statusCode: {
      200: function(json) {
        console.log('Descargada la configuración de partida nueva.');
        console.log(json);
        // Ahora que ya tenemos la información podemos inicializar las variables globales del juego
        mapa = json.Mapa;
        for (var i = 0; i < json.Enemics.length; i++) {
          enemigo = json.Enemics[i].atributs;
          enemigos[json.Enemics[i].nom] = enemigo;
        }
        objetos = json.Objectes;
      },
      404: function(responseText) {
        console.log('ERROR: Ha ocurrido un error. Es posible que aún no exista la configuración de partida nueva. A continuación se imprime informacion sobre el error:');
        console.log(responseText);
      }
    }
  });
}

//Abre el modal #nameAvatarForm con la configuración para iniciar una nueva partida
function modalNuevaPartida(){
  $('#name').prop('value', '');
  $('#avatarId').prop('value', 0);
  $('.avatar_selected').removeClass('avatar_selected');
  $('#iniciarPartidaButton').prop('hidden', false);
  $('#modal-info').prop('hidden', false);
  $('#cambiarInfoButton').prop('hidden', true);
  $('#avatarNameModalLabel').html('NUEVA PARTIDA');
  $('#avatarNameModal').modal('show');
}

//Abre el modal #avatarNameModal con la configuración para cambiar la info
function modalCambiarInfo(){
  $('#name').prop('value', player.nombre);
  $('#avatarId').prop('value', player.avatar);
  $('.avatar_selected').removeClass('avatar_selected');
  $('#avatar_' + player.avatar).addClass('avatar_selected');
  $('#iniciarPartidaButton').prop('hidden', true);
  $('#cambiarInfoButton').prop('hidden', false);
  $('#modal-info').prop('hidden', true);
  $('#avatarNameModalLabel').html('EDITAR INFORMACIÓN JUGADOR');
  $('#avatarNameModal').modal('show');
}

//Remarca el avatar selecionado en el modal
function selectAvatar(id){
  $('#avatarId').prop('value', id);
  $('.avatar_selected').removeClass('avatar_selected');
  $('#avatar_' + id).addClass('avatar_selected');
}

//función que se llama al iniciar partida en el modal
function iniciarPartida(){
  if($('#name').val() != '' && $('#avatarId').val() != 0){
    //TODO Aquí ha d'anar la crida ajax a nova partida i les comandes següents s'han de realitzar només si s'ha completat amb exit
    player.nombre = $('#name').val();
    player.avatar = $('#avatarId').val();
    $('header .player-name').html($('#name').val());
    $('header .avatar').prop('src', 'media/images/avatar' + $('#avatarId').val() + '.png');
    $('#menu-nuevaPartida').prop('hidden', true);
    $('#menu-cargarPartida').prop('hidden', true);
    $('#menu-jugador').prop('hidden', false);
    $('#menu-guardarPartida').prop('hidden', false);
    $('#menu-salir').prop('hidden', false);
    $('#avatarNameModal').modal('hide');

  }
}

//función que se llama al guardar cambios del jugador en el modal
function cambiarInfoJugador(){
  if($('#name').val() != '' && $('#avatarId').val() != 0){
    player.nombre = $('#name').val();
    player.avatar = $('#avatarId').val();
    $('header .player-name').html($('#name').val());
    $('header .avatar').prop('src', 'media/images/avatar' + $('#avatarId').val() + '.png');
    $('#avatarNameModal').modal('hide');
  }
}
