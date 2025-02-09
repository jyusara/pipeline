import { providerRepository } from '../../../repositories';
import DeleteProvider from './deleteProvider';

const deleteProvider = new DeleteProvider(providerRepository);

export { deleteProvider };
