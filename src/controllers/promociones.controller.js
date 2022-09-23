import promocionModel from "../models/promociones.model.js";

export const createPromocion = async (req, res) => {
  try {
    const { title, nivel, descuento, vigencia } = req.body;
    const Promotion = new promocionModel({
      title: title,
      nivel: nivel,
      descuento: descuento,
      vigencia: vigencia,
    });
    const nwprom = await Promotion.save();
    res.json(nwprom);
  } catch (Error) {
    res
      .status(500)
      .json({ message: Error.message || "Error al crear la promocion" });
  }
};

export const misPromociones = async (req, res) => {
  try {
    const cond = req.query.nivel;
    const promotions = await promocionModel.find(
      cond ? { nivel: { $regex: cond, $options: "i" } } : {}
    );
    res.json(promotions);
  } catch (Error) {
    res
      .status(500)
      .json({ message: error.message || "Error al devolver promociones" });
  }
};

export const onePromocion = async (req, res) => {
  try {
    const promo = await promocionModel.findById(req.params.id);
    res.json(promo);
  } catch (Error) {
    res
      .status(500)
      .json({ message: Error.message || "Error al buscar la promoción" });
  }
};

export const editPromocion = async (req, res) => {
  try {
    const actu = await promocionModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send(actu);
  } catch (Error) {
    res.status(500).json({
      message: Error.message || "Error al modificar la promocion",
    });
  }
};

export const deletePromocion = async (req, res) => {
  try {
    await promocionModel.findByIdAndDelete(req.params.id);
    res.send("Promocion eliminada");
  } catch (Error) {
    res.status(500).json({
      message: Error.message || "Error al eliminar promocion",
    });
  }
};
