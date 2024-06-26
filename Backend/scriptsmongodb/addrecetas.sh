mongod

mongo

use CookingMama

db.Recipe

db.Recipe.insertMany(
    [
  {
    "id": "1",
    "title": "Pollo al horno con verduras",
    "cuisine": "Mediterránea",
    "ingredients": [
      {
        "name": "Pollo",
        "quantity": "500",
        "unit": "gramos"
      },
      {
        "name": "Verdura",
        "quantity": "500",
        "unit": "gramos"
      },
      {
        "name": "Sal",
        "quantity": "",
        "unit": ""
      }
    ],
    "steps": "Precalienta el horno a 180°C. Corta las verduras y colócalas en una bandeja con el pollo. Hornea durante 45 minutos.",
    "image": "https://www.bing.com/images/search?view=detailV2&ccid=B0odvtU6&id=0C04476577AB023732580CDAB067ABDECF369B42&thid=OIP.B0odvtU6vJ5v5ShPpfrDpAHaE8&mediaurl=https%3a%2f%2fwww.saluddiez.com%2fwp-content%2fuploads%2f2020%2f06%2ffried-meat-on-white-plate-2338407-1170x780.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.074a1dbed53abc9e6fe5284fa5fac3a4%3frik%3dQps2z96rZ7DaDA%26pid%3dImgRaw%26r%3d0&exph=780&expw=1170&q=pollo+al+horno&simid=608001691478999317&FORM=IRPRST&ck=16E5F4CC0D1FE6F89C481739D8D05755&selectedIndex=1&itb=0",
    "maxReadyTime": 60,
    "intolerances": "",
    "popularity": 0
  },
  {
    "id": "2",
    "title": "Ensalada César",
    "cuisine": "Internacional",
    "ingredients": [
      {
        "name": "Lechuga romana",
        "quantity": "1",
        "unit": "cabeza"
      },
      {
        "name": "Pollo",
        "quantity": "200",
        "unit": "gramos"
      },
      {
        "name": "Pan",
        "quantity": "1",
        "unit": "rebanada"
      },
      {
        "name": "Aderezo César",
        "quantity": "al gusto",
        "unit": ""
      }
    ],
    "steps": "Tuesta la rebanada de pan. Lava y corta la lechuga. Agrega el pollo cortado en trozos, el pan tostado y el aderezo César. Mezcla bien y sirve.",
    "image": "https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/06/18/5e997e650c7b6.jpeg",
    "maxReadyTime": 30,
    "intolerances": "",
    "popularity": 0
  },

  {
    "id": "3",
    "title": "Ensalada Griega",
    "cuisine": "Mediterránea",
    "ingredients": [
      {
        "name": "Tomate",
        "quantity": "2",
        "unit": "unidades"
      },
      {
        "name": "Pepino",
        "quantity": "1",
        "unit": "unidad"
      },
      {
        "name": "Cebolla roja",
        "quantity": "1/2",
        "unit": "unidad"
      },
      {
        "name": "Aceitunas negras",
        "quantity": "100",
        "unit": "gramos"
      },
      {
        "name": "Queso feta",
        "quantity": "100",
        "unit": "gramos"
      },
      {
        "name": "Aceite de oliva",
        "quantity": "2",
        "unit": "cucharadas"
      },
      {
        "name": "Zumo de limón",
        "quantity": "1",
        "unit": "cucharada"
      },
      {
        "name": "Orégano",
        "quantity": "1/2",
        "unit": "cucharada"
      },
      {
        "name": "Sal",
        "quantity": "al gusto",
        "unit": ""
      },
      {
        "name": "Pimienta",
        "quantity": "al gusto",
        "unit": ""
      }
    ],
    "steps": "Corta los tomates, pepinos y cebolla. Mezcla con las aceitunas y el queso feta. Aliña con aceite de oliva, zumo de limón, orégano, sal y pimienta. Mezcla bien y sirve.",
    "image": "https://nutricionvitae.com/wp-content/uploads/2021/03/ensalada-griega.jpg",
    "maxReadyTime": 20,
    "intolerances": "",
    "popularity": 0
  },

  {
    "id": "4",
    "title": "Ensalada de Frutas",
    "cuisine": "Internacional",
    "ingredients": [
      {
        "name": "Fresa",
        "quantity": "200",
        "unit": "gramos"
      },
      {
        "name": "Piña",
        "quantity": "1/2",
        "unit": "unidad"
      },
      {
        "name": "Kiwi",
        "quantity": "2",
        "unit": "unidades"
      },
      {
        "name": "Uva",
        "quantity": "100",
        "unit": "gramos"
      },
      {
        "name": "Naranja",
        "quantity": "1",
        "unit": "unidad"
      },
      {
        "name": "Miel",
        "quantity": "2",
        "unit": "cucharadas"
      },
      {
        "name": "Zumo de limón",
        "quantity": "1",
        "unit": "cucharada"
      },
      {
        "name": "Menta fresca",
        "quantity": "al gusto",
        "unit": ""
      }
    ],
    "steps": "Corta las frutas en trozos. Mezcla con miel y zumo de limón. Decora con hojas de menta fresca. Sirve frío.",
    "image": "https://th.bing.com/th/id/OIP.7oRyfn4GFXCRCRVZJ1Ec7wHaFB?rs=1&pid=ImgDetMain",
    "maxReadyTime": 15,
    "intolerances": "",
    "popularity": 0
    },

    {
    "id": "5",
    "title": "Pollo al Horno con Patatas",
    "cuisine": "Mediterránea",
    "ingredients": [
      {
        "name": "Pollo",
        "quantity": "1",
        "unit": "unidad"
      },
      {
        "name": "Patatas",
        "quantity": "4",
        "unit": "unidades"
      },
      {
        "name": "Ajo",
        "quantity": "4",
        "unit": "dientes"
      },
      {
        "name": "Aceite de oliva",
        "quantity": "3",
        "unit": "cucharadas"
      },
      {
        "name": "Romero fresco",
        "quantity": "3",
        "unit": "ramitas"
      },
      {
        "name": "Sal",
        "quantity": "al gusto",
        "unit": ""
      },
      {
        "name": "Pimienta",
        "quantity": "al gusto",
        "unit": ""
      }
    ],
    "steps": "Precalienta el horno a 200°C. Coloca el pollo en una bandeja junto con las patatas cortadas en trozos y los ajos enteros. Espolvorea con romero fresco picado, sal y pimienta. Rocía con aceite de oliva. Hornea durante 1 hora o hasta que esté dorado y cocido por completo.",
    "image": "https://th.bing.com/th/id/OIP.bXeqzOw1fZNVurRFu3u3OgHaFF?w=239&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "maxReadyTime": 60,
    "intolerances": "",
    "popularity": 0
    },
    {
    "id": "7",
    "title": "Spaghetti Carbonara",
    "cuisine": "Italiana",
    "ingredients": [
      {
        "name": "Spaghetti",
        "quantity": "200",
        "unit": "gramos"
      },
      {
        "name": "Bacon",
        "quantity": "100",
        "unit": "gramos"
      },
      {
        "name": "Huevos",
        "quantity": "2",
        "unit": "unidades"
      },
      {
        "name": "Queso Parmesano",
        "quantity": "50",
        "unit": "gramos"
      },
      {
        "name": "Pimienta negra molida",
        "quantity": "al gusto",
        "unit": ""
      },
      {
        "name": "Sal",
        "quantity": "al gusto",
        "unit": ""
      }
    ],
    "steps": "Cuece los spaghetti en agua con sal según las instrucciones del paquete. Mientras tanto, saltea el bacon en una sartén hasta que esté crujiente. Bate los huevos con queso parmesano rallado y pimienta. Escurre los spaghetti y mézclalos con el bacon en la sartén. Añade la mezcla de huevo y queso, revuelve bien y sirve inmediatamente.",
    "image": "https://www.ricettaidea.it/articoli/ricette-regionali/lazio/original_spaghetti-alla-carbonara.jpg",
    "maxReadyTime": 20,
    "intolerances": "Lactosa",
    "popularity": 0
    },
    {
    "id": "8",
    "title": "Salmón al Horno con Verduras",
    "cuisine": "Mediterránea",
    "ingredients": [
      {
        "name": "Salmón",
        "quantity": "1",
        "unit": "filete"
      },
      {
        "name": "Brócoli",
        "quantity": "1",
        "unit": "unidad"
      },
      {
        "name": "Zanahoria",
        "quantity": "2",
        "unit": "unidades"
      },
      {
        "name": "Calabacín",
        "quantity": "1",
        "unit": "unidad"
      },
      {
        "name": "Aceite de oliva",
        "quantity": "2",
        "unit": "cucharadas"
      },
      {
        "name": "Sal",
        "quantity": "al gusto",
        "unit": ""
      },
      {
        "name": "Pimienta",
        "quantity": "al gusto",
        "unit": ""
      },
      {
        "name": "Limón",
        "quantity": "1",
        "unit": "unidad"
      }
    ],
    "steps": "Precalienta el horno a 200°C. Corta las verduras en trozos y colócalas en una bandeja para hornear junto con el salmón. Rocía con aceite de oliva y sazona con sal y pimienta. Hornea durante 15-20 minutos o hasta que el salmón esté cocido. Sirve con rodajas de limón.",
    "image": "https://www.demoslavueltaaldia.com/sites/default/files/salmon-horno-verduritas.jpg",
    "maxReadyTime": 30,
    "intolerances": "",
    "popularity": 0
    },
  {
    "id": "9",
    "title": "Tarta de Manzana",
    "cuisine": "Internacional",
    "ingredients": [
      {
        "name": "Hojaldre",
        "quantity": "1",
        "unit": "unidad"
      },
      {
        "name": "Manzana",
        "quantity": "4",
        "unit": "unidades"
      },
      {
        "name": "Azúcar",
        "quantity": "100",
        "unit": "gramos"
      },
      {
        "name": "Canela",
        "quantity": "1",
        "unit": "cucharadita"
      },
      {
        "name": "Mantequilla",
        "quantity": "50",
        "unit": "gramos"
      },
      {
        "name": "Huevo",
        "quantity": "1",
        "unit": "unidad"
      }
    ],
    "steps": "Extiende la masa en un molde para tarta. Pela y corta las manzanas en rodajas finas y colócalas sobre la masa. Espolvorea con azúcar y canela. Agrega pequeños trozos de mantequilla por encima. Cubre con otra capa de masa. Pincela con huevo batido. Hornea a 180°C durante 40-45 minutos o hasta que esté dorada. Sirve fría.",
    "image": "https://1.bp.blogspot.com/-K0fEBDV7sjo/XaeG5KGQZyI/AAAAAAABxAw/8GAjHoS_TZIJHpjTzaUSuQdTd-g41YvNwCLcBGAsYHQ/s1600/DSC_0284.JPG",
    "maxReadyTime": 60,
    "intolerances": "",
    "popularity": 0
  },
  {
  "id": "10",
  "title": "Mousse de Chocolate",
  "cuisine": "Internacional",
  "ingredients": [
    {
      "name": "Chocolate negro",
      "quantity": "200",
      "unit": "gramos"
    },
    {
      "name": "Nata para montar",
      "quantity": "200",
      "unit": "mililitros"
    },
    {
      "name": "Azúcar",
      "quantity": "50",
      "unit": "gramos"
    },
    {
      "name": "Huevo",
      "quantity": "2",
      "unit": "unidades"
    }
  ],
  "steps": "Funde el chocolate al baño María. Deja enfriar ligeramente. Separa las claras de las yemas. Monta las claras a punto de nieve con una pizca de sal. En otro recipiente, monta la nata con el azúcar. Agrega las yemas al chocolate fundido y mezcla bien. Incorpora las claras montadas con movimientos suaves y envolventes. Vierte la mezcla en copas individuales y refrigera durante al menos 4 horas antes de servir.",
  "image": "https://th.bing.com/th/id/OIP._CZ7dkAzcYYAtyCZpevd9wHaFN?rs=1&pid=ImgDetMain",
  "maxReadyTime": 240,
  "intolerances": "",
  "popularity": 0
},
])

db.Ingredient

exit