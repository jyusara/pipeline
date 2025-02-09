import Joi from 'joi';
import { IProductProps } from './product';
import { BaseOriginSchema, OriginData } from '../../types';

const productSchema = Joi.object<IProductProps>({
  name: Joi.string().required(),
  price: Joi.number().required(),
  externalProductId: Joi.string().optional(),
  sku: Joi.string().required(),
  ...BaseOriginSchema
});

const productOriginSchema = Joi.object({
  origin: Joi.string()
    .required()
    .valid(...Object.values(OriginData))
});

const partialProductSchema = productSchema.fork(Object.keys(productSchema.describe().keys), (key) => key.optional());

function validateProduct(product: IProductProps): Joi.ValidationResult<IProductProps> {
  return productSchema.validate(product, { abortEarly: false });
}

function validatePartialProduct(product: Partial<IProductProps>): Joi.ValidationResult<Partial<IProductProps>> {
  return partialProductSchema.validate(product, { abortEarly: false });
}

export { validateProduct, productOriginSchema, validatePartialProduct };
