class AgentUpdateNotFoundError extends Error {
  constructor() {
    super('Agent not found.');
  }
}

class AgentUpdateIdNotValidError extends Error {
  constructor() {
    super('The provided ID is not valid.');
  }
}

class AgentUpdateAlreadyAssigned extends Error {
  constructor(message = 'Some values ​​have already been assigned to another Agent.') {
    super(message);
  }
}

class AgentUpdateBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export { AgentUpdateNotFoundError, AgentUpdateBadRequestError, AgentUpdateIdNotValidError, AgentUpdateAlreadyAssigned };
