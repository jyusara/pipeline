class UpdatePurchaseBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class UpdatePurchaseInvalidIdError extends Error {
  constructor() {
    super('Invalid id');
  }
}

class UpdatePurchaseNotFoundError extends Error {
  constructor() {
    super('Purchase not found');
  }
}

class UpdatePurchaseProviderNotFoundError extends Error {
  constructor() {
    super('Provider not found');
  }
}

class UpdatePurchaseStorageNotFoundError extends Error {
  constructor() {
    super('Storage not found');
  }
}

export {
  UpdatePurchaseBadRequestError,
  UpdatePurchaseInvalidIdError,
  UpdatePurchaseNotFoundError,
  UpdatePurchaseProviderNotFoundError,
  UpdatePurchaseStorageNotFoundError
};
