import { Schema, model, Types } from "mongoose";

const promSchema = new Schema(
  {
    titulo: {
      //# titulo de la oferta
      type: String,
      required: true,
      trim: true,
    },
    unidad: {
      _id: Types.ObjectId,
    },
    nivel: {
      //# puede ser piso | seccion
      tipo: String,
      code: String,
    },
    desarrollo: {
      code: String,
    },
    descuento: {
      tipo: { type: String, required: true }, //#fijo | porcentaje
      cantidad: { type: Number, required: true },
      facilidades: [
        String,
        //#facilidades de pago
        /*{
          title: String,
          descripcion: String,
        },*/
      ],
    },
    vigencia: {
      type: Date,
      //#fecha de vigencia no requerido
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Promotions", promSchema);
