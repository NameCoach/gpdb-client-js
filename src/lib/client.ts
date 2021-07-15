import IClient from '../types/client';
import IConfiguration from '../types/configuration';
import Application from '../types/input/application';

import HttpClient from './http-client';
import AnalyticsEventsRepository from './repositories/analytics-events';
import PermissionsRepository from './repositories/permissions';
import PronunciationsRepository from './repositories/pronunciations';

export default class Client implements IClient {
  public readonly pronunciations;
  public readonly analyticsEvents;
  public readonly permissions;
  public readonly application: Application;

  constructor(application: Application, configuration: IConfiguration) {
    this.application = application;

    this.pronunciations = new PronunciationsRepository(
      new HttpClient(
        configuration.apiUrl,
        configuration.credentials,
        configuration.headers
      ),
      application
    );
    this.analyticsEvents = new AnalyticsEventsRepository(
      new HttpClient(
        configuration.analyticsApiUrl,
        configuration.credentials,
        configuration.headers
      ),
    );
    this.permissions = new PermissionsRepository(
      new HttpClient(
        configuration.apiUrl,
        configuration.credentials,
        configuration.headers
      ),
      application
    )
  }
}
