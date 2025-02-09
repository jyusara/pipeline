import { providerRepository } from '../../../repositories';
import CreateProvider from './createProvider';

const createProvider = new CreateProvider(providerRepository);

export { createProvider };
