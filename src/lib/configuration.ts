import IConfiguration from '../types/configuration';
import ICredentials from '../types/credentials';

import Credentials from './credentials';

const env = process === undefined ? {} : process.env;

export default class Configuration implements IConfiguration {
  public readonly credentials: ICredentials;
  accessKeyId: string;
  apiUrl: string;
  secretAccessKey: string;
  analyticsApiUrl: string | undefined;

  constructor({
      accessKeyId = env.GPDB_ACCESS_KEY_ID,
      secretAccessKey = env.GPDB_SECRET_ACCESS_KEY,
      apiUrl = env.GPDB_API_URL,
      analyticsApiUrl = env.GPDB_ANALYTICS_API_URL
    }) {

    if (!accessKeyId)
      throw Error("GPDB access key id must be defined");

    if (!secretAccessKey)
      throw Error("GPDB secret access key must be defined");

    if (!apiUrl)
      throw Error("GPDB api URL must be defined");

    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.apiUrl = apiUrl;
    this.analyticsApiUrl = analyticsApiUrl;

    this.credentials = new Credentials(accessKeyId, secretAccessKey)
  }
}
