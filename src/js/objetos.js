function guardarEnMochila(infoObjeto) {
  partida.jugador.mochila.push(infoObjeto);
  return partida.jugador.mochila.length-1;
}

function mostrarEnMochila(infoObjeto, idEnMochila) {
  $('#mochila').children().filter('i').remove();
  console.log($('#mochila').children().filter('i'));
  $('#mochila').append('<img id="objeto' + idEnMochila + '" src="' + imagenPeqObjeto(infoObjeto.id) + '" class="tooltip-element draggable drag-drop objeto-mochila" data-toggle="tooltip" title="' + infoObjeto.nombre + '" alt="' + infoObjeto.nombre + '"/>');
  $('#objeto' + idEnMochila).tooltip();
  // Actualizamos las barras de ataque y defensa
  mostrarInformacion();
}

function recogerObjeto(id) {
  var idEnMochila = guardarEnMochila(partida.objetos[id]);
  mostrarEnMochila(partida.jugador.mochila[idEnMochila], idEnMochila);
}

function recogerObjetos(ids) {
  for (i = 0; i < ids.length; i++) {
    var id = ids[i];
    var idEnMochila = guardarEnMochila(partida.objetos[id]);
    mostrarEnMochila(partida.jugador.mochila[idEnMochila], idEnMochila);
  }
}

function imagenPeqObjeto(idObjeto) {
  switch (idObjeto) {
    case 20:
      return 'media/images/square20.jpg';
    case 21:
      return 'media/images/square21.jpg';
    case 22:
      return 'media/images/square22.jpg';
    case 23:
      return 'media/images/square23.jpg';
  }
}

// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    /*restrict: {
      restriction: "parent",
      endOnly: false,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },*/
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px');
    }
  });

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.objeto-mochila',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:
  ondropactivate: onDropActivate,
  ondragenter: onDragEnter,
  ondragleave: onDragLeave,
  ondrop: onDrop,
  ondropdeactivate: onDropDeactivate
});

function onDropActivate(event) {
  // add active dropzone feedback
  event.target.classList.add('drop-active');
}

function onDragEnter(event) {
  var draggableElement = event.relatedTarget,
      dropzoneElement = event.target;

  // feedback the possibility of a drop
  dropzoneElement.classList.add('drop-target');
  draggableElement.classList.add('can-drop');
  draggableElement.textContent = 'Dragged in';
}

function onDragLeave(event) {
  // remove the drop feedback style
  event.target.classList.remove('drop-target');
  event.relatedTarget.classList.remove('can-drop');
}

function onDrop(event) {
  $(event.relatedTarget).tooltip('hide');
  $(event.relatedTarget).tooltip('disable');
  deMochilaAMano(event.relatedTarget.id.substr('objeto'.length), event.target.id);
}

function onDropDeactivate(event) {
  var target = event.relatedTarget;
  if (!target.classList.contains('can-drop')) {
    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(0px, 0px)';
    // update the posiion attributes
    target.setAttribute('data-x', 0);
    target.setAttribute('data-y', 0);
  }
  // remove active dropzone feedback
  event.target.classList.remove('drop-active');
  event.target.classList.remove('drop-target');
}

function deMochilaAMano(idEnMochila, idMano) {
  var infoObjeto = sacarDeMochila(idEnMochila);
  ponerEnMano(infoObjeto, idMano);
}

function sacarDeMochila(idEnMochila) {
  var infoObjeto = partida.jugador.mochila.splice(idEnMochila, 1);// The second parameter of splice is the number of elements to remove
  cargarMochila();
  return infoObjeto[0];
}

function cargarMochila() {
  $('#mochila').children().each(function() {
    $(this).remove();
  });
  partida.jugador.mochila.forEach(function(element, index) {
    mostrarEnMochila(element, index);
  });
  if (partida.jugador.mochila == 0) {
    $('#mochila').append('<i class="vacia">Mochila vacía</i>');
  }
}

function ponerEnMano(infoObjeto, idMano) {
  if (idMano == 'mano-izq') {
    mostrarEnMano(infoObjeto, idMano);
    if (partida.jugador.manos.izq != null) {
      deManoAMochila(partida.jugador.manos.izq);
    }
    partida.jugador.manos.izq = infoObjeto;
  }
  else if (idMano == 'mano-der') {
    mostrarEnMano(infoObjeto, idMano);
    if (partida.jugador.manos.der != null) {
      deManoAMochila(partida.jugador.manos.der);
    }
    partida.jugador.manos.der = infoObjeto;
  }
  // Actualizamos las barras de ataque y defensa
  mostrarInformacion();
}

function mostrarEnMano(infoObjeto, idMano) {
  if (idMano == 'mano-izq') {
    $('#info-mano-izq').show();
    $('#nombre-mano-izq').text(infoObjeto.nombre);
    $('#ataque-mano-izq').text(infoObjeto.atributos.ataque);
    $('#defensa-mano-izq').text(infoObjeto.atributos.defensa);
    $('#durabilidad-mano-izq').text(infoObjeto.atributos.durabilidad);
    $('#' + idMano).css('background-image', 'url("' + imagenPeqObjeto(infoObjeto.id) + '")');
    $('#' + idMano).off();
    $('#' + idMano).hover(
      function(){
        $(this).toggleClass('mano-hover');
      },
      function(){
        $(this).toggleClass('mano-hover');
      }
    );
    $('#' + idMano).click(function() {
      $(this).off();
      deManoAMochila(partida.jugador.manos.izq);
      partida.jugador.manos.izq = null;
      $(this).unbind('mouseenter mouseleave');
      $(this).removeClass('mano-hover');
      $(this).css('background-image', 'none');
      $('#info-mano-izq').hide();
    });
  }
  else if (idMano == 'mano-der') {
    $('#info-mano-der').show();
    $('#nombre-mano-der').text(infoObjeto.nombre);
    $('#ataque-mano-der').text(infoObjeto.atributos.ataque);
    $('#defensa-mano-der').text(infoObjeto.atributos.defensa);
    $('#durabilidad-mano-der').text(infoObjeto.atributos.durabilidad);
    $('#' + idMano).css('background-image', 'url("' + imagenPeqObjeto(infoObjeto.id) + '")');
    $('#' + idMano).off();
    $('#' + idMano).hover(
      function(){
        $(this).toggleClass('mano-hover');
      },
      function(){
        $(this).toggleClass('mano-hover');
      }
    );
    $('#' + idMano).click(function() {
      $(this).off();
      deManoAMochila(partida.jugador.manos.der);
      partida.jugador.manos.der = null;
      $(this).unbind('mouseenter mouseleave');
      $(this).removeClass('mano-hover');
      $(this).css('background-image', 'none');
      $('#info-mano-der').hide();
    });
  }
}

function deManoAMochila(infoObjeto) {
  var idEnMochila = guardarEnMochila(infoObjeto);
  mostrarEnMochila(partida.jugador.mochila[idEnMochila], idEnMochila);
}

function cargarMochilaYManos() {
  cargarMochila();// Vacia visualmente la mochila y muestra lo que hay
  if (partida.jugador.manos.izq != null) {
    mostrarEnMano(partida.jugador.manos.izq, 'mano-izq');
  }
  else {
    $('#mano-izq').off();
    $('#mano-izq').unbind('mouseenter mouseleave');
    $('#mano-izq').removeClass('mano-hover');
    $('#mano-izq').css('background-image', 'none');
    $('#info-mano-izq').hide();
  }
  if (partida.jugador.manos.der != null) {
    mostrarEnMano(partida.jugador.manos.der, 'mano-der');
  }
  else {
    $('#mano-der').off();
    $('#mano-der').unbind('mouseenter mouseleave');
    $('#mano-der').removeClass('mano-hover');
    $('#mano-der').css('background-image', 'none');
    $('#info-mano-der').hide();
  }
}
