import IClient from '../types/client';
import IConfiguration from '../types/configuration';
import Application from '../types/input/application';

import HttpClient from './http-client';
import AnalyticsEventsRepository from './repositories/analytics-events';
import BrowserExtensionRepository from './repositories/browser-extension';
import PermissionsRepository from './repositories/permissions';
import PronunciationsRepository from './repositories/pronunciations';

export default class Client implements IClient {
  public readonly pronunciations;
  public readonly analyticsEvents;
  public readonly browserExtension;
  public readonly permissions;
  public readonly application: Application;

  constructor(application: Application, configuration: IConfiguration) {
    const analyticsApiHttpClient = new HttpClient(
      configuration.analyticsApiUrl,
      configuration.credentials,
      configuration.headers
    ),
      apiHttpClient = new HttpClient(
      configuration.apiUrl,
      configuration.credentials,
      configuration.headers
    );

    this.application = application;
    this.pronunciations = new PronunciationsRepository(
      apiHttpClient,
      application
    );
    this.analyticsEvents = new AnalyticsEventsRepository(analyticsApiHttpClient);
    this.browserExtension = new BrowserExtensionRepository(analyticsApiHttpClient);
    this.permissions = new PermissionsRepository(
      apiHttpClient,
      application
    )
  }
}
