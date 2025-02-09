class GetAgentBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class GetAgentNotFoundError extends Error {
  constructor() {
    super('Agent not found');
  }
}

class GetAgentIdNotValidError extends Error {
  constructor() {
    super('The provided ID is not valid.');
  }
}

export { GetAgentBadRequestError, GetAgentNotFoundError, GetAgentIdNotValidError };
