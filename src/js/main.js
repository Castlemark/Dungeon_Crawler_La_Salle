var token = '844dc4d3-d096-4a5b-b6bf-b6515691cce6';

/* Inicializar el juego */
var enemigos = [];

function iniciarJuego() {
  /* TODO */
  //preparar objectes joc
  objetos = {};

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
