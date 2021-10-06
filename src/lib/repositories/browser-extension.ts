import snakecaseKeys from 'snakecase-keys';

import IHttpClient from '../../types/http-client';
import BrowserExtension from '../../types/input/browser-extension';
import IBrowserExtensionRepo from '../../types/repositories/browser-extension';

export default class BrowserExtensionRepository implements IBrowserExtensionRepo {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  create(event: BrowserExtension): Promise<unknown> {
    const _event = snakecaseKeys(event);

    return this.httpClient.request({
      path: '/browser_extension',
      method: 'POST',
      contentType: 'json',
      body: _event
    });
  }
}
