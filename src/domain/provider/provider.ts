import { DataStatus } from '../../types';
import { err, ok, Result } from 'neverthrow';
import { validatePartialProvider, validateProvider } from './provider.validation';

export interface IProviderProps {
  name: string;
  ruc: string;
  phone: string;
  addressLine?: string;
  email?: string;
  status: DataStatus;
  referencePhoneNumber: string;
  referenceContactName: string;
  accountNumber?: string;
  businessCategory?: string;
}

export class Provider {
  id: string;

  name: string;

  ruc: string;

  phone: string;

  addressLine?: string;

  email?: string;

  status: DataStatus;

  referencePhoneNumber: string;

  referenceContactName: string;

  accountNumber?: string;

  businessCategory?: string;

  constructor(props: IProviderProps) {
    Object.assign(this, props);
  }

  static create(props: IProviderProps): Result<Provider, string> {
    const { error } = validateProvider(props);
    if (error) {
      const providerErrors = error.details.map((error) => error.message).join('. ');
      return err(providerErrors);
    }
    return ok(new Provider(props));
  }

  static partialCreate(props: IProviderProps): Result<Provider, string> {
    const { error } = validatePartialProvider(props);
    if (error) {
      const providerErrors = error.details.map((error) => error.message).join('. ');
      return err(providerErrors);
    }
    return ok(new Provider(props));
  }
}
