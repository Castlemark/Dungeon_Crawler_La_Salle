// Función que hace que la posición y la orientación del jugador sea el origen del mapa actual
function colocarEnInicioMapa() {
  partida.jugador.posicion.x = partida.mapas[partida.jugador.posicion.mapa].origen[0];
  partida.jugador.posicion.y = partida.mapas[partida.jugador.posicion.mapa].origen[1];
  partida.jugador.posicion.orientacion = partida.mapas[partida.jugador.posicion.mapa].orientacion;
}

function mover(dir){
  if(!disableControls){
    switch (dir){
      case 'up':
        if(!(partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0] < 0 || partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0] > 9 || partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1] < 0 || partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1] > 9)){
          if(computeCurrentFront() != 10 && !(computeCurrentFront() >= 30 && computeCurrentFront() <= 39)){
            partida.jugador.posicion.x += partida.jugador.posicion.orientacion[0];
            partida.jugador.posicion.y += partida.jugador.posicion.orientacion[1];
            console.log('ok');
            comprovarPosicion();
          }
          //else if (computeCurrentFront() >= 30 && computeCurrentFront() <= 39) {
            //alert('No puedes ir hacia delante porque tienes un enemigo delante.');
          //}
        }
        break;
      case 'down':
        if(!(partida.jugador.posicion.x - partida.jugador.posicion.orientacion[0] < 0 || partida.jugador.posicion.x - partida.jugador.posicion.orientacion[0] > 9 || partida.jugador.posicion.y - partida.jugador.posicion.orientacion[1] < 0 || partida.jugador.posicion.y - partida.jugador.posicion.orientacion[1] > 9)){
          if(computeCurrentBack() != 10 && !(computeCurrentBack() >= 30 && computeCurrentBack() <= 39)){
            partida.jugador.posicion.x -= partida.jugador.posicion.orientacion[0];
            partida.jugador.posicion.y -= partida.jugador.posicion.orientacion[1];
            console.log('ok');
            comprovarPosicion();
          }
          //else if (computeCurrentBack() >= 30 && computeCurrentBack() <= 39) {
            //alert('No puedes ir hacia atrás porque tienes un enemigo detrás.');
          //}
        }
        break;
      case 'right':
        if(partida.jugador.posicion.orientacion[0] == 0){
          partida.jugador.posicion.orientacion[0] = partida.jugador.posicion.orientacion[1];
          partida.jugador.posicion.orientacion[1] = 0;
        }else{
          partida.jugador.posicion.orientacion[1] = partida.jugador.posicion.orientacion[0] * -1;
          partida.jugador.posicion.orientacion[0] = 0;
        }
        pintaPosicion(partida.jugador.posicion.x, partida.jugador.posicion.y);
        // Comprobamos si delante tenemos un enemigo (se está viendo un enemigo en el visor)
        comprobarEnemigo();
      break;
      case 'left':
        if(partida.jugador.posicion.orientacion[0] == 0){
          partida.jugador.posicion.orientacion[0] = partida.jugador.posicion.orientacion[1] * -1;
          partida.jugador.posicion.orientacion[1] = 0;
        }else{
          partida.jugador.posicion.orientacion[1] = partida.jugador.posicion.orientacion[0];
          partida.jugador.posicion.orientacion[0] = 0;
        }
        pintaPosicion(partida.jugador.posicion.x, partida.jugador.posicion.y);
        // Comprobamos si delante tenemos un enemigo (se está viendo un enemigo en el visor)
        comprobarEnemigo();
      break;
    }
    console.log(partida.jugador.posicion.x + " , " + partida.jugador.posicion.y);
    actualizarMapa();
  }else{
    console.log('Controles deshabilitados');
  }
}

function actualizarMapa(){
  var casilla = partida.mapas[partida.jugador.posicion.mapa].distribucion[partida.jugador.posicion.x][partida.jugador.posicion.y];
  var ocasilla = 0;
  var id = partida.jugador.posicion.x * 10 + partida.jugador.posicion.y;
  var oid = 0;

  var oposx = partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0];
  var oposy = partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1];

  //limpiamos la flecha del jugador del mapa
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      idaux = i*10 + j;

      $("#"+idaux).attr("src","media/images/mapa_null.png");
    }
  }

  //decide que casilla dibujar en la posicion que esta mirando el jugador
  if ( oposx > -1 && oposy > -1 && oposx < 10 && oposy < 10) {
    oid = (partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0]) * 10 + (partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1]);
    ocasilla = partida.mapas[partida.jugador.posicion.mapa].distribucion[partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0]][partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1]];

    if (ocasilla == 10) {
      $("#"+oid).css("background-image", "url(media/images/mapa_pared.png)");
    }
    else if (ocasilla == 12) {
      $("#"+oid).css("background-image", "url(media/images/mapa_salida.png)");
    }
    else if (ocasilla >= 30) {
      $("#"+oid).css("background-image", "url(media/images/mapa_enemigo.png)");
    }
    else if (ocasilla >= 20 && ocasilla < 30) {
      $("#"+oid).css("background-image", "url(media/images/mapa_objeto.png)");
    }
  }

  //decide en que direccion se pondra la flecha
  switch (partida.jugador.posicion.orientacion.join(' ')) {
    case "0 1":
      $("#"+id).attr("src","media/images/mapa_derecha.png");
    break;
    case "0 -1":
      $("#"+id).attr("src","media/images/mapa_izquierda.png");
    break;
    case "1 0":
      $("#"+id).attr("src","media/images/mapa_abajo.png");
    break;
    case "-1 0":
      $("#"+id).attr("src","media/images/mapa_arriba.png");
    break;
    default:
  }

  //decide que casilla dibujar en la posicion del jugador
  switch (casilla) {
    case 11:
      console.log("suelo");
      $("#"+id).css("background-image", "url(media/images/mapa_suelo.png)");
    break;
    case 12:
      console.log(id);
      $("#"+id).css("background-image", "url(media/images/mapa_salida.png)");
    break;
    case 13:
      console.log("origen");
      $("#"+id).css("background-image", "url(media/images/mapa_origen.png)");
    break;
    default:
    break;

  }

}

function comprovarPosicion(){
  var casilla = partida.mapas[partida.jugador.posicion.mapa].distribucion[partida.jugador.posicion.x][partida.jugador.posicion.y];
  //si está en una casilla sin ninguna acción solo pintamos esta
  if(casilla == 11 || casilla == 13){
    pintaPosicion(partida.jugador.posicion.x, partida.jugador.posicion.y);
  }
  //si es otro tipo de casilla, realizaremos la acción pertinente a esa casilla.
  if(casilla == 12){
    //salida
    subirPiso();
  }
  if(casilla == 14){
    //puntos xp
    sumXp(10);
    partida.mapas[partida.jugador.posicion.mapa].distribucion[partida.jugador.posicion.x][partida.jugador.posicion.y] = 11;
    messageToConsole('Has encontrado 10 puntos xp extras!');
    pintaPosicion(partida.jugador.posicion.x, partida.jugador.posicion.y);
  }
  if(casilla >= 20 && casilla <= 29){
    //objeto
    recogerObjeto(casilla);
    pintaPosicion(partida.jugador.posicion.x, partida.jugador.posicion.y);
    // Quitamos el objeto para que no lo pueda volver a coger. Ponemos suelo (11)
    partida.mapas[partida.jugador.posicion.mapa].distribucion[partida.jugador.posicion.x][partida.jugador.posicion.y] = 11;
  }
  if(casilla >= 30 && casilla <= 39){
    //enemigo
  }
  // Comprobamos si delante tenemos un enemigo (se está viendo un enemigo en el visor)
  comprobarEnemigo();
}
