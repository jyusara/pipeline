import { err, ok, Result } from 'neverthrow';
import { GetOrderResponseDto } from './getOrderResponseDto';
import { UnexpectedError, UseCase } from '../../../utils';
import { GetOrderBadRequestError, GetOrderNotFoundError } from './getOrderErrors';
import { GetOrderRequestDto } from './getOrderRequestDto';
import { IOrderRepository } from '../../../repositories';

type Response = Result<GetOrderResponseDto, UnexpectedError | GetOrderBadRequestError | GetOrderNotFoundError>;

class GetOrder implements UseCase<GetOrderRequestDto, Response> {
  private readonly orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(request: GetOrderRequestDto, service?: any): Promise<Response> {
    try {
      const { id } = request;
      const order = await this.orderRepository.getOrder(id);

      if (!order) {
        return err(new GetOrderNotFoundError());
      }

      return ok(order);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default GetOrder;
