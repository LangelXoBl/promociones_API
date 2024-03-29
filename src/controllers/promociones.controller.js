import promotionModel from '../models/promotions.model.js';

const dateFormat = (date) => {
  //#funcion para darle las 24 hr a la promocion
  const string = date.toISOString();
  return string.split('T')[0] + 'T23:59:59.000Z';
};
export const createPromotion = async (req, res) => {
  try {
    const { title, discount } = req.body; // #datos de la promo
    /*
     #unidades:Es el array con los id de las propiedades a las que se le aplicara la promocion
     #desarrollo: si unidades no existe o esta vacio la promo se aplicara a todo el desarrollo
     */
    let { properties, real_estate_development, validity } = req.body;
    //*Se crea el modelo de la promocion
    console.log('antes', validity);
    validity = dateFormat(validity);
    const Promotion = new promotionModel({
      title,
      discount,
      validity,
      properties,
      real_estate_development,
    });
    //#crea el campo unidades para que todo funcione bien
    if (properties == undefined) properties = [];
    //*guardar la promocion creada
    const newprom = await Promotion.save();
    res.json({
      message: `promocion creada`,
      newprom,
    });
  } catch (Error) {
    res
      .status(500)
      .json({ message: 'Error al crear la promocion', Error: Error.message });
  }
};

export const allPromotion = async (req, res) => {
  try {
    const { real_estate_development_code } = req.body; //#request
    const promotions = await promotionModel.find({
      'real_estate_development.code': real_estate_development_code,
    });
    res.json(promotions);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Error al devolver promociones' });
  }
};

export const onePromotion = async (req, res) => {
  try {
    const { promotion_id } = req.body;
    if (!promotion_id) return res.json({ message: 'Id requerido' }); //#revisa que manden el Id
    const promotion = await promotionModel.findById(promotion_id);
    res.json(promotion);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Error al buscar la promoción' });
  }
};

export const editPromotion = async (req, res) => {
  try {
    const { _id } = req.body;
    const { ...update } = req.body;
    //*se le agregan las 23:59 hrs
    update.validity = dateFormat(update.validity);
    if (!_id) return res.status(400).json({ message: 'Id no especificado' });
    //*Se podra cambiar a que propiedades aplicarle la promocion
    const exist = await promotionModel.findByIdAndUpdate(_id, update);
    if (!exist)
      return res
        .status(400)
        .json({ message: 'La promocion especificada no existe' });
    res.json({ msg: 'cambios guardados y aplicados' });
  } catch (Error) {
    res.status(500).json({
      message: Error.message || 'Error al modificar la promocion',
    });
  }
};

export const deletePromotion = async (req, res) => {
  try {
    const { promotion_id } = req.body;
    if (!promotion_id)
      return res.status(500).json({ message: 'Id no especificado' });
    //*Se elimina la promocion
    const data = await promotionModel.findByIdAndDelete(promotion_id);
    if (!data)
      return res
        .status(400)
        .json({ message: 'La promocion especificada no existe' });

    res.json({
      msg: 'Promocion eliminada',
      data,
    });
  } catch (Error) {
    res.status(500).json({
      message: Error.message || 'Error al eliminar promocion',
    });
  }
};
