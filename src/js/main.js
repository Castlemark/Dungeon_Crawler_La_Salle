
/* Inicializar la partida */
var partida = {};
partida.mapa = mapa;
partida.enemigos = [];
partida.objetos = objetos;
partida.jugador = player;

var info = {
  nivel: 0,
  xp: 0,
  ataque: 0,
  defensa: 0,
  vida: 0
};

var disableControls = true;
var actualPosition = {
  x : 0,
  y : 0
};

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
