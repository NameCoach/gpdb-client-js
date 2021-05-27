import ICredentials from './credentials';

export type HeadersInit = Headers | string[][] | { [key: string]: string };

export default interface IConfiguration {
  credentials: ICredentials;
  accessKeyId: string;
  secretAccessKey: string;
  apiUrl: string;
  analyticsApiUrl?: string;
  headers: HeadersInit;
}
