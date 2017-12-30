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
