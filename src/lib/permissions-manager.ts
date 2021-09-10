import IPermissionsManager from '../types/permissions-manager';
import { ResourcePermissions, Resources } from '../types/repositories/permissions';

export default class PermissionsManager implements IPermissionsManager{
  private permissions: ResourcePermissions;

  constructor(permissions: ResourcePermissions) {
    this.permissions = permissions;
  }

  can(resource: Resources, permission: string): boolean;
  can(resource: Resources): boolean;

  can(resource: Resources, permission?: string): boolean {
    const _resource = this.permissions[resource];

    if (!_resource) return false;

    const _permission = permission;

    if(!_permission) return true;

    if(_resource.exclude_actions.includes(_permission)) return false;

    if (_resource.actions.includes('*'))
      return true;

    return _resource.actions.includes(_permission);
  }
}
