import IConfiguration, { HeadersInit } from '../types/configuration';
import ICredentials from '../types/credentials';

import Credentials from './credentials';

export default class Configuration implements IConfiguration {
  public readonly credentials: ICredentials;
  accessKeyId: string;
  apiUrl: string;
  secretAccessKey: string;
  analyticsApiUrl?: string;
  headers: HeadersInit;

  constructor({
    accessKeyId = process?.env?.GPDB_ACCESS_KEY_ID,
    secretAccessKey = process?.env?.GPDB_SECRET_ACCESS_KEY,
    apiUrl = process?.env?.GPDB_API_URL,
    analyticsApiUrl = process?.env?.GPDB_ANALYTICS_API_URL,
    headers = {},
  }) {
    if (!accessKeyId) throw Error('GPDB access key id must be defined');

    if (!secretAccessKey) throw Error('GPDB secret access key must be defined');

    if (!apiUrl) throw Error('GPDB api URL must be defined');

    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.apiUrl = apiUrl;
    this.analyticsApiUrl = analyticsApiUrl;
    this.headers = headers;

    this.credentials = new Credentials(accessKeyId, secretAccessKey);
  }
}
