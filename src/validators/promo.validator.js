import { body } from 'express-validator';
import { validationResult } from 'express-validator';

export const promoValidate = [
  body('title')
    .exists({})
    .withMessage('El titulo es requerido')
    .isLength({ max: 200 })
    .withMessage('Max 200 caracteres'),
  body('real_estate_development')
    .exists()
    .withMessage('El desarrollo es necesario'),
  body('discount.type').exists().withMessage('Es requerido'),
  body('discount.quantity')
    .exists()
    .withMessage('Es requerido')
    .isNumeric()
    .withMessage('Debe ser de tipo num'),
  body('validity').isISO8601().toDate(),
  (req, res, next) => {
    const Errors = validationResult(req);
    if (!Errors.isEmpty())
      return res.status(400).json({ Errors: Errors.array() });
    return next();
  },
];
