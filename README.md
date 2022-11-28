# Promociones
Modulo adicional para el webAdmin

## Installation

Para instalar en un entorno local:
```
$ git clone https://github.com/LangelXoBl/promociones.git
$ cd promociones
$ npm install
$ npm run dev
```
Asegurese de estar dentro de la carpeta "promociones" y que el puerto 3000 este disponible.

## Endpoints
Las peticiones deben ser de tipo *POST* y la query se deberá mandar por medio del body.

### Estructura de datos
Los tipos de dato y nombres son los siguientes:
  - title: `String y Requerido`
  - discount: `Object`
      - type:  `String y Requerido` `Fijo|Porcentual`
      - quantity:  `Num y Requerido`
      - payament_facilities: `String`
  - properties: `Array de ID de propiedades` o `Array vacio y requerido`
  - real_estate_development: `Object`
    - code: `String y Requerido`
  - validity: `Date(24-12-22 o 24-12-22T00:00:00.000Z)`

### Crear una promoción: 
- `http://localhost:3000/api/v2/myPromotions/new`
```
{
  "title": "Descuentos de halloween",
  "discount": {
    "type": "Porcentual", 
    "quantity": 10, 
    "payament_facilities":""
  },
  "properties": [
    "5d39e01dba3480122d1bbe3c", 
    "_id": "5d39e01dba3480122d1bbe32"
  ],
  "real_estate_development": { 
    "code": "meliora" 
  },
  "validity": "2022-12-05"
}
```

### Para editar una promoción:
- `http://localhost:3000/api/v2/myPromotions/edit`
```
{
  "_id": "637806a136fcbf5acc512066",
  "title": "Promotion of Black friday",
  "real_estate_development": {
    "code": "code"
  },
  "discount": {
    "type": "Fijo",
    "quantity": 500,
    "payment_facilities": "none"
  },
  "properties": [],
  "validity": "2022-11-20T22:26:41.994Z",
}
```

### Eliminar una promoción o ver datos de una promocion
- Eliminar: `http://localhost:3000/api/v2/myPromotions/delete`
- Ver `http://localhost:3000/api/v2/myPromotions/show/one`
```
{
  "promotion_id":"63619d0303b14508188256c4"
}
```

### Ver las promociones de un desarrollo:
- `http://localhost:3000/api/v2/myPromotions/show/all`
```
{
  "real_estate_development_code": "code"
}
```

### Consultar las unidades para construir el formulario.
Este endpoint es para poder recibir un array con las propiedades con su piso y así elegir a cuál aplicarle la promoción desde el front.
- `http://localhost:3000/api/v2/realEstateDevelopment/propertieslist`
```
{
  "real_estate_development_code":"meliora"
}
```

### Consultar las propiedades con las promociones vigentes.
Este endpoint es para consultar las propiedades de un desarrollo, devuelve las propiedades con un campo añadido para las promociones que son vigentes al momento de hacer la consulta. Las promociones aplicadas a todo el desarrollo se mandan dentro de los datos del desarrollo
- `http://localhost:3000/api/v2/realEstateDevelopment/detail`
```
{
  "real_estate_development_code":"meliora"
}
