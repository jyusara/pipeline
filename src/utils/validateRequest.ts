import Joi, { ValidationResult } from 'joi';
import { GenericFilters, GenericObject } from '../types';
import { err, ok, Result } from 'neverthrow';

function requestValidator<T>(schema: Joi.ObjectSchema<any>, data: GenericObject): ValidationResult<T> {
  return schema.validate(data, { abortEarly: false, convert: false });
}

function createInstanceOrError<T>(schema: Joi.ObjectSchema<any>, data: GenericObject): Result<T, string> {
  const { error } = requestValidator<T>(schema, data);
  if (error) {
    const errors = error.details.map((detail) => detail.message).join('. ');
    return err<T>(errors);
  }
  return ok<T>(data as T);
}

const genericFiltersSchema = Joi.object<GenericFilters>({
  limit: Joi.number().integer().min(1).optional(),
  page: Joi.number().integer().min(1).optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional()
});

export { createInstanceOrError, genericFiltersSchema };
