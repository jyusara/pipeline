import { storageRepository } from '../../../repositories';
import GetStorages from './getStorages';

const getStorages = new GetStorages(storageRepository);

export { getStorages };
