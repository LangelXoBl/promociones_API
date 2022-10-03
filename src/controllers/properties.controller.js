import propertiesModel from "../models/properties.model.js";
import promocionesModel from "../models/promociones.model.js";

export const properties = async (req, res) => {
  try {
    const all = await propertiesModel.find({_id:"5bac113cfb02bf3577c8f955"});
    const promo = await promocionesModel.find({desarrollo:{code:"the-boat"}});
    res.json({all, promo});
  } catch (Error) {
    res
      .statu(500)
      .json({ message: Error.message || "Error al devolver properties" });
  }
};
