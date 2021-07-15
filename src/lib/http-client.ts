import fetch from 'cross-fetch';
import { StringifiableRecord, stringify } from 'query-string';

import { HeadersInit } from '../types/configuration';
import ICredentials from '../types/credentials';
import IHttpClient, { ContentType, IRequest } from '../types/http-client';

export default class HttpClient implements IHttpClient {
  private readonly url: string | undefined;
  private readonly headers: object;
  private credentials: ICredentials;

  constructor(
    url: string | undefined,
    credentials: ICredentials,
    headers?: HeadersInit
  ) {
    this.url = url;
    this.credentials = credentials;
    this.headers = {
      ...headers,
      Accept: 'application/json',
      'User-Agent': 'gpdb-ts-client'
    };
  }

  async request ({ path, method, contentType, body, params }: IRequest) {
    const _body: any = contentType === 'json' ? JSON.stringify(body) : body;
    const type = this.parseContentType(contentType);
    const headers = {
      ...this.headers,
      Authorization: this.credentials.signatureHeader(),
      'Content-Type': type,
    }

    const response = await this.fetch(
      `${this.url}${path}?${stringify(<StringifiableRecord>params)}`, {
      method,
      headers,
      body: _body,
    })
    const respBody = await response.json();

    if (!response.ok) {
      const msgParts = [`[GPDB] ${response.statusText}.`];

      if (respBody.message) msgParts.push(`Message: ${respBody?.message}`);

      throw new Error(msgParts.join(' '));
    }

    return respBody;
  }

  private parseContentType (type: ContentType): string {
    return {
      json: 'application/json',
      formData: 'multipart/form-data'
    }[type];
  }

  async fetch(url: RequestInfo, options: RequestInit): Promise<Response> {
    return fetch(url, options);
  }
}
