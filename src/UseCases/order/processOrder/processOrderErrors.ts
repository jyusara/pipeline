class ProcessOrderBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export { ProcessOrderBadRequestError };
