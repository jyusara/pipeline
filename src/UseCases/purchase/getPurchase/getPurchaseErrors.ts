class GetPurchaseInvalidIdError extends Error {
  constructor() {
    super('Invalid id');
  }
}

class GetPurchaseNotFoundError extends Error {
  constructor() {
    super('Purchase not found');
  }
}

export { GetPurchaseInvalidIdError, GetPurchaseNotFoundError };
