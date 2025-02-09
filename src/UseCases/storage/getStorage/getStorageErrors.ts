class GetStorageBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class GetStorageIdNotValidError extends Error {
  constructor() {
    super('The provided ID is not valid.');
  }
}

class GetStorageNotFoundError extends Error {
  constructor() {
    super('Storage not found');
  }
}

export { GetStorageBadRequestError, GetStorageNotFoundError, GetStorageIdNotValidError };
