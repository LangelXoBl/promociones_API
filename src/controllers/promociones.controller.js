import promocionModel from '../models/promociones.model.js';
import propertiesModel from '../models/properties.model.js';

//!depurado
/*const aplicarPromo = (properties, id) => {
  properties.forEach(async (properties) => {
    //*obtiene el id y luego guarda el id de la promo
    let { _id } = properties;
    await propertiesModel.findByIdAndUpdate(_id, { promotion: { _id: id } });
  });
};*/
//!depurado
export const createPromocion = async (req, res) => {
  try {
    const { titulo, descuento, vigencia } = req.body; // #datos de la promo
    /*
     #unidades:Es el array con los id de las propiedades a las que se le aplicara la promocion
     #desarrollo: si unidades no existe o esta vacio la promo se aplicara a todo el desarrollo
     */
    let { unidades, desarrollo } = req.body;
    //*Se crea el modelo de la promocion
    const Promotion = new promocionModel({
      titulo,
      descuento,
      vigencia,
      unidades,
      desarrollo,
    });
    //#crea el campo unidades para que todo funcione bien
    if (unidades == undefined) unidades = [];

    //let properties;
    //*se busca a que propiedades aplicarle la promocion
    /*
    ?Ya no se debe aplicar la promo en la BD ni guardar el Id de la promo, eso se hace cuando se consultan las propiedades
    if (unidades.length > 0) {
      //#recive un array con los Id de propiedades y crea un nuevo array de objetos con los datos de las
      //# propiedades para poder aplicarle la promocion
      properties = await Promise.all(
        unidades.map(async (id) => {
          return await propertiesModel.findById(id, '_id promotion');
        })
      );
      console.log('aplicando a propiedades');
      if (properties.length <= 0)
        return res.status(400).json({
          msg: 'La propiedad especificada no existe',
        });
    } else if (desarrollo) {
      properties = await propertiesModel.find(
        {
          'real_estate_development.code': desarrollo.code,
          'pricing.price': { $gt: 0 },
        },
        '_id promotion'
      );
      console.log('Aplicando a todo el desarrollo');
    } else {
      return res.json({
        msg: 'No se especifico a que propiedades aplicarle la promocion',
      });
    }*/

    //*Revisa si las propiedades selecionadas ya tiene una promo vigente
    /*const existProm = properties.filter(
      (propertie) => propertie.promotion._id != undefined
    );
    //console.log(existProm);
    if (existProm.length > 0)
      return res.status(400).json({
        msg: 'Esta o algunas propiedades selecionadas ya tienen una promocion',
        list: existProm,
      });*/
    //*se aplican las promociones
    //aplicarPromo(properties, Promotion.id);
    //*guardar la promocion creada
    const nwprom = await Promotion.save();
    res.json({
      message: `promocion creada y aplicada`,
      //Properties_afectados: properties.length,
      nwprom,
    });
  } catch (Error) {
    res
      .status(500)
      .json({ message: 'Error al crear la promocion', Error: Error.message });
  }
};

export const misPromociones = async (req, res) => {
  try {
    const { development_code } = req.body; //#request
    const promotions = await promocionModel.find({
      'desarrollo.code': development_code,
    });
    res.json(promotions);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Error al devolver promociones' });
  }
};

export const onePromocion = async (req, res) => {
  try {
    const { promotion_id } = req.body;
    if (!promotion_id) return res.json({ message: 'Id requerido' }); //#revisa que manden el Id
    const promo = await promocionModel.findById(promotion_id);
    res.json(promo);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Error al buscar la promoción' });
  }
};
/*
!Mejorar el algoritmo identificar si seleciona todo el desarrollo o no, se puede reusar el algoritmo de crear
?Lo mejor seria que cuando se actualize una promo se elimine de las propiedades ya aplicadas y se vuelva a aplicar
*Esto seria para que se le aplique el nuevo descuento en cado de que se haya modificado
*/
export const editPromocion = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({ message: 'Id no especificado' });
    //*Se podra cambiar a que propiedades aplicarle la promocion
    const actu = await promocionModel.findByIdAndUpdate(_id, req.body);
    //*busca las propiedades afectadas por la promocion
    /*await propertiesModel.updateMany(
      //#Quita las promociones de todos los que aplico
      { 'promotion._id': _id },
      { promotion: {} }
    );*/
    /*let properties;
    //console.log(req.body.unidades);
    if (req.body.unidades.length > 0) {
      //#recive un array con los Id de propiedades y crea un nuevo array de objetos con los datos de las
      //# propiedades para poder aplicarle la promocion
      properties = await Promise.all(
        req.body.unidades.map(async (id) => {
          return await propertiesModel.findById(id, '_id promotion');
        })
      );
      console.log('aplicando a propiedades');
      if (properties.length <= 0)
        return res.status(400).json({
          msg: 'La propiedad especificada no existe',
        });
    }*/
    //*Se modifica el precio de promocion de las propiedades
    //aplicarPromo(properties, _id);
    res.json({ msg: 'cambios guardados y aplicados' /*properties*/ });
  } catch (Error) {
    res.status(500).json({
      message: Error.message || 'Error al modificar la promocion',
    });
  }
};

export const deletePromocion = async (req, res) => {
  try {
    const { promotion_id } = req.body;
    if (!promotion_id)
      return res.status(500).json({ message: 'Id no especificado' });
    //*Se eliminan el campo promociones de las propiedades afectadas
    /*const eliminados = await propertiesModel.updateMany(
      { 'promotion._id': promotion_id },
      { promotion: {} }
    );*/
    //*Se elimina la promocion
    await promocionModel.findByIdAndDelete(promotion_id);
    res.json({
      msg: 'Promocion eliminada',
      //Properties_afectados: eliminados.modifiedCount,
    });
  } catch (Error) {
    res.status(500).json({
      message: Error.message || 'Error al eliminar promocion',
    });
  }
};
