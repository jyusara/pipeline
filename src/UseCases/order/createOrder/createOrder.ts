import { err, Result } from 'neverthrow';
import { CreateOrderRequestDto } from './createOrderRequestDto';
import { UnexpectedError, UseCase } from '../../../utils';
import { CreateOrderBadRequestError } from './createOrderErrors';
import { IOrderRepository } from '../../../repositories';
import { Order } from '../../../domain';

type Response = Result<CreateOrderRequestDto, UnexpectedError | CreateOrderBadRequestError>;

class CreateOrder implements UseCase<CreateOrderRequestDto, Response> {
  private readonly orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(request: CreateOrderRequestDto, service?: any): Promise<Response> {
    try {
      const { order, client, products } = request;
      console.log('Request::', request);
      // const orderOrError = Order.create({
      //     client: client,
      //     ...order,
      // });
      throw new Error('Method not implemented.');
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default CreateOrder;
