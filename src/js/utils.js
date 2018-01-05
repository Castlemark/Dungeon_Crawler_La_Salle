//funcion para saber en que nivel está el jugador mediante sus xp
function getNivel(xp){
  var nivel = 1;
  var puntos = xp;
  while(puntos > 0){
    puntos = puntos - ((nivel+1) * 10);
    if(puntos >= 0){
      nivel++;
    }
  }
  return nivel;
}

// Función para determinar qué es lo que hay en la casilla de enfrente dada una posición, con x e y
function computeFront(x, y) {
  return partida.mapas[partida.jugador.posicion.mapa].distribucion[x + partida.jugador.posicion.orientacion[0]][y + partida.jugador.posicion.orientacion[1]];
}

// Función para determinar qué es lo que hay en la casilla de enfrente mediante la posición actual del jugador
function computeCurrentFront() {
  return computeFront(partida.jugador.posicion.x, partida.jugador.posicion.y);
}

// Función para determinar qué es lo que hay en la casilla de detrás dada una posición, con x e y
function computeBack(x, y) {
  return partida.mapas[partida.jugador.posicion.mapa].distribucion[x - partida.jugador.posicion.orientacion[0]][y - partida.jugador.posicion.orientacion[1]];
}

// Función para determinar qué es lo que hay en la casilla de detrás mediante la posición actual del jugador
function computeCurrentBack() {
  return computeBack(partida.jugador.posicion.x, partida.jugador.posicion.y);
}
