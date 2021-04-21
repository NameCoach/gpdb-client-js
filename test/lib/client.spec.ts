import anyTest, { TestInterface } from 'ava';
import AnalyticsEventsRepository from '../../src/lib/repositories/analytics-events';
import Application from '../../src/types/input/application'
import Client from '../../src/lib/client';
import Configuration from '../../src/lib/configuration';
import IConfiguration from '../../src/types/configuration';
import PronunciationsRepository from '../../src/lib/repositories/pronunciations'

const test = anyTest as TestInterface<{
  instance: Client
  configuration: IConfiguration
  application: Application
}>

test.before(t => {
  t.context.application = { typeSig: 'typeSig', instanceSig: 'insSig' };
  t.context.configuration = new Configuration({
    accessKeyId: 'keyId',
    secretAccessKey: 'secret',
    apiUrl: 'https://api-url',
    analyticsApiUrl: 'https://analitycs-api-url'
  });
  
  t.context.instance = new Client(
    t.context.application,
    t.context.configuration
  );
})

test('initializes pronunciations repository with given attributes', t => {
  t.true(t.context.instance.pronunciations instanceof PronunciationsRepository);

  const httpClient = Reflect.get(t.context.instance.pronunciations, 'httpClient');
  const application = Reflect.get(t.context.instance.pronunciations, 'application');

  t.is(httpClient.url, t.context.configuration.apiUrl);
  t.deepEqual(application, t.context.application);
})

test('initializes analytics events repository with given attributes', t => {
  t.true(t.context.instance.analyticsEvents instanceof AnalyticsEventsRepository);

  const httpClient = Reflect.get(t.context.instance.analyticsEvents, 'httpClient');

  t.is(httpClient.url, t.context.configuration.analyticsApiUrl);
})

test('can be initialized using envs instead of passing config attributes', t => {
  process.env.GPDB_ACCESS_KEY_ID = t.context.configuration.accessKeyId,
  process.env.GPDB_SECRET_ACCESS_KEY = t.context.configuration.secretAccessKey,
  process.env.GPDB_API_URL = t.context.configuration.apiUrl,
  process.env.GPDB_ANALYTICS_API_URL = t.context.configuration.analyticsApiUrl

  t.context.instance = new Client(
    t.context.application,
    new Configuration({})
  );

  const httpClient = Reflect.get(t.context.instance.pronunciations, 'httpClient');

  t.is(httpClient.url, t.context.configuration.apiUrl);
  t.like(httpClient.credentials, {
    accessKeyId: t.context.configuration.accessKeyId,
    secretAccessKey: t.context.configuration.secretAccessKey
  });
})
