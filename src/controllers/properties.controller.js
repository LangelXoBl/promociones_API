import propertiesModel from '../models/properties.model.js';
import promocionesModel from '../models/promociones.model.js';

export const properties = async (req, res) => {
  try {
    
    /*
    #Para agregar las promociones a properties:
    #buscar las properties y selecionar su _id
    #despues modificar con el algoritmo en rojo
    */
    const promo = await promocionesModel.find({});
    /*
    !Se puede usar para modificar el campo promotion de properties
    promo.forEach(async (x) => {
      await promocionesModel.findByIdAndUpdate(x._id, {
        x,
        descuento: {
          tipo: 'Fijo',
          cantidad: '5000',
          facilidades: [],
        },
      });

      x.save;
    });*/

    //#update con updatemany
    //const upt=await promocionesModel.updateMany({desarrollo:{code:"the-boat"}},{descuento:{cantidad:"5000",tipo:"fijo",facilidades:[]}})
    
    res.json({ promo });
  } catch (Error) {
    res
      .status(500)
      .json({ message: Error.message || 'Error al devolver properties' });
  }
};
