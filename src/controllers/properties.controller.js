import propertiesModel from '../models/properties.model.js';
import promocionesModel from '../models/promociones.model.js';

export const properties = async (req, res) => {
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
};

export const orderFloor = async (req, res) => {
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
};

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
    const proper = await propertiesModel.aggregate([
      {
        $match: {
          'real_estate_development.code': real_estate_development_code,
        },
      },
      {
        $lookup: {
          from: 'promotions',
          localField: 'promotion._id',
          foreignField: '_id',
          pipeline: [
            { $match: { vigencia: { $gt: new Date() } } },
            {
              $project: {
                _id: 0,
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
    res.json(proper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
