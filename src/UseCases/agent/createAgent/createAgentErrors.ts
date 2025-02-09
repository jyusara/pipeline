class CreateAgentBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class AgentAlreadyRegisteredError extends Error {
  constructor(message = 'Agent already registered') {
    super(message);
  }
}

class AgentInvalidRoleError extends Error {
  constructor() {
    super('Invalid role: the role must be one of the predefined roles');
  }
}

class AgentInvalidDataStatusError extends Error {
  constructor() {
    super('Invalid data status: the status must be one of the predefined statuses');
  }
}

class AgentMissingWorkingTimeError extends Error {
  constructor() {
    super('Invalid working time: startWorkingTime and endWorkingTime must be valid and required');
  }
}

class AgentInvalidEmailError extends Error {
  constructor() {
    super('Invalid email format');
  }
}

export {
  CreateAgentBadRequestError,
  AgentAlreadyRegisteredError,
  AgentInvalidRoleError,
  AgentInvalidDataStatusError,
  AgentMissingWorkingTimeError,
  AgentInvalidEmailError
};
