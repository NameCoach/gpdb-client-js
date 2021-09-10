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
    "pronunciation": { actions: ["create", "index"] ,exclude_actions: ["index"] },
    "recording_request": {actions: ["*"], exclude_actions: ["show"] }
  },
  t.context.instance = new PermissionsManager(
    t.context.permissions,
  );
})

test('can() bool value', t => {
  const pronunciation_resource = "pronunciation";
  const recording_request_resource = "recording_request";
  const user_response_resource = "user_response";

  const create_permission = "create";
  const show_permission = "show";
  const index_permission = "index"

  t.is(t.context.instance.can(pronunciation_resource as Resources, create_permission), true);
  t.is(t.context.instance.can(recording_request_resource as Resources, create_permission), true);
  t.is(t.context.instance.can(recording_request_resource as Resources, show_permission), false);
  t.is(t.context.instance.can(pronunciation_resource as Resources, index_permission), false);
  t.is(t.context.instance.can(pronunciation_resource as Resources, show_permission), false);
  t.is(t.context.instance.can(user_response_resource as Resources, show_permission), false);
  t.is(t.context.instance.can(user_response_resource as Resources), false);
  t.is(t.context.instance.can(pronunciation_resource as Resources), true);

})
