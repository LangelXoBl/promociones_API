import { Schema, model } from "mongoose";

const promSchema = new Schema(
  {
    title: {
      //# titulo de la oferta
      type: String,
      required: true,
      trim: true,
    },
    nivel: {
      //# puede ser desarrollo | piso | unidad
      type: String,
      required: true,
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
