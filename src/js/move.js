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
          else if (computeCurrentFront() >= 30 && computeCurrentFront() <= 39) {
            alert('No puedes ir hacia delante porque tienes un enemigo delante.');
          }
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
          else if (computeCurrentBack() >= 30 && computeCurrentBack() <= 39) {
            alert('No puedes ir hacia atrás porque tienes un enemigo detrás.');
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
  }else{
    console.log('Controles deshabilitados');

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
  // Comprobamos si delante tenemos un enemigo (se está viendo un enemigo en el visor)
  comprobarEnemigo();
}
