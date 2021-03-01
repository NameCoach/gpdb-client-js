import anyTest, { TestInterface } from 'ava';
import sinon from 'sinon';

import Credentials from '../../src/lib/credentials';
import HttpClient from '../../src/lib/http-client';
import { IRequest } from '../../src/types/http-client';

const test = anyTest as TestInterface<{
  instance: HttpClient
  requestStub: sinon.SinonStub
}>

const requestParams: IRequest = { path: 'path', method: 'GET', contentType: 'formData' }

test.beforeEach(t => {
  t.context.instance = new HttpClient('https://url', new Credentials('id', 'secret'));

  t.context.requestStub = sinon.stub(t.context.instance, 'fetch');
})

test('performs request and returns body', async t => {
  const response = <Response> {
    ok: true,
    json: () => { return Promise.resolve('json response') }
  };

  t.context.requestStub.resolves(response);

  t.is(await t.context.instance.request(requestParams), 'json response');

  sinon.assert.calledOnce(t.context.requestStub);
})

test('when request is failed trows an error', async t => {
  const response = <Response> {
    ok: false,
    statusText: 'Unautorized',
    json: () => { return Promise.resolve({ message: "error message" }) }
  };

  t.context.requestStub.resolves(response);

  const error = await t.throwsAsync(t.context.instance.request(requestParams));

  sinon.assert.calledOnce(t.context.requestStub);
  t.regex(error.message, /Unautorized.*error message/)
})

test('when content type is json casts body to json', async t => {
  const response = <Response> {
    ok: true,
    json: () => { return Promise.resolve('json response') }
  };

  t.context.requestStub.resolves(response);

  t.context.instance.request(
    { path: 'path', method: 'POST', contentType: 'json', body: { attr: 'value' } }
  );

  const requestArgument = t.context.requestStub.getCall(0).args[1];

  t.notThrows(() => { JSON.parse(requestArgument.body) });
})

test.afterEach.always(t => {
  t.context.requestStub.restore();
})
