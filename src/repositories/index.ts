import { OrderImplRepository } from './impl/orderImplRepository';
import { ProductImplRepository } from './impl/productImplRepository';
import { IProductRepository } from './product.repository';
import { IOrderRepository } from './order.repository';
import { AgentImplRepository } from './impl/agentImplRepository';
import { IAgentRepository } from './agent.repository';
import { ProviderImplRepository } from './impl/providerImplRepository';
import { StorageImplRepository } from './impl/storageImplRepository';
import { PurchaseImplRepository } from './impl/purchaseImplRepository';

const productRepository = new ProductImplRepository();
const orderRepository = new OrderImplRepository();
const agentRepository = new AgentImplRepository();
const providerRepository = new ProviderImplRepository();
const storageRepository = new StorageImplRepository();
const purchaseRepository = new PurchaseImplRepository();

export {
  productRepository,
  IProductRepository,
  orderRepository,
  IOrderRepository,
  agentRepository,
  IAgentRepository,
  providerRepository,
  storageRepository,
  purchaseRepository
};
