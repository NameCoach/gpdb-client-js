import anyTest, { TestInterface } from 'ava';
import sinon from 'sinon';
import Credentials from '../../../src/lib/credentials';
import HttpClient from '../../../src/lib/http-client';
import CustomAttributesRepository
  from '../../../src/lib/repositories/custom-attributes';
import { IRequest } from '../../../src/types/http-client';
import Application from '../../../src/types/input/application';
import { RetrieveValuesParams, SaveValuesParams } from '../../../src/types/repositories/custom-attributes';

const test = anyTest as TestInterface<{
  instance: CustomAttributesRepository,
  requestStub: sinon.SinonStub<[IRequest], Promise<any>>
}>

const appAttributes: Application = {
  typeSig: 'typeSig', instanceSig: 'instanceSig'
}

const saveValuesParams: SaveValuesParams = {
  targetOwnerContext: { signature: 'ownerSig' },
  userContext: { signature: 'userSig' },
  customAttributesValues: { id1: 'Mr.', middleName: 'M'}
}

const retrieveValuesParams: RetrieveValuesParams = {
  targetOwnerContext: { signature: 'ownerSig' },
}

const config = {};

test.beforeEach(t => {
  const httpClient = new HttpClient('https://api-url', new Credentials('id', 'secret'));

  t.context.requestStub = sinon.stub(httpClient, 'request');

  t.context.instance = new CustomAttributesRepository(httpClient, appAttributes);
})


test('retrieveConfig calls http client and returns a response', async t => {
  t.context.requestStub.resolves(config);

  t.deepEqual(await t.context.instance.retrieveConfig(), {});

  sinon.assert.calledOnce(t.context.requestStub);
})

test(' saveValues calls http client and returns a response', async t => {
  t.context.requestStub.resolves('response body');

  t.is(await t.context.instance.saveValues(saveValuesParams), 'response body');

  sinon.assert.calledOnce(t.context.requestStub);
})

test(' retrieveValues calls http client and returns a response', async t => {
  t.context.requestStub.resolves('response body');

  t.is(await t.context.instance.retrieveValues(retrieveValuesParams), 'response body');

  sinon.assert.calledOnce(t.context.requestStub);
})

test(' saveValues transforms parameters to snakecase', t => {
  t.context.instance.saveValues(saveValuesParams);

  const requestArgument = <SaveValuesParams> t.context.requestStub.getCall(0).args[0].body;

  t.is(requestArgument.application_context.instance_sig, appAttributes.instanceSig);
  t.is(requestArgument.application_context.app_type_sig, appAttributes.typeSig);
})

test(' saveValues adds application attributes to the params', t => {
  t.context.instance.saveValues(saveValuesParams);

  const requestArgument = <SaveValuesParams> t.context.requestStub.getCall(0).args[0].body;

  t.is(requestArgument.application_context.instance_sig, appAttributes.instanceSig);
  t.is(requestArgument.application_context.app_type_sig, appAttributes.typeSig);
})

test(' retrieveValues adds application attributes to the params', t => {
  t.context.instance.retrieveValues(retrieveValuesParams);

  const requestArgument = <SaveValuesParams> t.context.requestStub.getCall(0).args[0].body;

  t.is(requestArgument.application_context.instance_sig, appAttributes.instanceSig);
  t.is(requestArgument.application_context.app_type_sig, appAttributes.typeSig);
})
