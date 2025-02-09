class DeleteProviderInvalidIdError extends Error {
  constructor() {
    super('Invalid id');
  }
}

class DeleteProviderNotFoundError extends Error {
  constructor() {
    super('Provider not found');
  }
}

export { DeleteProviderInvalidIdError, DeleteProviderNotFoundError };
