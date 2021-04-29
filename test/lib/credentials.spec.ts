import anyTest, { TestInterface } from 'ava';
import Credentials from '../../src/lib/credentials';

const test = anyTest as TestInterface<{
  accessKeyId: string,
  secretAccessKey: string,
  instance: Credentials
}>

test.before(t => {
  t.context.accessKeyId = 'access key';
  t.context.secretAccessKey = 'secret access key';
  
  t.context.instance = new Credentials(
    t.context.accessKeyId,
    t.context.secretAccessKey
  );
})

test('is initialized with given attributes', t => {
  t.is(t.context.instance.accessKeyId, t.context.accessKeyId);
  t.is(t.context.instance.secretAccessKey, t.context.secretAccessKey);
})

test('signature() returns jwt', t => {
  const validJwtRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/

  t.regex(t.context.instance.signature(), validJwtRegex)
})

test('signatureHeader() returns jwt header', t => {
  const validJwtRegex = /^Bearer:[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/

  t.regex(t.context.instance.signatureHeader(), validJwtRegex)
})
