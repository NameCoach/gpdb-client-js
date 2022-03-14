import anyTest, { TestInterface } from 'ava';
import sinon from 'sinon';
import { ClientPreferences } from '../../../src';
import Credentials from '../../../src/lib/credentials';
import HttpClient from '../../../src/lib/http-client';
import ClientSidePreferencesRepository
  from '../../../src/lib/repositories/client-side-preferences';
import { IRequest } from '../../../src/types/http-client';
import Application from '../../../src/types/input/application';

const test = anyTest as TestInterface<{
  instance: ClientSidePreferencesRepository,
  requestStub: sinon.SinonStub<[IRequest], Promise<any>>
}>

const appAttributes: Application = {
  typeSig: 'typeSig', instanceSig: 'instanceSig'
}

const preferences = {} as ClientPreferences;

test.beforeEach(t => {
  const httpClient = new HttpClient('https://api-url', new Credentials('id', 'secret'));

  t.context.requestStub = sinon.stub(httpClient, 'request');

  t.context.instance = new ClientSidePreferencesRepository(httpClient, appAttributes);

  t.context.requestStub.resolves(preferences);
})

test('when load have no params creates calls http client and returns a response', async t => {
  t.deepEqual(await t.context.instance.load(), preferences);

  sinon.assert.calledOnce(t.context.requestStub);
})

test('when load have params creates calls http client and returns a response', async t => {
  const rest = { user_sig: "user_sig", user_type_sig: "user_type_sig" };

  t.context.instance.load(rest);

  const requestArgument = t.context.requestStub.getCall(0).args[0].params as { [x: string]: any };

  t.is(requestArgument.application_sig, appAttributes.instanceSig);
  t.is(requestArgument.application_type_sig, appAttributes.typeSig);
  t.is(requestArgument.user_sig, rest.user_sig);
  t.is(requestArgument.user_type_sig, rest.user_type_sig);
})
