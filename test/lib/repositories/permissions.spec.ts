import anyTest, { TestInterface } from 'ava';
import sinon from 'sinon';
import Credentials from '../../../src/lib/credentials';
import HttpClient from '../../../src/lib/http-client';
import PermissionsManager from '../../../src/lib/permissions-manager';
import PermissionsRepository from '../../../src/lib/repositories/permissions';
import { IRequest } from '../../../src/types/http-client';
import Application from '../../../src/types/input/application';
import { ResourcePermissions } from '../../../src/types/repositories/permissions';

const test = anyTest as TestInterface<{
  instance: PermissionsRepository,
  requestStub: sinon.SinonStub<[IRequest], Promise<any>>
}>

const appAttributes: Application = {
  typeSig: 'typeSig', instanceSig: 'instanceSig'
}

const permissions: ResourcePermissions = {
  "pronunciation": { "actions": ["create"], "exclude_actions": [] },
  "user_response": { "actions": ["create", "find"], "exclude_actions": [] },
  "recording_request": { "actions": ["create"], "exclude_actions": [] }
}

const permissionsManager = new PermissionsManager(permissions)

test.beforeEach(t => {
  const httpClient = new HttpClient('https://api-url', new Credentials('id', 'secret'));

  t.context.requestStub = sinon.stub(httpClient, 'request');

  t.context.instance = new PermissionsRepository(httpClient, appAttributes);

  t.context.requestStub.resolves(permissions);
})

test('when load have no params creates calls http client and returns a response', async t => {
  t.deepEqual(await t.context.instance.load(), permissionsManager);

  sinon.assert.calledOnce(t.context.requestStub);
})

test('when load have params creates calls http client and returns a response', async t => {
  const rest = { user_sig: "user_sig", user_type_sig: "user_type_sig" };
  
  t.deepEqual(await t.context.instance.load(rest), permissionsManager);

  sinon.assert.calledOnce(t.context.requestStub);
})
