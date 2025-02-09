import { InMemoryStorageRepository } from 'src/repositories/impl/inMemoryStorageRepository';
import { IStorageRepository } from 'src/repositories/storage.repository';
import CreateStorage from 'src/UseCases/storage/createStorage/createStorage';
import { CreateStorageRequestDto } from 'src/UseCases/storage/createStorage/createStorageRequestDto';

describe('Test CreateStorage UseCase', () => {
  let createStorage: CreateStorage;
  let storageRepository: IStorageRepository;

  beforeAll(() => {
    storageRepository = new InMemoryStorageRepository();
    createStorage = new CreateStorage(storageRepository);
  });
  it('Success: Create Storage', async () => {
    const request: CreateStorageRequestDto = {
      name: 'test2',
      address: 'Avenida Mexico 444, La Victoria, Lima',
      phone: '987654321',
      email: 'test2@email.com',
      capacity: '500m2',
      status: 'inactive'
    };
    const result = await createStorage.execute(request);
    expect(result.isOk()).toBeTruthy();
  });
  it('Error: Params is not valid', async () => {
    const request: CreateStorageRequestDto = {
      name: 'test2',
      address: 'Avenida Mexico 444, La Victoria, Lima',
      phone: '987654321',
      email: 'test2@email.com',
      capacity: '500m2',
      status: 'true' // param not valid
    };
    const result = await createStorage.execute(request);
    expect(result.isErr()).toBeTruthy();
  });
  it('Error: request body empty', async () => {
    const request: CreateStorageRequestDto = {
      name: '',
      address: '',
      phone: '',
      email: '',
      capacity: '',
      status: ''
    };
    const result = await createStorage.execute(request);
    expect(result.isErr()).toBeTruthy();
  });
});
