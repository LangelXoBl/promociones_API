# Promociones
Modulo adicional para el webAdmin

## Installation

Para instalar en un entorno local:
```
$ git clone https://example.com
$cd promociones
$ npm install
$ npm rund dev
```
Asegurese de estar dentro de la carpeta API-Tienda y que el puerto 3000 este disponible

### Endpoints
Para consumir la Api en un entorno local use los siguientes Endpoint: 
- GET ``` http://localhost:3000/myPromotions/all ``` para ver todos las promociones
- POST ``` http://localhost:3000/myPromotions/ ``` para crear un nuevo promociones
- PUT ``` http://localhost:3000/myPromotions/:id ``` para actualizar un promociones
- DELETE ``` http://localhost:3000/myPromotions/:id ``` para eliminar una promociones
> Asegurese de que el field name y el valor cumpla con lo descrito anteriormente

#### Ejemplo de json para crear una promocion
```
{
  "title":"Descuentos de fin de temporada",
  "nivel":"Piso",
  "descuento":{
    "tipo":"Porcentaje",
    "cantidad":10,
    "facilidades":[
      "Pago en abonos trimestrales","Pago en abonos mensuales", "Pagos mensuales con 5% de interes anual"
    ]
  },
  "vigencia": "2022-09-29"
}
```
>revisar el archivo "validators/promoValidators.js" para ver los tipos de datos y cuales camps son requeridos
