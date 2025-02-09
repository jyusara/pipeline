class UpdateStorageNotFoundError extends Error {
  constructor() {
    super('Storage not found.');
  }
}

class UpdateStorageIdNotValidError extends Error {
  constructor() {
    super('The provided ID is not valid.');
  }
}

class UpdateStorageAlreadyAssigned extends Error {
  constructor(message = 'Some values ​​have already been assigned to another Storage.') {
    super(message);
  }
}

class UpdateStorageBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export {
  UpdateStorageNotFoundError,
  UpdateStorageBadRequestError,
  UpdateStorageIdNotValidError,
  UpdateStorageAlreadyAssigned
};
