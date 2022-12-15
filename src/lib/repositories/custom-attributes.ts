import snakecaseKeys from 'snakecase-keys';

import IHttpClient from '../../types/http-client';
import Application from '../../types/input/application';
import ICustomAttributesRepo, { RetrieveValuesParams, SaveValuesParams } from '../../types/repositories/custom-attributes';

export default class CustomAttributesRepository implements ICustomAttributesRepo {
  private httpClient: IHttpClient;
  private application: Application;

  constructor (httpClient: IHttpClient, application: Application) {
    this.httpClient = httpClient;
    this.application = application;
  }

  retrieveConfig (): Promise<any> {
    return this.httpClient.request({
      path: '/custom_attributes/retrieve_config',
      method: 'GET',
      contentType: 'json',
    });
  }

  saveValues ( { userContext, targetOwnerContext, customAttributesValues }: SaveValuesParams): Promise<any> {
    const _values = snakecaseKeys(customAttributesValues);
    const _user = snakecaseKeys(userContext);
    const _owner = snakecaseKeys(targetOwnerContext)

    return this.httpClient.request({
      path: '/custom_attributes/save_values',
      method: 'POST',
      contentType: 'json',
      body: {
        user_context: _user,
        name_owner_context: _owner,
        custom_attributes_values: _values,
        application_context: {
          app_description: this.application.description,
          app_type_sig: this.application.typeSig,
          instance_sig: this.application.instanceSig,
        }
      }
    })
  }

  retrieveValues ( { targetOwnerContext }: RetrieveValuesParams): Promise<any> {
    const owner = snakecaseKeys(targetOwnerContext)

    return this.httpClient.request({
      path: '/custom_attributes/retrieve_values',
      method: 'POST',
      contentType: 'json',
      body: {
        name_owner_context: owner,
        application_context: {
          app_description: this.application.description,
          app_type_sig: this.application.typeSig,
          instance_sig: this.application.instanceSig,
        }
      }
    })
  }
}
