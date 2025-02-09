import { InMemoryStorageRepository } from 'src/repositories/impl/inMemoryStorageRepository';
import { IStorageRepository } from 'src/repositories/storage.repository';
import { GetStorageRequestDto } from 'src/UseCases/storage/getStorage/getStorageRequestDto';
import GetStorages from 'src/UseCases/storage/getStorages/getStorages';

describe('Test GetStorage UseCase', () => {
  let getStorages: GetStorages;
  let storageRepository: IStorageRepository;

  beforeAll(() => {
    storageRepository = new InMemoryStorageRepository();
    getStorages = new GetStorages(storageRepository);
  });
  it('Success: Get Storages', async () => {
    const request: GetStorageRequestDto = {
      // id: "676f7dd6a2ca1c984fae9724"
    };
    const result = await getStorages.execute(request);
    expect(result.isOk()).toBeTruthy();
  });
});
