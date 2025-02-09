class GetProviderInvalidIdError extends Error {
  constructor() {
    super('Invalid id');
  }
}

class GetProviderNotFoundError extends Error {
  constructor() {
    super('Provider not found');
  }
}

export { GetProviderInvalidIdError, GetProviderNotFoundError };
