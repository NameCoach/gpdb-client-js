import PermissionsManager from '../../lib/permissions-manager';

export enum Resources {
  Pronunciation = "pronunciation",
  UserResponse = "user_response",
  RecordingRequest = "recording_request",
  CustomAttributes = "custom_attributes",
  PreferredRecordings = "preferred_recordings",
  Avatars = "avatar"
}

export type Actions = {
  actions: string[],
  exclude_actions: string[]
}

export interface loadParams {
  user_sig?: string;
  user_sig_type?: string;
  [x: string]: any;
}

export type ResourcePermissions = Partial<Record<Resources, Actions>>;

export default interface IPronunciationsRepo {
  load: (params?: loadParams) => Promise<PermissionsManager>;
}
