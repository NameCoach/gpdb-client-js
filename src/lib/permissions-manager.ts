import IPermissionsManager from '../types/permissions-manager';
import { ResourcePermissions, Resources } from '../types/repositories/permissions';

export default class PermissionsManager implements IPermissionsManager{
  private permissions: ResourcePermissions;

  constructor(permissions: ResourcePermissions) {
    this.permissions = permissions;
  }

  can(resource: Resources, permission: string): boolean {
    const _resource = this.permissions[resource];
    if (!_resource) return false;

    if (_resource.includes('*'))
      return true;

    return _resource.includes(permission);
  }
}
