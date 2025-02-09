import { err, ok, Result } from 'neverthrow';
import { ProcessOrderResponseDto } from './processOrderResponseDto';
import { createInstanceOrError, UnexpectedError, UseCase } from '../../../utils';
import { ProcessOrderBadRequestError } from './processOrderErrors';
import { ProcessOrderRequestDto } from './processOrderRequestDto';
import { IOrderRepository } from '../../../repositories';
import { ProcessOrderRequest, processOrderSchema } from '../../../domain';
import { createProduct } from '../../../UseCases/product/createProduct';
import { CreateProductRequestDto } from '../../../UseCases/product/createProduct/createProductRequestDto';
import { OriginData } from '../../../types';
import { OrderProcessRequest, ProductRequest } from '../../../repositories/order.repository';

type Response = Result<ProcessOrderResponseDto, UnexpectedError | ProcessOrderBadRequestError>;
type ProcessProductRequest = {
  name: string;
  product_id: number;
  quantity: number | string;
  price: number | string;
  sku: string;
};

class ProcessOrder implements UseCase<ProcessOrderRequestDto, Response> {
  private readonly orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  private async processProducts(
    products: ProcessProductRequest[]
  ): Promise<Result<Partial<ProductRequest>[], ProcessOrderBadRequestError>> {
    const productsPayload: Partial<ProductRequest>[] = [];
    for (const product of products) {
      const payloadToSaveProduct: CreateProductRequestDto = {
        name: product.name,
        price: Number(product.price),
        origin: OriginData.ONLINE,
        sku: product.sku,
        externalProductId: product.product_id.toString()
      };
      const productResult = await createProduct.execute(payloadToSaveProduct);
      if (productResult.isErr()) {
        return err(new ProcessOrderBadRequestError(productResult.error.message));
      }
      productsPayload.push({
        productId: productResult.value.id,
        quantity: Number(product.quantity),
        price: Number(product.price)
      });
    }
    return ok(productsPayload);
  }

  async execute(request: ProcessOrderRequestDto, service?: any): Promise<Response> {
    try {
      const validateRequest = createInstanceOrError<ProcessOrderRequest>(processOrderSchema, request);

      if (validateRequest.isErr()) {
        return err(new ProcessOrderBadRequestError(validateRequest.error));
      }

      const { products, client, store, order: sendingOrder } = validateRequest.value;

      const existsOrder = await this.orderRepository.validateExistOrder(sendingOrder.name);

      if (existsOrder) {
        return err(new ProcessOrderBadRequestError('Order already exists.'));
      }

      let productsPayload: Partial<ProductRequest>[] = [];

      const processProductsResult = await this.processProducts(products);

      if (processProductsResult.isErr()) {
        return err(processProductsResult.error);
      }

      productsPayload = processProductsResult.value;

      const orderProcessRequest: OrderProcessRequest = {
        orderNumber: sendingOrder.name,
        client: {
          name: client.first_name,
          lastname: client.last_name,
          phone: client.phone,
          country: client.country,
          department: client.city,
          address: client.address
        },
        advancePayment: 0,
        agencyCost: 0,
        discount: 0,
        origin: OriginData.ONLINE,
        storeName: store.name
      };
      const order = await this.orderRepository.processOrderToWebhook(orderProcessRequest, productsPayload);
      return ok(order);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default ProcessOrder;
