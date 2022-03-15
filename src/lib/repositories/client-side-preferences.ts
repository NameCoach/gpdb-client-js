import IHttpClient from '../../types/http-client';
import Application from '../../types/input/application';
import IClientSidePreferenceRepo, { ClientPreferences, loadParams } from '../../types/repositories/client-side-preferences';

export default class ClientSidePreferencesRepository implements IClientSidePreferenceRepo {
  private httpClient: IHttpClient;
  private application: Application;

  constructor (httpClient: IHttpClient, application: Application) {
    this.httpClient = httpClient;
    this.application = application;
  }

  async load (rest?: loadParams): Promise<ClientPreferences> {
    const preferences = await this.httpClient.request({
      path: '/client_side_preferences',
      method: 'GET',
      contentType: 'json',
      params: {
        application_sig: this.application.instanceSig,
        application_type_sig: this.application.typeSig,
        ...rest,
      },
    });

    return preferences as ClientPreferences;
  }
}
