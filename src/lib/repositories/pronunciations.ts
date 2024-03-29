import snakecaseKeys from 'snakecase-keys';

import IHttpClient from '../../types/http-client';
import Application from '../../types/input/application';
import IPronunciationsRepo, {
  ComplexSearchParams, CreateRecordingParams, CreateRecordingRequestParams,
  DestroyRestoreParams,
  SearchBySigParams, SimpleSearchParams,
  UserResponseParams
} from '../../types/repositories/pronunciations';


export default class PronunciationsRepository implements IPronunciationsRepo {
  private httpClient: IHttpClient;
  private application: Application;

  constructor (httpClient: IHttpClient, application: Application) {
    this.httpClient = httpClient;
    this.application = application;
  }

  simpleSearch ({
                  target,
                  targetTypeSig,
                  targetOwnerSig,
                  ...rest
                }: SimpleSearchParams): Promise<any> {
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

  complexSearch ({
                   targets,
                   userContext,
                   ...rest
                 }: ComplexSearchParams): Promise<any> {
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

  searchBySig ({
                 targetOwnerContext,
                   userContext,
                   ...rest
                 }: SearchBySigParams): Promise<any> {
    const _target_owner_context = snakecaseKeys(targetOwnerContext);
    const _user = snakecaseKeys(userContext);

    return this.httpClient.request({
      path: '/pronunciations/search_by_sig',
      method: 'POST',
      contentType: 'json',
      body: {
        target_owner_context: _target_owner_context,
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

  destroy ({ id, userContext, ...rest }: DestroyRestoreParams): Promise<any> {
    const _user = snakecaseKeys(userContext);

    return this.httpClient.request({
      path: `/pronunciations/${id}`,
      method: 'DELETE',
      contentType: 'json',
      body: {
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

  restore ({ id, userContext, ...rest }: DestroyRestoreParams): Promise<any> {
    const _user = snakecaseKeys(userContext);

    return this.httpClient.request({
      path: `/pronunciations/${id}/restore`,
      method: 'PUT',
      contentType: 'json',
      body: {
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

  userResponse ({
                  recordingId,
                  userResponse,
                  userContext,
                  targetOwnerSig,
                  targetOwnerSigType,
                  ...rest
                }: UserResponseParams): Promise<any> {
              
    const { signature, signatureType } = userContext;

    return this.httpClient.request({
      path: `/pronunciations/${recordingId}/user_response`,
      method: 'POST',
      contentType: 'json',
      body: {
        user_response: userResponse,
        user_sig: signature,
        user_signature_type: signatureType,
        name_owner_sig: targetOwnerSig,
        name_owner_signature_type: targetOwnerSigType,
        ...rest
      }
    });
  }

  createRecording ({
                     target,
                     targetTypeSig,
                     audioBase64,
                     userContext,
                     nameOwnerContext = {},
                     ...rest
                   }: CreateRecordingParams): Promise<any> {

    const _user = snakecaseKeys(userContext);
    const _name_owner = snakecaseKeys(nameOwnerContext);

    return this.httpClient.request({
      path: '/pronunciations',
      method: 'POST',
      contentType: 'json',
      body: {
        name_text: target,
        audio_data: audioBase64,
        target_type_sig: targetTypeSig,
        user_context: _user,
        name_owner_context: _name_owner,
        application_context: {
          app_description: this.application.description,
          app_type_sig: this.application.typeSig,
          instance_sig: this.application.instanceSig,
          hedb_api_token: this.application.hedbApiToken,
          ...rest
        }
      }
    });
  }

  createRecordingRequest({ target, targetTypeSig, targetOwnerContext, userContext, ...rest }: CreateRecordingRequestParams): Promise<any> {
    const _user = snakecaseKeys(userContext);
    const _target_owner_context = snakecaseKeys(targetOwnerContext);

    return this.httpClient.request({
      path: '/recording_requests',
      method: 'POST',
      contentType: 'json',
      body: {
        target,
        target_type_sig: targetTypeSig,
        target_owner_context: _target_owner_context,
        user_context: _user,
        application_context: {
          app_description: this.application.description,
          app_type_sig: this.application.typeSig,
          instance_sig: this.application.instanceSig,
          hedb_api_token: this.application.hedbApiToken,
        },
        ...rest
      }
    });
  }

  findRecordingRequest({ target, targetTypeSig, targetOwnerContext, userContext, ...rest }: CreateRecordingRequestParams): Promise<any> {
    const _user = snakecaseKeys(userContext);
    const _target_owner_context = snakecaseKeys(targetOwnerContext);

    return this.httpClient.request({
      path: '/recording_requests/find',
      method: 'POST',
      contentType: 'json',
      body: {
        target,
        target_type_sig: targetTypeSig,
        target_owner_context: _target_owner_context,
        user_context: _user,
        application_context: {
          app_description: this.application.description,
          app_type_sig: this.application.typeSig,
          instance_sig: this.application.instanceSig,
          hedb_api_token: this.application.hedbApiToken,
        },
        ...rest
      }
    });
  }
}
