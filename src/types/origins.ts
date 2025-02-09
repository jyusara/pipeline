export enum OriginData {
  MANUAL = 'manual',
  ONLINE = 'online',
  UNDEFINED = 'undefined'
}

export enum DataStatus {
  INVALID = 'invalid',
  VALID = 'valid',
  PENDING = 'pending',
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export enum Roles {
  ADMIN = 'admin',
  AGENT = 'asesor'
}
export interface OriginProps {
  origin: OriginData;
  comment?: string;
  registerStatus: DataStatus;
  status?: DataStatus;
}
