import CreateStorage from './createStorage';
import { storageRepository } from '../../../repositories';

const createStorage = new CreateStorage(storageRepository);

export { createStorage };
