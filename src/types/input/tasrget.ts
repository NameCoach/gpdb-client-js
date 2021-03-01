import User from './user';

export default interface Target {
  target: string;
  targetId?: string;
  targetTypeSig: string;
  targetOwnerContext: User;
  pageSize?: string;
  pageNumber?: string;
  [x: string]: any;
}
