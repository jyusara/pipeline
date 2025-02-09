class CreateStorageBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class StorageAlreadyRegisteredError extends Error {
  constructor(message = 'Storage already registered') {
    super(message);
  }
}
class StorageCreateAlreadyAssigned extends Error {
  constructor(message = 'Some values ​​have already been assigned to another Storage.') {
    super(message);
  }
}

export { CreateStorageBadRequestError, StorageAlreadyRegisteredError, StorageCreateAlreadyAssigned };
