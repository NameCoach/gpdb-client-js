import PermissionsManager from '../../lib/permissions-manager';

export enum Resources {
  Pronunciation = "pronunciation",
  UserResponse = "user_response",
  RecordingRequest = "recording_request"
}

export type ResourcePermissions = Partial<Record<Resources, string[]>>;

export default interface IPronunciationsRepo {
  load: () => Promise<PermissionsManager>;
}
