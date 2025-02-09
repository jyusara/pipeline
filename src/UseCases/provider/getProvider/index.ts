import { providerRepository } from '../../../repositories';
import GetProvider from './getProvider';

const getProvider = new GetProvider(providerRepository);

export { getProvider };
