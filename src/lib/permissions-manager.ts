import IPermissionsManager from '../types/permissions-manager';
import { ResourcePermissions, Resources } from '../types/repositories/permissions';

export default class PermissionsManager implements IPermissionsManager{
  private permissions: ResourcePermissions;

  constructor(permissions: ResourcePermissions) {
    this.permissions = permissions;
  }

  can(resource: Resources, permission: string): boolean {
    return this.permissions[resource].includes(permission);
  }
}
