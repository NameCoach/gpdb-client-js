export type ContentType = 'json' | 'formData';

export interface IRequest {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  contentType: ContentType,
  params?: object,
  body?: string | FormData | object,
}

export default interface IHttpClient {
  request: (options: IRequest) => Promise<unknown>;
}
