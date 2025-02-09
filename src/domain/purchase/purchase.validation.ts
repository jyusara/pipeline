import Joi from 'joi';
import { IPurchaseProps } from './purchase';
import { ObjectIdPattern } from '../../types';
import { PurchaseFilters } from '../../repositories/purchase.repository';

const purchaseSchema = Joi.object<IPurchaseProps>({
  products: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
        boxes: Joi.number().optional(),
        sku: Joi.string().optional()
      })
    )
    .required(),
  referencePurchaseNumber: Joi.string().optional(),
  provider: Joi.string()
    .required()
    .pattern(ObjectIdPattern)
    .messages({ 'string.pattern.base': 'Invalid "provider" object id' }),
  storage: Joi.string()
    .required()
    .pattern(ObjectIdPattern)
    .messages({ 'string.pattern.base': 'Invalid "storage" object id' }),
  confirmed: Joi.boolean().required(),
  subTotal: Joi.number().required(),
  total: Joi.number().required(),
  discount: Joi.number().optional(),
  observation: Joi.string().optional(),
  currency: Joi.string().required(),
  paymentType: Joi.string().required(),
  conditionPayment: Joi.string().required(),
  paymentReference: Joi.string().required(),
  numberOfBoxes: Joi.number().optional(),
  active: Joi.boolean().required()
});

const purchaseFiltersSchema = Joi.object<PurchaseFilters>({
  id: Joi.string().optional().pattern(ObjectIdPattern).messages({ 'string.pattern.base': 'Invalid "id" object id' }),
  referencePurchaseNumber: Joi.string().optional(),
  provider: Joi.string()
    .optional()
    .pattern(ObjectIdPattern)
    .messages({ 'string.pattern.base': 'Invalid "provider" object id' }),
  storage: Joi.string()
    .optional()
    .pattern(ObjectIdPattern)
    .messages({ 'string.pattern.base': 'Invalid "storage" object id' }),
  confirmed: Joi.boolean().optional(),
  currency: Joi.string().optional(),
  paymentType: Joi.string().optional(),
  conditionPayment: Joi.string().optional(),
  paymentReference: Joi.string().optional(),
  active: Joi.boolean().optional()
});

const updatePurchaseSchema = purchaseSchema.fork(Object.keys(purchaseSchema.describe().keys), (key) => key.optional());

function validatePurchase(props: IPurchaseProps): Joi.ValidationResult<IPurchaseProps> {
  return purchaseSchema.validate(props, { abortEarly: false });
}

function validatePurchaseFilters(props: PurchaseFilters): Joi.ValidationResult<PurchaseFilters> {
  return purchaseFiltersSchema.validate(props, { abortEarly: false });
}

export { validatePurchase, purchaseSchema, validatePurchaseFilters, purchaseFiltersSchema, updatePurchaseSchema };
