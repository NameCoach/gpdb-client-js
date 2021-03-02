import { TargetTypeSig } from './enum-types';
import User from './user';

export default interface Target {
  target: string;
  targetId?: string;
  targetTypeSig: TargetTypeSig;
  targetOwnerContext: User;
  pageSize?: string;
  pageNumber?: string;
  [x: string]: any;
}
