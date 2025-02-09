import { IStorageProps } from '../../../domain';

export interface UpdateStoragesRequestDto extends Partial<IStorageProps> {
  id: string;
}
