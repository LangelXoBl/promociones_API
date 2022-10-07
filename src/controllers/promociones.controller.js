import promocionModel from '../models/promociones.model.js';
import propertiesModel from '../models/properties.model.js';

const aplicarPromo = (properties, tipo, cantidad,promotion) => {
  properties.forEach(async (properties) => {
    //*se saca el id y el precio de la propiedad
    let {
      _id,
      pricing: { price },
    } = properties;
    //*se calcula el precio con descuento
    if (tipo == 'fijo') price -= cantidad;
    else price -= price * (cantidad / 100);
    //*se guarda el precio de la promo y el id
    await propertiesModel.findByIdAndUpdate(_id, {
      promotion: { _id:promotion.id, price },
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
    //*Se crea el modelo de la promotions
    const Promotion = new promocionModel({
      titulo,
      nivel,
      descuento,
      vigencia,
      nivel,
      unidad,
      desarrollo,
    });

    //*se define que tipo de promocion sera
    if (unidad._id) {
      //*se obtiene la propiedad que se va a modificar
      let {
        pricing: { price },
        _id,
      } = await propertiesModel.findById(unidad._id, '_id pricing.price');
      console.log(price);
      //*se calcula la promocion
      if (descuento.tipo == 'fijo') price -= descuento.cantidad;
      else price -= price * (descuento.cantidad / 100);

      //*se guarda el precio e id de la promocion
      await propertiesModel.findByIdAndUpdate(_id, {
        promotion: { _id: Promotion.id, price: price },
      });
      console.log('la promocion es a una propiedad');
    } else if (nivel.code) {
      //*busca las propiedades que se van a afectar
      const properties = await propertiesModel.find(
        {
          'real_estate_development.code': desarrollo.code,
          'floor.code': nivel.code,
        },
        '_id pricing.price promotion'
      );
      //*funcion para aplicar las promociones
      aplicarPromo(properties, descuento.tipo, descuento.cantidad,Promotion);

      console.log('La promocion es para un nivel');
      //return res.json({ properties });
    } else if (desarrollo && !unidad._id) {
      //*Busca las propiedades a aplicar
      const properties = await propertiesModel.find(
        { 'real_estate_development.code': desarrollo.code },
        '_id pricing.price promotion'
      );
      //*aplica la promocion a las propiedades
      aplicarPromo(properties, descuento.tipo, descuento.cantidad,Promotion);
      console.log('la promocion es para toda el desarrollo');
      //return res.json({ properties });
    } else {
      return res.json({
        msg: 'No se especifico a que properties aplicarle la promocion',
      });
    }
    //*guardar la promocion creada
    const nwprom = await Promotion.save();
    res.json({ msg: 'promocion creada y aplicada' });
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
    const actu = await promocionModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send(actu);
  } catch (Error) {
    res.status(500).json({
      message: Error.message || 'Error al modificar la promocion',
    });
  }
};

export const deletePromocion = async (req, res) => {
  try {
    const eliminados = await propertiesModel.updateMany(
      { 'promotion._id': req.params.id },
      { promotion: {} }
    );
    await promocionModel.findByIdAndDelete(req.params.id);
    res.json({msg:'Promocion eliminada',actualizados:eliminados.modifiedCount});
  } catch (Error) {
    res.status(500).json({
      message: Error.message || 'Error al eliminar promocion',
    });
  }
};
