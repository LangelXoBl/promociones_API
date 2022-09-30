import propertiesModel from "../models/properties.model.js";

export const properties = async (req, res) => {
  const all = await propertiesModel.find({});
  res.json(all);
};
