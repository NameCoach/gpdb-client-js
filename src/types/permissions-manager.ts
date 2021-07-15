import { Resources } from './repositories/permissions';

export default interface IPermissionsManager {
  can: (resource: Resources, permission: string) => boolean;
}
