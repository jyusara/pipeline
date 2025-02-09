import DeleteStorage from '../../../UseCases/storage/deleteStorage/deleteStorage';
import { IStorageRepository } from 'src/repositories/storage.repository';
import { DeleteStorageRequestDto } from 'src/UseCases/storage/deleteStorage/deleteStorageRequestDto';
import { InMemoryStorageRepository } from 'src/repositories/impl/inMemoryStorageRepository';
describe('Test DeleteStorage UseCase', () => {
  let deleteStorage: DeleteStorage;
  let storageRepository: IStorageRepository;

  beforeAll(() => {
    storageRepository = new InMemoryStorageRepository();
    deleteStorage = new DeleteStorage(storageRepository);
  });

  it('Success: Delete Storage', async () => {
    const request: DeleteStorageRequestDto = {
      id: '676f7dd6a2ca1c984fae9724'
    };
    const result = await deleteStorage.execute(request);
    expect(result.isOk()).toBeTruthy();
  });

  it('Error: ID is not valid', async () => {
    const request: DeleteStorageRequestDto = {
      id: '676f7dd6a2ca1c984fae972'
    };
    const result = await deleteStorage.execute(request);
    expect(result.isErr()).toBeTruthy();
  });
  it('Error: Storage not Found', async () => {
    const request: DeleteStorageRequestDto = {
      id: '668719b8eee69c1a6c4fdafe'
    };
    const result = await deleteStorage.execute(request);
    expect(result.isErr()).toBeTruthy();
  });
});
