import IClient from '../types/client';
import IConfiguration from '../types/configuration';
import Application from '../types/input/application';

import HttpClient from './http-client';
import AnalyticsEventsRepository from './repositories/analytics-events';
import BrowserExtensionRepository from './repositories/browser-extension';
import ClientSidePreferencesRepository from './repositories/client-side-preferences';
import CustomAttributesRepository from './repositories/custom-attributes';
import PermissionsRepository from './repositories/permissions';
import PreferredRecordingsRepository from './repositories/preferred-recordings';
import PronunciationsRepository from './repositories/pronunciations';
import AvatarsRepository from './repositories/avatars';

export default class Client implements IClient {
  public readonly pronunciations;
  public readonly analyticsEvents;
  public readonly browserExtension;
  public readonly permissions;
  public readonly clientPreferences;
  public readonly customAttributes;
  public readonly preferredRecordings;
  public readonly avatars;
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
    this.analyticsEvents = new AnalyticsEventsRepository(analyticsApiHttpClient);
    this.browserExtension = new BrowserExtensionRepository(analyticsApiHttpClient);
    
    this.pronunciations = new PronunciationsRepository(
      apiHttpClient,
      application
    );
    this.permissions = new PermissionsRepository(
      apiHttpClient,
      application
    )
    this.customAttributes = new CustomAttributesRepository(
      apiHttpClient,
      application
    )
    this.clientPreferences = new ClientSidePreferencesRepository(
      apiHttpClient,
      application
    )
    this.preferredRecordings = new PreferredRecordingsRepository(
      apiHttpClient,
      application
    )
    this.avatars = new AvatarsRepository(
      apiHttpClient,
      application
    )
  }
}
