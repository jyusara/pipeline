import { err, ok, Result } from 'neverthrow';
import { validateStorage, validateUpdateStorageSchema } from './storage.validation';

export interface IStorageProps {
  name: string;
  address: string;
  phone: string;
  email: string;
  capacity: string;
  status: string;
}

export class Storage {
  id: string;

  name: string;

  address: string;

  phone: string;

  email: string;

  capacity: string;

  status: string;

  constructor(props: IStorageProps) {
    Object.assign(this, props);
  }

  static create(props: IStorageProps): Result<Storage, string> {
    const { error } = validateStorage(props);
    if (error) {
      const storageError = error.details.map((error) => error.message).join('. ');
      return err(storageError);
    }
    return ok(new Storage(props));
  }

  static update(props: IStorageProps): Result<Storage, string> {
    const { error } = validateUpdateStorageSchema(props);
    if (error) {
      const storageError = error.details.map((error) => error.message).join('. ');
      return err(storageError);
    }
    return ok(new Storage(props));
  }
}
