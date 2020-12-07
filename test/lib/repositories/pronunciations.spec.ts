import anyTest, { TestInterface } from 'ava';
import sinon from 'sinon';

import Application from '../../../src/types/input/application';
import Credentials from '../../../src/lib/credentials';
import HttpClient from '../../../src/lib/http-client';
import { IRequest } from '../../../src/types/http-client';
import { SimpleSearchParams, ComplexSearchParams } from '../../../src/types/repositories/pronunciations';
import PronunciationsRepository from '../../../src/lib/repositories/pronunciations';

const test = anyTest as TestInterface<{
  instance: PronunciationsRepository,
  requestStub: sinon.SinonStub<[IRequest], Promise<any>>
}>

const simpleSearchParams: SimpleSearchParams = {
  target: 'name', targetTypeSig: 'typeSig', targetOwnerSig: 'userSig', optional: 'isOptional'
}

const complexSearchParams: ComplexSearchParams = {
  targets: [ 
    { target: 'one', targetTypeSig: 'typeSig', targetOwnerContext: { signature: 'userSig' } },
    { target: 'another', targetTypeSig: 'typeSig', targetOwnerContext: { signature: 'userSig' } },
  ],
  userContext: { signature: 'userSig' }
}

const appAttributes: Application = {
  typeSig: 'typeSig', instanceSig: 'instanceSig'
}

test.beforeEach(t => {
  const httpClient = new HttpClient('https://api-url', new Credentials('id', 'secret'));

  t.context.requestStub = sinon.stub(httpClient, 'request');

  t.context.instance = new PronunciationsRepository(
    httpClient,
    appAttributes
  );
})

test('simpleSearch calls http client and returns a response', async t => {
  t.context.requestStub.resolves('response body');

  t.is(await t.context.instance.simpleSearch(simpleSearchParams), 'response body');

  sinon.assert.calledOnce(t.context.requestStub);
})

test('simpleSearch transforms parameters to snakecase', t => {
  t.context.instance.simpleSearch(simpleSearchParams);

  const requestArgument = <SimpleSearchParams> t.context.requestStub.getCall(0).args[0].params;

  t.is(requestArgument.target, simpleSearchParams.target);
  t.is(requestArgument.target_type_sig, simpleSearchParams.targetTypeSig);
  t.is(requestArgument.target_owner_sig, simpleSearchParams.targetOwnerSig);
  t.is(requestArgument.optional, simpleSearchParams.optional);
})

test('simpleSearch addes application attributes to the params', t => {
  t.context.instance.simpleSearch(simpleSearchParams);

  const requestArgument = <SimpleSearchParams> t.context.requestStub.getCall(0).args[0].params;

  t.is(requestArgument.application_sig, appAttributes.instanceSig);
  t.is(requestArgument.application_type_sig, appAttributes.typeSig);
})

test('complexSearch calls http client and returns a response', async t => {
  t.context.requestStub.resolves('response body');

  t.is(await t.context.instance.complexSearch(complexSearchParams), 'response body');

  sinon.assert.calledOnce(t.context.requestStub);
})

test('complexSearch transforms parameters to snakecase included nested attributes', t => {
  t.context.instance.complexSearch(complexSearchParams);

  const requestArgument = <ComplexSearchParams> t.context.requestStub.getCall(0).args[0].body;

  t.is(requestArgument.targets[0].target, complexSearchParams.targets[0].target);
  t.is(requestArgument.targets[0].target_type_sig, complexSearchParams.targets[0].targetTypeSig);
  t.deepEqual(requestArgument.targets[0].target_owner_context, complexSearchParams.targets[0].targetOwnerContext);
})

test('complexSearch addes application attributes to the params as application context', t => {
  t.context.instance.complexSearch(complexSearchParams);

  const requestArgument = <ComplexSearchParams> t.context.requestStub.getCall(0).args[0].body;

  t.is(requestArgument.application_context.instance_sig, appAttributes.instanceSig);
  t.is(requestArgument.application_context.app_type_sig, appAttributes.typeSig);
})

test.afterEach.always(t => {
  t.context.requestStub.restore();
})
