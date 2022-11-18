import { Schema, model, Types } from 'mongoose';

const promSchema = new Schema(
  {
    title: {
      //# titulo de la oferta
      type: String,
      required: true,
      trim: true,
    },
    properties: [Types.ObjectId],
    real_estate_development: {
      code: {
        type: String,
        required: true,
      },
    },
    discount: {
      type: { type: String, required: true }, //#fijo | porcentual
      quantity: { type: Number, required: true },
      payment_facilities: {
        type: String,
      },
    },
    validity: {
      type: Date, //# 2022/12/25T23:59:59.000Z
      //#fecha de vigencia no requerido
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model('promotions', promSchema);
