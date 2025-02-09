import { InMemoryStorageRepository } from 'src/repositories/impl/inMemoryStorageRepository';
import { IStorageRepository } from 'src/repositories/storage.repository';
import UpdateStorage from 'src/UseCases/storage/updateStorage/updateStorage';
import { UpdateStoragesRequestDto } from 'src/UseCases/storage/updateStorage/updateStorageRequestDto';

describe('Test CreateStorage UseCase', () => {
  let updateStorage: UpdateStorage;
  let storageRepository: IStorageRepository;

  beforeAll(() => {
    storageRepository = new InMemoryStorageRepository();
    updateStorage = new UpdateStorage(storageRepository);
  });
  it('Success: Update Storage', async () => {
    const request: UpdateStoragesRequestDto = {
      id: '676f7dd6a2ca1c984fae9724',
      status: 'inactive'
    };
    const result = await updateStorage.execute(request);
    expect(result.isOk()).toBeTruthy();
  });
  it('Error: ID is not Valid', async () => {
    const request: UpdateStoragesRequestDto = {
      id: '676f7dd6a2ca1c984fae972',
      status: 'inactive'
    };
    const result = await updateStorage.execute(request);
    expect(result.isErr()).toBeTruthy();
  });
  it('Error: Storage not found', async () => {
    const request: UpdateStoragesRequestDto = {
      id: '676f7dd6a2ca1c984fae9727',
      status: 'inactive'
    };
    const result = await updateStorage.execute(request);
    expect(result.isErr()).toBeTruthy();
  });
  it('Error: Params is not valid', async () => {
    const request: UpdateStoragesRequestDto = {
      id: '676f7dd6a2ca1c984fae9727',
      name: 'null' // active or inactive
    };
    const result = await updateStorage.execute(request);
    expect(result.isErr()).toBeTruthy();
  });
  it('Error: request body empty', async () => {
    const request: UpdateStoragesRequestDto = {
      id: '676f7dd6a2ca1c984fae9727',
      name: ''
    };
    const result = await updateStorage.execute(request);
    expect(result.isErr()).toBeTruthy();
  });
});
