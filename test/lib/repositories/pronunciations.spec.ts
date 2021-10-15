import anyTest, { TestInterface } from 'ava';
import sinon from 'sinon';
import Credentials from '../../../src/lib/credentials';
import HttpClient from '../../../src/lib/http-client';
import PronunciationsRepository
  from '../../../src/lib/repositories/pronunciations';
import { IRequest } from '../../../src/types/http-client';

import Application from '../../../src/types/input/application';
import {
  TargetTypeSig,
  UserResponse
} from '../../../src/types/input/enum-types';
import {
  ComplexSearchParams,
  CreateRecordingParams,
  SimpleSearchParams,
  SearchBySigParams,
  UserResponseParams
} from '../../../src/types/repositories/pronunciations';

const test = anyTest as TestInterface<{
  instance: PronunciationsRepository,
  requestStub: sinon.SinonStub<[IRequest], Promise<any>>
}>

const simpleSearchParams: SimpleSearchParams = {
  target: 'name', targetTypeSig: TargetTypeSig.LastName, targetOwnerSig: 'userSig', optional: 'isOptional'
}

const complexSearchParams: ComplexSearchParams = {
  targets: [
    { target: 'one', targetTypeSig: TargetTypeSig.FirstName, targetOwnerContext: { signature: 'userSig' } },
    { target: 'another', targetTypeSig: TargetTypeSig.FirstName, targetOwnerContext: { signature: 'userSig' } },
  ],
  userContext: { signature: 'userSig' }
}

const searchBySigParams: SearchBySigParams = {
  targetOwnerContext: { signature: 'ownerSig' },
  userContext: { signature: 'userSig' },
}

const userResponseParams: UserResponseParams = {
  recordingId: 'recordingId',
  userResponse: UserResponse.Save,
  userContext: { signature: 'userSig' },
  targetOwnerSig: 'targetOwnerSig'

}

const createRecordingParams: CreateRecordingParams = {
  target: 'name',
  targetTypeSig: TargetTypeSig.FirstName,
  audioBase64: 'long_base64_string',
  nameOwnerContext: { signature: 'nameOwnerSig' },
  userContext: { signature: 'userSig' },
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

test('simpleSearch adds application attributes to the params', t => {
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

test('complexSearch adds application attributes to the params as application context', t => {
  t.context.instance.complexSearch(complexSearchParams);

  const requestArgument = <ComplexSearchParams> t.context.requestStub.getCall(0).args[0].body;

  t.is(requestArgument.application_context.instance_sig, appAttributes.instanceSig);
  t.is(requestArgument.application_context.app_type_sig, appAttributes.typeSig);
})

test('searchBySig calls http client and returns a response', async t => {
  t.context.requestStub.resolves('some response');

  t.is(await t.context.instance.searchBySig(searchBySigParams), 'some response');

  sinon.assert.calledOnce(t.context.requestStub);
})

test('searchBySig adds application attributes to the params as application context', t => {
  t.context.instance.searchBySig(searchBySigParams);

  const requestArgument = <SearchBySigParams> t.context.requestStub.getCall(0).args[0].body;

  t.is(requestArgument.application_context.instance_sig, appAttributes.instanceSig);
  t.is(requestArgument.application_context.app_type_sig, appAttributes.typeSig);
})

test('userResponse calls http client and returns a response', async t => {
  t.context.requestStub.resolves('response body');

  t.is(await t.context.instance.userResponse(userResponseParams), 'response body');

  sinon.assert.calledOnce(t.context.requestStub);
})

test('userResponse transforms parameters to snakecase', t => {
  t.context.instance.userResponse(userResponseParams);

  const requestArgument = <UserResponseParams> t.context.requestStub.getCall(0).args[0].body;

  t.is(requestArgument.user_response, userResponseParams.userResponse);
  t.is(requestArgument.name_owner_sig, userResponseParams.targetOwnerSig);
})

test('createRecording calls http client and returns a response', async t => {
  t.context.requestStub.resolves('response body');

  t.is(await t.context.instance.createRecording(createRecordingParams), 'response body');

  sinon.assert.calledOnce(t.context.requestStub);
})

test('createRecording transforms parameters to snakecase', t => {
  t.context.instance.createRecording(createRecordingParams);

  const requestArgument = <CreateRecordingParams> t.context.requestStub.getCall(0).args[0].body;

  t.deepEqual(requestArgument.user_context, createRecordingParams.userContext);
  t.is(requestArgument.target_type_sig, createRecordingParams.targetTypeSig);
  t.is(requestArgument.name_owner_context, createRecordingParams.nameOwnerContext);
})

test.afterEach.always(t => {
  t.context.requestStub.restore();
})
