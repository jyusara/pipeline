import Joi from 'joi';
import { DataStatus, OriginData } from './origins';

export const ObjectIdPattern = /^[0-9a-fA-F]{24}$/;
export const BaseOriginSchema = {
  origin: Joi.string()
    .required()
    .valid(...Object.values(OriginData)),
  comment: Joi.string().optional(),
  registerStatus: Joi.string()
    .optional()
    .valid(...Object.values(DataStatus)),
  status: Joi.string()
    .optional()
    .valid(...Object.values(DataStatus))
    .default(DataStatus.ACTIVE)
};
