import anyTest, { TestInterface } from 'ava';
import Configuration from '../../src/lib/configuration';
import Credentials from '../../src/lib/credentials';

const test = anyTest as TestInterface<{
  accessKeyId: string,
  secretAccessKey: string,
  apiUrl: string,
  analyticsApiUrl: string
}>

test.before(t => {
  t.context.accessKeyId = 'access key';
  t.context.secretAccessKey = 'secret access key';
  t.context.apiUrl = 'https://api-url';
  t.context.analyticsApiUrl = 'https://analitycs-api-url';
})

test('store valid values and initializes a credentials instance', t => {
  const config = new Configuration({
    accessKeyId: t.context.accessKeyId,
    secretAccessKey: t.context.secretAccessKey,
    apiUrl: t.context.apiUrl,
    analyticsApiUrl: t.context.analyticsApiUrl
  });

  t.is(config.accessKeyId, t.context.accessKeyId);
  t.is(config.secretAccessKey, t.context.secretAccessKey);
  t.is(config.apiUrl, t.context.apiUrl);
  t.is(config.analyticsApiUrl, t.context.analyticsApiUrl);

  t.true(config.credentials instanceof Credentials);
})

test('throw an error if required values are blank', t => {
  t.throws(() => new Configuration({
    secretAccessKey: t.context.secretAccessKey,
    apiUrl: t.context.apiUrl,
    analyticsApiUrl: t.context.analyticsApiUrl
  }), { message: 'GPDB access key id must be defined' });

  t.throws(() => new Configuration({
    accessKeyId: t.context.accessKeyId,
    apiUrl: t.context.apiUrl,
    analyticsApiUrl: t.context.analyticsApiUrl
  }), { message: 'GPDB secret access key must be defined' });

  t.throws(() => new Configuration({
    accessKeyId: t.context.accessKeyId,
    secretAccessKey: t.context.secretAccessKey,
    analyticsApiUrl: t.context.analyticsApiUrl
  }), { message: 'GPDB api URL must be defined' });
})

test('uses env variables by default', t => {
  process.env.GPDB_ACCESS_KEY_ID = t.context.accessKeyId,
  process.env.GPDB_SECRET_ACCESS_KEY = t.context.secretAccessKey,
  process.env.GPDB_API_URL = t.context.apiUrl,
  process.env.GPDB_ANALYTICS_API_URL = t.context.analyticsApiUrl

  const config = new Configuration({});

  t.is(config.accessKeyId, t.context.accessKeyId);
  t.is(config.secretAccessKey, t.context.secretAccessKey);
  t.is(config.apiUrl, t.context.apiUrl);
  t.is(config.analyticsApiUrl, t.context.analyticsApiUrl);
})
