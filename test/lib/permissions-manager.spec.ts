import anyTest, { TestInterface } from 'ava';
import PermissionsManager from '../../src/lib/permissions-manager';
import {
  ResourcePermissions,
  Resources
} from '../../src/types/repositories/permissions';

const test = anyTest as TestInterface<{
  permissions: ResourcePermissions,
  instance: PermissionsManager,
}>

test.before(t => {
  t.context.permissions = {
    "pronunciation": ["create"],
    "user_response": ["create", "find"],
    "recording_request": ["*"]
  },
  t.context.instance = new PermissionsManager(
    t.context.permissions,
  );
})

test('can() bool value', t => {
  const truthy_1 = ["pronunciation", "create"]
  const truthy_2 = ["recording_request", "create"]
  const falsey = ["pronunciation", "show"]

  t.is(t.context.instance.can(...truthy_1 as [resource: Resources, permission: string]), true);
  t.is(t.context.instance.can(...truthy_2 as [resource: Resources, permission: string]), true);
  t.is(t.context.instance.can(...falsey as [resource: Resources, permission: string]), false);
})
