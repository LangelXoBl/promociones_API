import { Schema, model, Types } from 'mongoose';

const promSchema = new Schema(
  {
    titulo: {
      //# titulo de la oferta
      type: String,
      required: true,
      trim: true,
    },
    unidad: {
      _id: Types.ObjectId, //!Al crear una promo esto debe estar como nulo
    },
    nivel: {
      //# puede ser piso | seccion
      tipo: String,
      code: String,
    },
    desarrollo: {
      code: {
        type: String,
        required: true,
      },
    },
    descuento: {
      tipo: { type: String, required: true }, //#fijo | porcentual
      cantidad: { type: Number, required: true },
      facilidades: {
        type: String,
      },
    },
    vigencia: {
      type: Date, //# 2022/12/25
      //#fecha de vigencia no requerido
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model('Promotions', promSchema);
