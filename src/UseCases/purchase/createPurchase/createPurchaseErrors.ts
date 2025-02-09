class CreatePurchaseBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class CreatePurchaseProviderNotfoundError extends Error {
  constructor() {
    super('Provider not found');
  }
}

class CreatePurchaseStorageNotfoundError extends Error {
  constructor() {
    super('Storage not found');
  }
}

export { CreatePurchaseBadRequestError, CreatePurchaseProviderNotfoundError, CreatePurchaseStorageNotfoundError };
