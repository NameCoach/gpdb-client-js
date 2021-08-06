export type ContentType = 'json' | 'formData';

export interface IRequest {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  contentType: ContentType,
  params?: Record<string, unknown>,
  body?: string | FormData | Record<string, unknown>,
}

export default interface IHttpClient {
  request: (options: IRequest) => Promise<unknown>;
}
