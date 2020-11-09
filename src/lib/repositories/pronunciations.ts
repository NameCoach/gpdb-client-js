import IPronunciationsRepo, {
  ComplexSearchParams,
  SimpleSearchParams
} from '../../types/repositories/pronunciations';
import IHttpClient from '../../types/http-client';
import Application from '../../types/input/application';
import snakecaseKeys from 'snakecase-keys';

export default class PronunciationsRepository implements IPronunciationsRepo {
  private httpClient: IHttpClient;
  private application: Application;

  constructor(httpClient: IHttpClient, application: Application) {
    this.httpClient = httpClient;
    this.application = application;
  }

  simpleSearch({ target, targetTypeSig, targetOwnerSig, ...rest }: SimpleSearchParams): Promise<unknown> {
    return this.httpClient.request({
      path: '/pronunciations',
      method: 'GET',
      contentType: 'json',
      params: {
        target: target,
        target_type_sig: targetTypeSig,
        target_owner_sig: targetOwnerSig,
        application_sig: this.application.instanceSig,
        application_type_sig: this.application.typeSig,
        application_hedb_api_token: this.application.hedbApiToken,
        ...rest
      }
    });
  }

  complexSearch({ targets, userContext, ...rest }: ComplexSearchParams): Promise<unknown> {
    const _targets = snakecaseKeys(targets);
    const _user = snakecaseKeys(userContext);

    return this.httpClient.request({
      path: '/pronunciations/search',
      method: 'POST',
      contentType: 'json',
      body: {
        targets: _targets,
        user_context: _user,
        application_context: {
          app_description: this.application.description,
          app_type_sig: this.application.typeSig,
          instance_sig: this.application.instanceSig,
          hedb_api_token: this.application.hedbApiToken
        },
        ...rest
      }
    });
  }
}
