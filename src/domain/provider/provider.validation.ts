import Joi from 'joi';
import { IProviderProps } from './provider';

const providerSchema = Joi.object<IProviderProps>({
  name: Joi.string().required(),
  ruc: Joi.string().required(),
  phone: Joi.string().required,
  addressLine: Joi.string().optional(),
  email: Joi.string().email().optional(),
  status: Joi.string().required().valid('active', 'inactive'),
  referencePhoneNumber: Joi.string().required(),
  referenceContactName: Joi.string().required(),
  accountNumber: Joi.string().optional,
  businessCategory: Joi.string().optional()
});

const partialProviderSchema = providerSchema.fork(Object.keys(providerSchema.describe().keys), (key) => key.optional());

function validateProvider(provider: IProviderProps): Joi.ValidationResult<IProviderProps> {
  return providerSchema.validate(provider, { abortEarly: false });
}

function validatePartialProvider(provider: Partial<IProviderProps>): Joi.ValidationResult<Partial<IProviderProps>> {
  return partialProviderSchema.validate(provider, { abortEarly: false });
}

export { validateProvider, validatePartialProvider };
