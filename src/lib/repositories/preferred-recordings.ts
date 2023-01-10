import IHttpClient from '../../types/http-client';
import Application from '../../types/input/application';
import {
  DeleteArgs,
  GetArgs,
  IPreferredRecordingsRepo,
  SaveArgs,
} from '../../types/repositories/preferred-recordings';

export default class PreferredRecordingsRepository
  implements IPreferredRecordingsRepo {
  private httpClient: IHttpClient;
  private application: Application;

  constructor(httpClient: IHttpClient, application: Application) {
    this.httpClient = httpClient;
    this.application = application;
  }

  save({
    firstNameRecordingId,
    lastNameRecordingId,
    userContext,
  }: SaveArgs): Promise<any> {
    return this.httpClient.request({
      path: '/user/preferred_recordings',
      method: 'POST',
      contentType: 'json',
      body: {
        first_name_recording_id: firstNameRecordingId,
        last_name_recording_id: lastNameRecordingId,
        user_context: userContext,
        application_sig: this.application.instanceSig,
        application_type_sig: this.application.typeSig,
        application_hedb_api_token: this.application.hedbApiToken,
      },
    });
  }

  get({ userContext }: GetArgs): Promise<any> {
    return this.httpClient.request({
      path: '/user/preferred_recordings',
      method: 'GET',
      contentType: 'json',
      params: {
        user_sig: userContext.signature,
        user_sig_type: userContext.signatureType,
        application_sig: this.application.instanceSig,
        application_type_sig: this.application.typeSig,
        application_hedb_api_token: this.application.hedbApiToken,
      },
    });
  }

  delete({
    firstNameRecordingId,
    lastNameRecordingId,
    userContext,
  }: DeleteArgs) {
    return this.httpClient.request({
      path: '/user/preferred_recordings',
      method: 'DELETE',
      contentType: 'json',
      params: {
        first_name_recording_id: firstNameRecordingId,
        last_name_recording_id: lastNameRecordingId,
        user_sig: userContext.signature,
        user_sig_type: userContext.signatureType,
        application_sig: this.application.instanceSig,
        application_type_sig: this.application.typeSig,
        application_hedb_api_token: this.application.hedbApiToken,
      },
    });
  }
}
