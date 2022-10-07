import promocionModel from '../models/promociones.model.js';
import propertiesModel from '../models/properties.model.js';

const aplicarPromo = (properties, tipo, cantidad, id) => {
  properties.forEach(async (properties) => {
    //*se saca el id y el precio de la propiedad
    let {
      _id,
      pricing: { price },
    } = properties;
    //*se calcula el precio con descuento
    if (tipo == 'fijo') price -= cantidad;
    else if (tipo == 'porcentaje') price -= price * (cantidad / 100);
    //*se guarda el precio de la promo y el id
    await propertiesModel.findByIdAndUpdate(_id, {
      promotion: { _id: id, price },
    });
  });
};
export const createPromocion = async (req, res) => {
  try {
    const { titulo, descuento, vigencia } = req.body; // #datos de la promo
    /*
     #unidad:Es el id de la unidade a la cual se le aplicara la promocion
     #nivel:es el piso al cual se le debe aplicar toda la promo, tener en cuanta que tambien debe tener el code del desarrollo
     #desarrollo: es el code del desarrollo a aplicar la promocion
     */
    const { unidad, nivel, desarrollo } = req.body; //# Datos para aplicar la promo
    //*Se crea el modelo de la promocion
    const Promotion = new promocionModel({
      titulo,
      nivel,
      descuento,
      vigencia,
      nivel,
      unidad,
      desarrollo,
    });
    let properties;
    //*se busca a que propiedades aplicarle la promocion
    if (unidad._id) {
      //!hacer que en unidad reciva un array de id para aplicar la promo
      properties = await propertiesModel.find(
        { _id: unidad._id },
        '_id pricing.price'
      );
    } else if (nivel.code) {
      properties = await propertiesModel.find(
        {
          'real_estate_development.code': desarrollo.code,
          'floor.code': nivel.code,
        },
        '_id pricing.price promotion'
      );
    } else if (desarrollo && !unidad._id) {
      properties = await propertiesModel.find(
        { 'real_estate_development.code': desarrollo.code },
        '_id pricing.price promotion'
      );
    } else {
      return res.json({
        msg: 'No se especifico a que propiedades aplicarle la promocion',
      });
    }
    const existProm = properties.filter(
      (propertie) => propertie.promotion != null
    );
    if (existProm)
      return res.status(400).json({
        msg: 'algunas propiedades selecionadad ya tienen promocio',
        existProm,
      });
    //*se aplican las promociones
    aplicarPromo(properties, descuento.tipo, descuento.cantidad, Promotion.id);
    //*guardar la promocion creada
    const nwprom = await Promotion.save();
    res.json({
      msg: `promocion creada y aplicada`,
      Properties_afectados: properties.length,
      nwprom,
    });
  } catch (Error) {
    res
      .status(500)
      .json({ message: Error.message || 'Error al crear la promocion' });
  }
};

export const misPromociones = async (req, res) => {
  try {
    const cond = req.query.nivel;
    const promotions = await promocionModel.find(
      cond ? { nivel: { $regex: cond, $options: 'i' } } : {}
    );
    res.json(promotions);
  } catch (Error) {
    res
      .status(500)
      .json({ message: error.message || 'Error al devolver promociones' });
  }
};

export const onePromocion = async (req, res) => {
  try {
    const promo = await promocionModel.findById(req.params.id);
    res.json(promo);
  } catch (Error) {
    res
      .status(500)
      .json({ message: Error.message || 'Error al buscar la promoción' });
  }
};

export const editPromocion = async (req, res) => {
  try {
    //*No se podra cambiar a que propiedades aplicarle la promocion
    const actu = await promocionModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    //*busca las propiedades afectadas por la promocion
    const aplicados = await propertiesModel.find(
      {
        'promotion._id': req.params.id,
      },
      '_id pricing.price promotion'
    );
    //*Se modifica el precio de promocion de las propiedades
    aplicarPromo(
      aplicados,
      req.body.descuento.tipo,
      req.body.descuento.cantidad,
      req.params.id
    );
    res.json({ msg: 'cambios guardados y aplicados', aplicados });
  } catch (Error) {
    res.status(500).json({
      message: Error.message || 'Error al modificar la promocion',
    });
  }
};

export const deletePromocion = async (req, res) => {
  try {
    //*Se eliminan el campo promociones de las propiedades afectadas
    const eliminados = await propertiesModel.updateMany(
      { 'promotion._id': req.params.id },
      { promotion: {} }
    );
    //*Se elimina la promocion
    await promocionModel.findByIdAndDelete(req.params.id);
    res.json({
      msg: 'Promocion eliminada',
      Properties_afectados: eliminados.modifiedCount,
    });
  } catch (Error) {
    res.status(500).json({
      message: Error.message || 'Error al eliminar promocion',
    });
  }
};
