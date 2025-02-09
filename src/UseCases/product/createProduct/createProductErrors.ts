class CreateProductBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export { CreateProductBadRequestError };
