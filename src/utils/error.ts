export class UnexpectedError extends Error {
  constructor(error: any) {
    console.error(error);
    super('An unexpected error occurred. Please try again later.');
    this.name = 'UnexpectedError';
  }
}
