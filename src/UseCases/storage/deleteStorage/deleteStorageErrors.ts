class DeleteStorageBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class DeleteStorageNotFoundError extends Error {
  constructor() {
    super('Storage not found');
  }
}

export { DeleteStorageBadRequestError, DeleteStorageNotFoundError };
