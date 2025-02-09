class UpdateProviderBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class UpdateProviderInvalidIdError extends Error {
  constructor() {
    super('Invalid id');
  }
}

class UpdateProviderNotFoundError extends Error {
  constructor() {
    super('Provider not found');
  }
}

export { UpdateProviderBadRequestError, UpdateProviderInvalidIdError, UpdateProviderNotFoundError };
