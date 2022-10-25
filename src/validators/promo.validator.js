import { body } from 'express-validator';
import { validationResult } from 'express-validator';

export const promoValidate = [
  body('titulo')
    .exists()
    .withMessage('El titulo es requerido')
    .isLength({ max: 200 })
    .withMessage('Max 200 caracteres'),
  body('desarrollo').exists().withMessage('El desarrollo es necesario'),
  body('descuento.tipo').exists().withMessage('Es requerido'),
  body('descuento.cantidad')
    .exists()
    .withMessage('Es requerido')
    .isNumeric()
    .withMessage('Debe ser de tipo num'),
  body('vigencia').isDate(),
  (req, res, next) => {
    const Errors = validationResult(req);
    if (!Errors.isEmpty())
      return res.status(400).json({ Errors: Errors.array() });
    return next();
  },
];
