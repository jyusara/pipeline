import { providerRepository } from '../../../repositories';
import GetProviders from './getProviders';

const getProviders = new GetProviders(providerRepository);

export { getProviders };
