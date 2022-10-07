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
      .status(500)
      .json({ message: Error.message || 'Error al devolver properties' });
  }
};
