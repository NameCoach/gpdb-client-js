import ICredentials from './credentials';

export default interface IConfiguration {
  credentials: ICredentials;
  accessKeyId: string;
  secretAccessKey: string;
  apiUrl: string;
  analyticsApiUrl?: string;
}
