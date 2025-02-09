class GetProductBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class GetProductNotFoundError extends Error {
  constructor() {
    super('Product not found');
  }
}

export { GetProductBadRequestError, GetProductNotFoundError };
