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
    "recording_request": ["*"]
  },
  t.context.instance = new PermissionsManager(
    t.context.permissions,
  );
})

test('can() bool value', t => {
  const truthy_1 = ["pronunciation", "create"]
  const truthy_2 = ["recording_request", "create"]
  const falsey_1 = ["pronunciation", "show"]
  const falsey_2 = ["user_response", "show"]


  t.is(t.context.instance.can(...truthy_1 as [resource: Resources, permission: string]), true);
  t.is(t.context.instance.can(...truthy_2 as [resource: Resources, permission: string]), true);
  t.is(t.context.instance.can(...falsey_1 as [resource: Resources, permission: string]), false);
  t.is(t.context.instance.can(...falsey_2 as [resource: Resources, permission: string]), false);

})
