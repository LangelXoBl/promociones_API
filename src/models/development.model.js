import { Schema, model, Types } from 'mongoose';

const RealEstateDevelopmentModelSchema = new Schema({
  // código único por desarrollo
  code: String,
  name: String,
  favorite: Boolean,
  unit_types: {
    type: String,
    enum: ['lots', 'offices', 'department', ''],
    default: 'department',
  },
  // tipo de estructura
  development_structure: {
    type: {
      type: String,
      // edificio, complejo, residencial, otros
      enum: ['building', 'complex', 'other', ''],
    },
    // estructura de niveles (aplica para edificios)
    floors: [],
    num_properties: Number,
  },
  // status del desarrollo
  development_status: {
    actual_status: {
      type: String,
      enum: ['investment', 'construction', 'finished', ''],
    },
    start_date: Date,
    delivery_date: Date,
    marketer: String,
  },
  // each item by currency
  pricing: [],
  // dirección
  address: {
    google_maps_address: {
      lat: Number,
      lng: Number,
      link: String,
      iframe: String,
    },
    country: String,
    state: String,
    city: String,
    zone: String,
    full_address: String,
  },
  // datos de contacto
  contact_data: {
    email: String,
    phone: String,
    web: String,
    drive_folder: String,
    brochure: String,
    social_networks: {
      facebook: String,
      instagram: String,
      twitter: String,
    },
  },
  // media, imagen destacada, galeria y logo
  media: {
    featured_image: {
      name: String,
      src: String,
      alt_text: String,
      cloudinary_id: String,
    },
    logo: {
      name: String,
      title: String,
      src: String,
      cloudinary_id: String,
    },
    structure: {
      name: String,
      src: String,
      alt_text: String,
      cloudinary_id: String,
    },
    gallery: [],
  },
  // datos adicionales que son auxiliares para el app móvil y sitios web
  miscellaneous: {
    website: {
      // slug con el se que ubicará en el sitio web
      // recomendable poner este slug dentro de aliases
      slug: String,
    },
    // etiquetas o palabras por el cual se puede encontrar el desarrollo
    // además de su código
    aliases: [],
    // orden para el slider de desarrollos en móbil
    mobile_order: Number,
    // coordenadas para efecto navegación entre niveles
    mapping_coords_structure: [
      {
        name: String,
        index: Number,
        link: String,
        mapping_coords: [],
      },
    ],
    seo: {},
    main_description: String,
    quote: {
      active: {
        type: String,
        enum: ['on', 'off'],
        default: 'off',
      },
      active_two: {
        type: String,
        enum: ['on', 'off'],
        default: 'off',
      },
      title: String,
      description: String,
      styles_view: {},
      styles_pdf: {},
      include_vat: Boolean,
      vat: Number,
    },
  },
  // lista de amenidades con que cuenta el desarrollo
  amenities: [
    {
      _id: String,
      name: String,
      media: {
        featured_image: {
          name: String,
          src: String,
          alt_text: String,
          cloudinary_id: String,
        },
        gallery: [
          {
            name: String,
            src: String,
            alt_text: String,
            cloudinary_id: String,
          },
        ],
      },
    },
  ],
  // descripcion para sitio web y venta
  description: {
    main_description: String,
    speech: String,
    storytelling: String,
  },
  config: {
    api_keys: [],
    server: {
      domain: String,
    },
  },
  // lista de avance de obra
  work_progress: [
    {
      date: Date,
      description: String,
      // imagen o lista de imagenes
      images: [
        {
          name: String,
          src: String,
          alt_text: String,
          cloudinary_id: String,
        },
      ],
    },
  ],
  // campos personalizados
  custom_fields: {},
  // usuarios desarrolladores dueños del desarrollo
  contact_developers: [],
  // define si es una propiedad única
  // este campo fue creado como auxiliar para propiedades independientes
  is_direct_property: Boolean,
  // inmobiliaria que lleva la administración del desarrollo
  real_estate_group_id: Types.ObjectId,
  status: { type: Number, default: 1 },
});

export default model(
  'real_estate_developments',
  RealEstateDevelopmentModelSchema
);
