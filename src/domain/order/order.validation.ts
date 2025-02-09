import Joi, { ValidationResult } from 'joi';
import { IOrderProps } from './order';
import { BaseOriginSchema, ObjectIdPattern } from '../../types';
import { IOrderDetailProps } from './orderDetail';

export interface ProcessOrderRequest {
  order: {
    name: string;
    date: string;
  };
  products: {
    product_id: number;
    name: string;
    quantity: string;
    price: string;
    sku: string;
  }[];
  client: {
    first_name: string;
    last_name: string;
    phone: string;
    country: string;
    city: string;
    address: string;
  };
  store: {
    app_id: number;
    name: string;
  };
}

const orderSchema = Joi.object<IOrderProps>({
  orderNumber: Joi.string().optional(),
  storeName: Joi.string().required(),
  agency: Joi.string().optional(),
  agent: Joi.string().optional(),
  client: Joi.object({
    name: Joi.string().required(),
    lastname: Joi.string().optional(),
    documentNumber: Joi.string().required(),
    phone: Joi.string().optional(),
    country: Joi.string().optional(),
    department: Joi.string().optional(),
    province: Joi.string().optional(),
    address: Joi.string().optional(),
    reference: Joi.string().optional(),
    email: Joi.string().required()
  }).required(),
  agencyCost: Joi.number().required(),
  advancePayment: Joi.number().required(),
  pendingPayment: Joi.number().required(),
  subtotal: Joi.number().required(),
  discount: Joi.number().required(),
  total: Joi.number().required(),
  orderDetail: Joi.array().items(Joi.string()).optional(),
  deliveryType: Joi.string().optional(),
  paymentMethod: Joi.string().optional(),
  observation: Joi.string().optional(),
  contactedStatus: Joi.string().optional(),
  ...BaseOriginSchema
});

const orderDetailValidation = Joi.object<IOrderDetailProps>({
  order: Joi.string().required().pattern(ObjectIdPattern),
  product: Joi.string().optional().pattern(ObjectIdPattern),
  quantity: Joi.number().required(),
  review: Joi.string().optional(),
  customProduct: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    externalProductId: Joi.string().optional(),
    sku: Joi.string().required()
  }).optional(),
  ...BaseOriginSchema,
  origin: Joi.string().optional()
}).messages({
  'pattern.base': 'Invalid Id, received {#value} and expected a valid ObjectId'
});

const processOrderSchema = Joi.object<ProcessOrderRequest>({
  order: Joi.object({
    name: Joi.string().required(),
    date: Joi.string().optional()
  }).required(),
  products: Joi.array()
    .items(
      Joi.object({
        product_id: Joi.number().required(),
        name: Joi.string().required(),
        quantity: Joi.string().required(),
        price: Joi.string().required(),
        sku: Joi.string().required()
      })
    )
    .required(),
  client: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required()
  }).required(),
  store: Joi.object({
    app_id: Joi.any().optional(),
    name: Joi.string().required()
  }).required()
});

function validateOrder(props: IOrderProps): ValidationResult<IOrderProps> {
  return orderSchema.validate(props, { abortEarly: false });
}

function validateOrderDetail(props: IOrderDetailProps): ValidationResult<IOrderDetailProps> {
  return orderDetailValidation.validate(props, { abortEarly: false });
}

export { validateOrder, validateOrderDetail, processOrderSchema };
