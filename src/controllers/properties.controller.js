import propertiesModel from '../models/properties.model.js';
import promocionesModel from '../models/promociones.model.js';
import developmentModel from '../models/development.model.js';

/*export const properties = async (req, res) => {
  try {
    const { real_estate_development_code } = req.body;
    const properties = await propertiesModel.find({
      'real_estate_development.code': real_estate_development_code,
    });
    res.json({ properties });
  } catch (Error) {
    res
      .status(400)
      .json({ message: Error.message || 'Error al devolver properties' });
  }
};*/

/*export const orderFloor = async (req, res) => {
  try {
    const { real_estate_development_code } = req.body; //#request
    const floor = await propertiesModel.aggregate([
      {
        $match: {
          //#Treae las propiedades del desarrollo
          'real_estate_development.code': real_estate_development_code,
        },
      },
      {
        $group: {
          //#Agrupa las propiedades por el nombre del nivel
          _id: '$floor.name',
          //#los guarda en un array con su code e id
          children: { $push: { id: '$_id', name: '$code' } },
        },
      },
      {
        //#Agrega esos campos para que sea usado en el front
        $addFields: { name: '$_id', id: '$_id' },
      },
      { $sort: { 'children.name': 1 } },
    ]);
    res.json(floor);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};*/

export const propertiesList = async (req, res) => {
  try {
    const { real_estate_development_code } = req.body; //#request
    const list = await propertiesModel.find(
      { 'real_estate_development.code': real_estate_development_code },
      '_id floor.name code'
    );
    if (list.length == 0)
      return res
        .status(400)
        .json({ message: 'El desarrollo no tiene propiedades' });
    return res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const promotion = async (req, res) => {
  try {
    const { real_estate_development_code } = req.body; //#request
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
          foreignField: 'unidades',
          pipeline: [
            { $match: { vigencia: { $gt: new Date() } } },
            {
              $project: {
                unidades: 0,
                desarrollo: 0,
                createdAt: 0,
                updatedAt: 0,
              },
            },
          ],
          as: 'promotion',
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
          foreignField: 'desarrollo.code',
          pipeline: [
            {
              $match: { vigencia: { $gt: new Date() }, unidades: { $size: 0 } },
            },
            {
              $project: {
                unidades: 0,
                desarrollo: 0,
                createdAt: 0,
                updatedAt: 0,
              },
            },
          ],
          as: 'promotion',
        },
      },
    ]);
    //const development= await pr
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
