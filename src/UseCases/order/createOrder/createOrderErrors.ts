class CreateOrderBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export { CreateOrderBadRequestError };
