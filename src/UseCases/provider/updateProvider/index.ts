import { providerRepository } from '../../../repositories';
import UpdateProvider from './updateProvider';

const updateProvider = new UpdateProvider(providerRepository);

export { updateProvider };
