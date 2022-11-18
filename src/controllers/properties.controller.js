import propertiesModel from '../models/properties.model.js';
import promocionesModel from '../models/promotions.model.js';
import developmentModel from '../models/development.model.js';

export const propertiesList = async (req, res) => {
  try {
    const { real_estate_development_code } = req.body; //#request
    const list = await propertiesModel.find(
      { 'real_estate_development.code': real_estate_development_code },
      '_id floor.name code'
    );
    if (list.length == 0)
      return res.status(400).json({ message: 'El desarrollo no existe' });
    return res.json({ message: `Num Properties Found ${list.length}`, list });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const promotion = async (req, res) => {
  try {
    const { real_estate_development_code } = req.body; //#request
    //#Son los campos de las promociones que no quiero traer
    const project = {
      properties: 0,
      real_estate_development: 0,
      createdAt: 0,
      updatedAt: 0,
    };
    //#devuelve las propiedades con todas las promociones aplicadas
    const Property = await propertiesModel.aggregate([
      {
        $match: {
          'real_estate_development.code': real_estate_development_code,
        },
      },
      {
        $lookup: {
          from: 'promotions',
          localField: '_id',
          foreignField: 'properties',
          pipeline: [
            { $match: { validity: { $gt: new Date() } } }, //#revisa que la vigencia sea mayor a la fecha actual
            { $project: project },
          ],
          as: 'promotions',
        },
      },
    ]);
    //#Busca las promociones que se apliquen a todo el desarrollo
    const Development = await developmentModel.aggregate([
      {
        $match: {
          code: real_estate_development_code,
        },
      },
      {
        $lookup: {
          from: 'promotions',
          localField: 'code',
          foreignField: 'real_estate_development.code',
          pipeline: [
            {
              $match: {
                validity: { $gt: new Date() },
                properties: { $size: 0 }, //#revisa si el campo properties esta vacio, eso significa que la promo es a todo el desarrollo
              },
            },
            { $project: project },
          ],
          as: 'promotions',
        },
      },
    ]);
    res.json({
      Message: `Num Properties Found: ${Property.length}`,
      Data: { Property, Development },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//#Para consultar las promociones de una propiedad
//!Mejorar para que solo se mande una promo o mandarlo dentro del data
export const property = async (req, res) => {
  const { property_id } = req.body;
  console.log(property_id);
  try {
    const data = await propertiesModel.findById(property_id);
    const promo = await promocionesModel.find({ unidades: property_id });
    const dev = await promocionesModel.find({
      'desarrollo.code': data.real_estate_development.code,
      unidades: { $size: 0 },
    });

    res.json({ data, promo, dev });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
