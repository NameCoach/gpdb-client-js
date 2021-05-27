import IClient from '../types/client';
import Application from '../types/input/application';
import IConfiguration from '../types/configuration';
import PronunciationsRepository from './repositories/pronunciations';
import AnalyticsEventsRepository from './repositories/analytics-events';
import HttpClient from './http-client';

export default class Client implements IClient {
  public readonly pronunciations;
  public readonly analyticsEvents;
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
  }
}
