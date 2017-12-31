var json = `
{
  "jugador": {
    "nivel": 1,
    "experiencia": 0,
    "ataque": 0,
    "defensa": 0,
    "vida": 10
  },
  "terreno": [
    {
      "nombre": "pared",
      "id": 10
    },
    {
      "nombre": "suelo",
      "id": 11
    },
    {
      "nombre": "salida",
      "id": 12
    },
    {
      "nombre": "origen",
      "id": 13
    }
  ],
  "objetos": [
    {
      "nombre": "portatil",
      "id": 20,
      "atributos": {
        "ataque": 3,
        "defensa": 5,
        "durabilidad": 30
      }
    },
    {
      "nombre": "soldador",
      "id": 21,
      "atributos": {
        "ataque": 5,
        "defensa": 1,
        "durabilitat": 30
      }
    },
    {
      "nombre": "calculadora",
      "id": 22,
      "atributos": {
        "ataque": 3,
        "defensa": 3,
        "durabilidad": 30
      }
    },
    {
      "nombre": "usb",
      "id": 23,
      "atributos": {
        "ataque": 3,
        "defensa": 2,
        "durabilidad": 50
      }
    }
  ],
  "enemigos": [
    {
      "nombre": "lsmaker",
      "id": 30,
      "objetos": [
        23
      ],
      "atributos": {
        "ataque": 2,
        "defensa": 3,
        "vida": 10,
        "xp": 4
      }
    },
    {
      "nombre": "daniel",
      "id": 31,
      "objetos": [
        20,
        23
      ],
      "atributos": {
        "ataque": 4,
        "defensa": 4,
        "vida": 15,
        "xp": 6
      }
    },
    {
      "nombre": "emiliano",
      "id": 32,
      "objetos": [
        22
      ],
      "atributos": {
        "ataque": 4,
        "defensa": 4,
        "vida": 15,
        "xp": 6
      }
    },
    {
      "nombre": "eva",
      "id": 33,
      "objetos": [
        21,
        23
      ],
      "atributos": {
        "ataque": 4,
        "defensa": 4,
        "vida": 15,
        "xp": 6
      }
    },
    {
      "nombre": "guillem",
      "id": 34,
      "objetos": [
        23
      ],
      "atributos": {
        "ataque": 4,
        "defensa": 4,
        "vida": 15,
        "xp": 6
      }
    },
    {
      "nombre": "ignasi",
      "id": 35,
      "objetos": [
        20,
        22
      ],
      "atributos": {
        "ataque": 4,
        "defensa": 4,
        "vida": 15,
        "xp": 6
      }
    },
    {
      "nombre": "jose",
      "id": 36,
      "objetos": [
        22,
        22
      ],
      "atributos": {
        "ataque": 4,
        "defensa": 4,
        "vida": 15,
        "xp": 6
      }
    },
    {
      "nombre": "xevi",
      "id": 37,
      "objetos": [
        21,
        21
      ],
      "atributos": {
        "ataque": 6,
        "defensa": 5,
        "vida": 15,
        "xp": 10
      }
    }
  ],
  "mapa1": {
    "origen": [
      9,
      5
    ],
    "orientacion": [
      1,
      0
    ],
    "distribucion": [
      [
        10,
        10,
        10,
        10,
        12,
        10,
        10,
        10,
        10,
        10
      ],
      [
        10,
        10,
        31,
        11,
        11,
        11,
        11,
        31,
        10,
        10
      ],
      [
        10,
        11,
        11,
        10,
        10,
        10,
        10,
        11,
        10,
        10
      ],
      [
        10,
        11,
        10,
        10,
        11,
        20,
        11,
        11,
        10,
        10
      ],
      [
        10,
        11,
        10,
        11,
        11,
        10,
        10,
        11,
        10,
        10
      ],
      [
        10,
        11,
        11,
        30,
        10,
        10,
        10,
        11,
        10,
        10
      ],
      [
        10,
        11,
        10,
        11,
        11,
        10,
        11,
        30,
        11,
        10
      ],
      [
        10,
        11,
        10,
        10,
        11,
        10,
        11,
        10,
        11,
        10
      ],
      [
        10,
        30,
        11,
        22,
        11,
        13,
        11,
        21,
        11,
        10
      ],
      [
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10
      ]
    ]
  },
  "mapa2": {
    "origen": [
      10,
      5
    ],
    "orientacion": [
      1,
      0
    ],
    "distribucion": [
      [
        10,
        10,
        10,
        10,
        12,
        10,
        10,
        10,
        10,
        10
      ],
      [
        10,
        35,
        11,
        11,
        11,
        11,
        11,
        11,
        33,
        10
      ],
      [
        10,
        11,
        10,
        10,
        34,
        11,
        10,
        10,
        11,
        10
      ],
      [
        10,
        11,
        30,
        10,
        11,
        10,
        10,
        10,
        30,
        10
      ],
      [
        10,
        11,
        10,
        10,
        11,
        11,
        30,
        10,
        11,
        10
      ],
      [
        10,
        30,
        10,
        11,
        30,
        11,
        10,
        10,
        30,
        10
      ],
      [
        10,
        11,
        11,
        11,
        10,
        22,
        11,
        10,
        11,
        10
      ],
      [
        10,
        11,
        10,
        10,
        10,
        10,
        11,
        10,
        30,
        10
      ],
      [
        10,
        11,
        23,
        11,
        11,
        11,
        11,
        11,
        21,
        10
      ],
      [
        10,
        10,
        10,
        10,
        13,
        10,
        10,
        10,
        10,
        10
      ]
    ]
  },
  "mapa3": {
    "origen": [
      10,
      5
    ],
    "orientacion": [
      1,
      0
    ],
    "distribucion": [
      [
        10,
        10,
        10,
        10,
        12,
        10,
        10,
        10,
        10,
        10
      ],
      [
        10,
        11,
        11,
        11,
        11,
        11,
        37,
        11,
        11,
        10
      ],
      [
        10,
        10,
        10,
        10,
        11,
        11,
        10,
        10,
        11,
        10
      ],
      [
        10,
        22,
        11,
        23,
        10,
        10,
        10,
        30,
        11,
        10
      ],
      [
        10,
        10,
        10,
        11,
        11,
        11,
        11,
        11,
        21,
        10
      ],
      [
        10,
        30,
        10,
        11,
        10,
        10,
        10,
        10,
        10,
        10
      ],
      [
        10,
        11,
        11,
        36,
        11,
        11,
        11,
        10,
        20,
        10
      ],
      [
        10,
        21,
        10,
        11,
        11,
        10,
        30,
        11,
        11,
        10
      ],
      [
        10,
        10,
        10,
        10,
        11,
        10,
        10,
        10,
        10,
        10
      ],
      [
        10,
        10,
        10,
        10,
        13,
        10,
        10,
        10,
        10,
        10
      ]
    ]
  }
}
`;
