
/* Inicializar el juego */
var enemigos = [];

function iniciarJuego() {
  /* TODO */
  //preparar objectes joc
  objetos = {};
  pintaImagen('first-frame.png', 0, 0);
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

function partidaNueva(json){
  //tratamos json recibido del servidor
  mapa = json.Mapa;
  for(var i = 0; i < json.Enemics.length; i++){
    enemigo = json.Enemics[i].atributs;
    enemigos[json.Enemics[i].nom] =enemigo;
  }
  objetos = json.Objectes;
}

//mentres no tinguem el json pujat al servidor, el tractem aquí
json = {
  "Objectes": [
    {
      "nom": "portatil",
      "atributs": [
        {
          "atac": 3
        },
        {
          "defensa": 5
        },
        {
          "durabilitat": 30
        }
      ]
    },
    {
      "nom": "soldador",
      "atributs": [
        {
          "atac": 5
        },
        {
          "defensa": 1
        },
        {
          "durabilitat": 30
        }
      ]
    },
    {
      "nom": "calculadora",
      "atributs": [
        {
          "atac": 3
        },
        {
          "defensa": 3
        },
        {
          "durabilitat": 30
        }
      ]
    },
    {
      "nom": "usb",
      "atributs": [
        {
          "atac": 3
        },
        {
          "defensa": 2
        },
        {
          "durabilitat": 50
        }
      ]
    }
  ],
  "Enemics": [
    {
      "nom": "LSMaker",
      "atributs": [
        {
          "atac": 2
        },
        {
          "defensa": 3
        },
        {
          "vida": 10
        }
      ]
    },
    {
      "nom": "Profesor",
      "atributs": [
        {
          "atac": 4
        },
        {
          "defensa": 4
        },
        {
          "vida": 15
        }
      ]
    },
    {
      "nom": "Becari",
      "atributs": [
        {
          "atac": 3
        },
        {
          "defensa": 4
        },
        {
          "vida": 10
        }
      ]
    }
  ],
  "Mapa": [
    {
      "Fila 1": [
        "Paret",
        "Paret",
        "Paret",
        "Paret",
        "Sortida",
        "Paret",
        "Paret",
        "Paret",
        "Paret",
        "Paret"
      ]
    },
    {
      "Fila 2": [
        "Paret",
        "Paret",
        "Becari",
        "Terra",
        "Terra",
        "Terra",
        "Terra",
        "Profesor",
        "Paret",
        "Paret"
      ]
    },
    {
      "Fila 3": [
        "Paret",
        "Terra",
        "Terra",
        "Paret",
        "Paret",
        "Paret",
        "Paret",
        "Terra",
        "Paret",
        "Paret"
      ]
    },
    {
      "Fila 4": [
        "Paret",
        "Terra",
        "Paret",
        "Paret",
        "Terra",
        "Portatil",
        "Terra",
        "Terra",
        "Paret",
        "Paret"
      ]
    },
    {
      "Fila 5": [
        "Paret",
        "Terra",
        "Paret",
        "Terra",
        "Terra",
        "Paret",
        "Paret",
        "Terra",
        "Paret",
        "Paret"
      ]
    },
    {
      "Fila 6": [
        "Paret",
        "Terra",
        "Terra",
        "LSMaker",
        "Paret",
        "Paret",
        "Paret",
        "Terra",
        "Paret",
        "Paret"
      ]
    },
    {
      "Fila 7": [
        "Paret",
        "Terra",
        "Paret",
        "Terra",
        "Terra",
        "Paret",
        "Terra",
        "LSMaker",
        "Terra",
        "Paret"
      ]
    },
    {
      "Fila 8": [
        "Paret",
        "Terra",
        "Paret",
        "Paret",
        "Terra",
        "Paret",
        "Terra",
        "Paret",
        "Terra",
        "Paret"
      ]
    },
    {
      "Fila 9": [
        "Paret",
        "LSMaker",
        "Terra",
        "Calculadora",
        "Terra",
        "Origen",
        "Terra",
        "Soldador",
        "Terra",
        "Paret"
      ]
    },
    {
      "Fila 10": [
        "Paret",
        "Paret",
        "Paret",
        "Paret",
        "Paret",
        "Paret",
        "Paret",
        "Paret",
        "Paret",
        "Paret"
      ]
    }
  ]
}
