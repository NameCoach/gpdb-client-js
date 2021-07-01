import anyTest, {TestInterface} from 'ava';
import sinon from 'sinon';

import AnalyticEvent from '../../../src/types/input/analytic-event';
import AnalyticsEventsRepository from '../../../src/lib/repositories/analytics-events';
import Credentials from '../../../src/lib/credentials';
import HttpClient from '../../../src/lib/http-client';
import { IRequest } from '../../../src/types/http-client';

const test = anyTest as TestInterface<{
  instance: AnalyticsEventsRepository,
  requestStub: sinon.SinonStub<[IRequest], Promise<any>>
}>

const analyticsParams: AnalyticEvent = {
  customerId: 'id', entityId: 'entityId', entityType: 'type', userId: 'userId'
}

test.beforeEach(t => {
  const httpClient = new HttpClient('https://api-url', new Credentials('id', 'secret'));

  t.context.requestStub = sinon.stub(httpClient, 'request');

  t.context.instance = new AnalyticsEventsRepository(httpClient);
})

test('create calls http client and returns a response', async t => {
  t.context.requestStub.resolves('response body');

  t.is(await t.context.instance.create(analyticsParams), 'response body');

  sinon.assert.calledOnce(t.context.requestStub);
})

test('create transforms parameters to snakecase', t => {
  t.context.instance.create(analyticsParams);

  const requestArgument = <AnalyticEvent> t.context.requestStub.getCall(0).args[0].body;

  t.is(requestArgument.customer_id, analyticsParams.customerId);
  t.is(requestArgument.entity_id, analyticsParams.entityId);
  t.is(requestArgument.entity_type, analyticsParams.entityType);
  t.is(requestArgument.user_id, analyticsParams.userId);
})

test.afterEach.always(t => {
  t.context.requestStub.restore();
})
