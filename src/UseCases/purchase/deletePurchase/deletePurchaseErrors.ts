class DeletePurchaseInvalidIdError extends Error {
  constructor() {
    super('Invalid id');
  }
}

class DeletePurchaseNotFoundError extends Error {
  constructor() {
    super('Purchase not found');
  }
}

export { DeletePurchaseInvalidIdError, DeletePurchaseNotFoundError };
