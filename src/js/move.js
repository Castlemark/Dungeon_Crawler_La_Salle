function mover(dir){
  if(!disableControls){
    switch (dir){
      case 'up':
        if(!(partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0] < 0 || partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0] > 9 || partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1] < 0 || partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1] > 9)){
          if(partida.mapas[partida.jugador.posicion.mapa].distribucion[partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0]][partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1]] != 10){
            partida.jugador.posicion.x += partida.jugador.posicion.orientacion[0];
            partida.jugador.posicion.y += partida.jugador.posicion.orientacion[1];
            console.log('ok');
            comprovarPosicion();
          }
        }
        break;
      case 'down':
        if(!(partida.jugador.posicion.x - partida.jugador.posicion.orientacion[0] < 0 || partida.jugador.posicion.x - partida.jugador.posicion.orientacion[0] > 9 || partida.jugador.posicion.y - partida.jugador.posicion.orientacion[1] < 0 || partida.jugador.posicion.y - partida.jugador.posicion.orientacion[1] > 9)){
          if(partida.mapas[partida.jugador.posicion.mapa].distribucion[partida.jugador.posicion.x - partida.jugador.posicion.orientacion[0]][partida.jugador.posicion.y - partida.jugador.posicion.orientacion[1]] != 10){
            partida.jugador.posicion.x -= partida.jugador.posicion.orientacion[0];
            partida.jugador.posicion.y -= partida.jugador.posicion.orientacion[1];
            console.log('ok');
            comprovarPosicion();
          }
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
      break;
    }
  }else{
    console.log('Controles deshabilitados');

  }
  console.log(partida.jugador.posicion.x + " , " + partida.jugador.posicion.y);
  actualizarMapa();
}

function actualizarMapa(){
  var casilla = partida.mapas[partida.jugador.posicion.mapa].distribucion[partida.jugador.posicion.x][partida.jugador.posicion.y];
  var ocasilla = 0;
  var id = partida.jugador.posicion.x * 10 + partida.jugador.posicion.y;
  var oid = 0;

  var oposx = partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0];
  var oposy = partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1];

  if ( oposx > -1 && oposy > -1 && oposx < 10 && oposy < 10) {
    oid = (partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0]) * 10 + (partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1]);
    ocasilla = partida.mapas[partida.jugador.posicion.mapa].distribucion[partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0]][partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1]];

    console.log("oid: " + oid + " , ocasilla: " + ocasilla );

    if (ocasilla == 10) {
      $("#"+oid).attr("src","media/images/mapa_pared.png");
    }
    else if (ocasilla >= 30) {
      $("#"+oid).attr("src","media/images/mapa_enemigo.png");
    }
  }

  switch (casilla) {
    case 10:
      console.log("pared");
      $("#"+id).attr("src","media/images/mapa_pared.png");
    break;
    case 11:
      console.log("suelo");
      $("#"+id).attr("src","media/images/mapa_suelo.png");
    break;
    case 12:
      console.log(id);
      $("#"+id).attr("src","media/images/mapa_salida.png");
    break;
    case 13:
      console.log("origen");
      $("#"+id).attr("src","media/images/mapa_origen.png");
    break;
    case 20:
      console.log("portatil");
      $("#"+id).attr("src","media/images/mapa_objeto.png");
    break;
    case 21:
      console.log("soldador");
      $("#"+id).attr("src","media/images/mapa_objeto.png");
    break;
    case 22:
      console.log("calculadora");
      $("#"+id).attr("src","media/images/mapa_objeto.png");
    break;
    case 23:
      console.log("usb");
      $("#"+id).attr("src","media/images/mapa_objeto.png");
    break;
    case 30:
      console.log("lsmaker");
      $("#"+id).attr("src","media/images/mapa_enemigo.png");
    break;
    case 31:
      console.log("daniel");
      $("#"+id).attr("src","media/images/mapa_enemigo.png");
    break;
    case 32:
      console.log("emiliano");
      $("#"+id).attr("src","media/images/mapa_enemigo.png");
    break;
    case 33:
      console.log("eva");
      $("#"+id).attr("src","media/images/mapa_enemigo.png");
    break;
    case 34:
      console.log("guillem");
      $("#"+id).attr("src","media/images/mapa_enemigo.png");
    break;
    case 35:
      console.log("ignasi");
      $("#"+id).attr("src","media/images/mapa_enemigo.png");
    break;
    case 36:
      console.log("joseantonio");
      $("#"+id).attr("src","media/images/mapa_enemigo.png");
    break;
    case 37:
      console.log("xavier");
      $("#"+id).attr("src","media/images/mapa_enemigo.png");
    break;
    default:
      console.log(id + " :id no reconeguda");
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
  }
  if(casilla >= 20 && casilla <= 29){
    //objeto
  }
  if(casilla >= 30 && casilla <= 39){
    //enemigo
  }
}
