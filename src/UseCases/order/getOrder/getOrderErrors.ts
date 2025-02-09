class GetOrderBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class GetOrderNotFoundError extends Error {
  constructor() {
    super('Order not found');
  }
}

export { GetOrderBadRequestError, GetOrderNotFoundError };
