import mongoose, { model, Schema } from 'mongoose';
import { IAgentDb, IOrderDb, IOrderDetailDb, IProductDb, IProviderDb, IStorageDb } from './interfaces';
import { DataStatus, OriginData, Roles } from '../types';
import { IPurchaseDb } from './interfaces/purchase.interface';
import { required } from 'joi';

mongoose.plugin((schema) => {
  schema.set('timestamps', true);
  schema.set('versionKey', false);
});

const productSchema = new Schema<IProductDb>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  externalProductId: { type: String },
  sku: { type: String, default: '' },
  origin: { type: String, enum: Object.values(OriginData), required: true },
  comment: { type: String, default: '' },
  registerStatus: { type: String, enum: Object.values(DataStatus), required: true },
  status: { type: String, enum: Object.values(DataStatus), default: DataStatus.ACTIVE, required: true }
});

const agentSchema = new Schema<IAgentDb>({
  name: { type: String, required: true },
  lastname: { type: String },
  startWorkingTime: { type: String, required: true },
  endWorkingTime: { type: String, required: true },
  address: { type: String },
  documentNumber: { type: String, unique: true }, //*
  email: { type: String, unique: true }, //*
  phone: { type: String },
  role: { type: String, enum: Object.values(Roles), required: true, default: Roles.AGENT },
  status: { type: Boolean, required: true, default: true },
  registreStatus: { type: String, required: true, default: true },
  assigned: { type: Boolean, required: true }
});

const orderSchema = new Schema<IOrderDb>({
  orderNumber: { type: String },
  storeName: { type: String, required: true },
  agency: { type: String },
  agent: { type: Schema.Types.ObjectId, ref: 'Agent', required: false, default: null },
  client: {
    _id: { type: String },
    name: { type: String },
    lastname: { type: String },
    documentNumber: { type: String },
    phone: { type: String },
    country: { type: String },
    department: { type: String },
    province: { type: String },
    email: { type: String },
    address: { type: String },
    reference: { type: String }
  },
  agencyCost: { type: Number, required: true, default: 0 },
  advancePayment: { type: Number, required: true, default: 0 },
  pendingPayment: { type: Number, required: true, default: 0 },
  subtotal: { type: Number, required: true, default: 0 },
  discount: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true, default: 0 },
  orderDetail: [{ type: Schema.Types.ObjectId, ref: 'OrderDetail', default: null }],
  deliveryType: { type: String },
  paymentMethod: { type: String },
  observation: { type: String },
  contactedStatus: { type: String },
  comment: { type: String },
  origin: { type: String, enum: Object.values(OriginData), required: true },
  registerStatus: { type: String, enum: Object.values(DataStatus), required: true },
  status: { type: String, enum: Object.values(DataStatus), default: DataStatus.ACTIVE, required: true }
});

const orderDetailSchema = new Schema<IOrderDetailDb>({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: false, default: null },
  quantity: { type: Number, required: true },
  comment: { type: String },
  review: { type: String },
  customProduct: {
    name: { type: String },
    price: { type: Number },
    externalProductId: { type: String },
    sku: { type: String }
  }
});

const providerSchema = new Schema<IProviderDb>({
  name: { type: String, required: true },
  ruc: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  addressLine: { type: String },
  email: { type: String },
  status: { type: String, enum: Object.values(DataStatus), required: true, default: DataStatus.ACTIVE },
  referencePhoneNumber: { type: String, required: true },
  referenceContactName: { type: String, required: true },
  accountNumber: { type: String },
  businessCategory: { type: String }
});

const storageSchema = new Schema<IStorageDb>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  capacity: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: Object.values(DataStatus).filter((status) => status === DataStatus.ACTIVE || status === DataStatus.INACTIVE)
  }
});

const purchaseSchema = new Schema<IPurchaseDb>({
  products: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      boxes: { type: Number },
      sku: { type: String }
    }
  ],
  referencePurchaseNumber: { type: String },
  provider: { type: Schema.Types.ObjectId, ref: 'Provider', required: true },
  storage: { type: Schema.Types.ObjectId, ref: 'Storage', required: true },
  confirmed: { type: Boolean, required: true },
  subTotal: { type: Number, required: true },
  total: { type: Number, required: true },
  discount: { type: Number },
  observation: { type: String },
  currency: { type: String, required: true },
  paymentType: { type: String, required: true },
  conditionPayment: { type: String, required: true },
  paymentReference: { type: String, required: true },
  numberOfBoxes: { type: Number },
  active: { type: Boolean, required: true }
});

const productModel = model<IProductDb>('Product', productSchema, 'products');
const orderModel = model<IOrderDb>('Order', orderSchema, 'orders');
const orderDetailModel = model<IOrderDetailDb>('OrderDetail', orderDetailSchema, 'orderDetails');
const agentModel = model<IAgentDb>('Agent', agentSchema, 'agents');
const providerModel = model<IProviderDb>('Provider', providerSchema, 'providers');
const storageModel = model<IStorageDb>('Storage', storageSchema, 'storages');
const purchaseModel = model<IPurchaseDb>('Purchase', purchaseSchema, 'Purchases');

export { productModel, orderModel, orderDetailModel, agentModel, providerModel, storageModel, purchaseModel };
