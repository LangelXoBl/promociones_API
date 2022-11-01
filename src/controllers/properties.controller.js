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
          _id: '$floor.code',
          //#los guarda en un array con su code e id
          properties: { $push: { _id: '$_id', code: '$code' } },
        },
      },
      { $sort: { 'properties.code': 1 } },
    ]);
    res.json(floor);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
