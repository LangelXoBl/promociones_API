import { Schema, model, Types, SchemaType } from "mongoose";

const propertySchema = new Schema({
  // código único a nivel desarrollo
  code: String,
  _id: Types.ObjectId,
  type: String,
  // precio de la unidad
  pricing: {
    price: { type: Number, default: 0 },
    currency: { type: String, default: "" },
  },
  // status de la unidad
  // disponible - reservado - vendido
  contract_status: String,
  // información del desarrollo al que pertecene
  real_estate_development: {
    _id: Types.ObjectId,
    code: String,
    name: String,
  },
  // nivel en que se encuentra la unidad
  // aplica para desarrollos tipo edificios
  floor: {
    code: String,
    name: String,
  },
  // datos de contacto
  contact: {
    web: {
      type: String,
    },
  },
  // información estructura de la unidad
  building: {
    // tipo de construcción
    // estudio - departamento - casa ...
    type: { type: String, default: "" },
    construction: Number,
    //agreagr contruccion adelante o antras
    construction_front: Number,
    construction_depth: Number,
    terrace: String,
    // metros cuadrados totales
    total: Number,
  },
  //construcción permitida
  construction_allowed: {
    unit: {
      type: String,
      enum: ["m2", "%", ""],
      default: "",
    },
    total: Number,
  },
  // amenidades de la unidad
  features: {
    rooms: String,
    bathrooms: String,
  },
  // información media
  media: {
    // imagen destacada
    featured_image: {
      name: String,
      title: String,
      src: String,
      cloudinary_id: String,
    },
    plane_image: {
      name: String,
      title: String,
      src: String,
      cloudinary_id: String,
    },
  },
  // información adicional para el app móvil y sitios web
  miscellaneous: {
    // coordenadas para efecto de navegación en la vista "nivel"
    mapping_coords: [],
    mapping_coords_building: [],
  },
  // lista de amenidades con que cuenta una propiedad
  amenities: [],
});
export default model("properties", propertySchema);
