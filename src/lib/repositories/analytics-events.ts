import snakecaseKeys from 'snakecase-keys';

import IHttpClient from '../../types/http-client';
import AnalyticEvent from '../../types/input/analytic-event';
import IAnalyticsEventsRepo from '../../types/repositories/analytics-events';


export default class AnalyticsEventsRepository implements IAnalyticsEventsRepo {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  create(event: AnalyticEvent): Promise<any> {
    const _event = snakecaseKeys(event);

    return this.httpClient.request({
      path: '/analytics_events',
      method: 'POST',
      contentType: 'json',
      body: _event
    });
  }
}
