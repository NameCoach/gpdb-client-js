import IHttpClient from '../../types/http-client';
import Application from '../../types/input/application';
import {
  DeleteArgs,
  GetArgs,
  IAvatarsRepo,
  SaveArgs,
} from '../../types/repositories/avatars';

export default class AvatarsRepository
  implements IAvatarsRepo {
  private httpClient: IHttpClient;
  private application: Application;

  constructor(httpClient: IHttpClient, application: Application) {
    this.httpClient = httpClient;
    this.application = application;
  }

  save({
    imageBase64,
    userContext,
  }: SaveArgs): Promise<any> {
    return this.httpClient.request({
      path: '/user/avatar',
      method: 'POST',
      contentType: 'json',
      body: {
        image: imageBase64,
        user_context: userContext,
        application_sig: this.application.instanceSig,
        application_type_sig: this.application.typeSig,
        application_hedb_api_token: this.application.hedbApiToken,
      },
    });
  }

  get({ userContext, ownerContext }: GetArgs): Promise<any> {
    return this.httpClient.request({
      path: '/user/avatar',
      method: 'GET',
      contentType: 'json',
      params: {
        user_sig: userContext.signature,
        user_sig_type: userContext.signatureType,
        owner_sig: ownerContext.signature,
        owner_sig_type: ownerContext.signatureType,
        application_sig: this.application.instanceSig,
        application_type_sig: this.application.typeSig,
        application_hedb_api_token: this.application.hedbApiToken,
      },
    });
  }

  delete({
    userContext,
  }: DeleteArgs): Promise<any> {
    debugger;
    return this.httpClient.request({
      path: '/user/avatar',
      method: 'DELETE',
      contentType: 'json',
      body: {
        user_context: userContext,
        application_sig: this.application.instanceSig,
        application_type_sig: this.application.typeSig,
        application_hedb_api_token: this.application.hedbApiToken,
      },
    });
  }
}
