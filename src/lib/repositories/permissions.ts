import IHttpClient from '../../types/http-client';
import Application from '../../types/input/application';
import IPermissionsRepo, { loadParams, ResourcePermissions } from '../../types/repositories/permissions';
import PermissionsManager from '../permissions-manager';

export default class PermissionsRepository implements IPermissionsRepo {
  private httpClient: IHttpClient;
  private application: Application;

  constructor (httpClient: IHttpClient, application: Application) {
    this.httpClient = httpClient;
    this.application = application;
  }

  async load (rest?: loadParams): Promise<PermissionsManager> {
    const permissions = await this.httpClient.request({
      path: '/permissions',
      method: 'GET',
      contentType: 'json',
      params: {
        application_sig: this.application.instanceSig,
        application_type_sig: this.application.typeSig,
        ...rest,
      },
    });

    return new PermissionsManager(permissions as ResourcePermissions);
  }
}
