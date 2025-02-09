import Joi, { ValidationResult } from 'joi';
import { IStorageProps } from './storage';
import { DataStatus } from '../../types';

const storageSchema = Joi.object<IStorageProps>({
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required().email(),
  capacity: Joi.string().required(),
  status: Joi.string()
    .required()
    .valid(
      ...Object.values(DataStatus).filter((status) => status === DataStatus.ACTIVE || status === DataStatus.INACTIVE)
    )
});

function validateStorage(storage: IStorageProps): ValidationResult<IStorageProps> {
  return storageSchema.validate(storage, { abortEarly: false });
}

const updateStorageSchema = storageSchema.fork(Object.keys(storageSchema.describe().keys), (schema) =>
  schema.optional()
);

const validateUpdateStorageSchema = (update: Partial<IStorageProps>): Joi.ValidationResult<Partial<IStorageProps>> => {
  return updateStorageSchema.validate(update, { abortEarly: false });
};

export { validateStorage, validateUpdateStorageSchema };
