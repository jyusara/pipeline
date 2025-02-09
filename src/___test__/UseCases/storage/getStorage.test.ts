import { InMemoryStorageRepository } from 'src/repositories/impl/inMemoryStorageRepository';
import { IStorageRepository } from 'src/repositories/storage.repository';
import GetStorage from 'src/UseCases/storage/getStorage/getStorage';
import { GetStorageRequestDto } from 'src/UseCases/storage/getStorage/getStorageRequestDto';

describe('Test GetStorage UseCase', () => {
  let getStorage: GetStorage;
  let storageRepository: IStorageRepository;

  beforeAll(() => {
    storageRepository = new InMemoryStorageRepository();
    getStorage = new GetStorage(storageRepository);
  });
  it('Success: Get Storage', async () => {
    const request: GetStorageRequestDto = {
      id: '676f7dd6a2ca1c984fae9724'
    };
    const result = await getStorage.execute(request);
    expect(result.isOk()).toBeTruthy();
  });
  it('Error: ID is not valid', async () => {
    const request: GetStorageRequestDto = {
      id: '676f7dd6a2ca1c984fae972'
    };
    const result = await getStorage.execute(request);
    expect(result.isErr()).toBeTruthy();
  });
  it('Error: Storage not Found', async () => {
    const request: GetStorageRequestDto = {
      id: '668719b8eee69c1a6c4fdafe'
    };
    const result = await getStorage.execute(request);
    expect(result.isErr()).toBeTruthy();
  });
});
