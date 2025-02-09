class updateProductBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}
class UpdateProductInvalidIdError extends Error {
  constructor() {
    super('Invalid id');
  }
}

class UpdateProductNotFoundError extends Error {
  constructor() {
    super('Product not found');
  }
}

class updateProductRegisterStatusUpdateNotAllowedError extends Error {
  constructor() {
    super('RegisterStatus cannot be updated because it is already valid');
  }
}

export {
  UpdateProductInvalidIdError,
  UpdateProductNotFoundError,
  updateProductBadRequestError,
  updateProductRegisterStatusUpdateNotAllowedError
};
