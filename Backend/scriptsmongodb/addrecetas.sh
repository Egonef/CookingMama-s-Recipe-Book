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
        "name": "Verduras variadas",
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
    "intolerances": ""
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
        "name": "Pan tostado",
        "quantity": "1",
        "unit": "rebanada"
      },
      {
        "name": "Aderezo César",
        "quantity": "",
        "unit": ""
      }
    ],
    "steps": "Lava y corta la lechuga. Agrega el pollo cortado en trozos, el pan tostado y el aderezo César. Mezcla bien y sirve.",
    "image": "https://example.com/ensalada-cesar.jpg",
    "maxReadyTime": 30,
    "intolerances": ""
  },
  // Resto de las recetas
]

)

exit