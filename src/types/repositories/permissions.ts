import PermissionsManager from '../../lib/permissions-manager';

export enum Resources {
  Pronunciation = "pronunciation",
  UserResponse = "user_response",
  RecordingRequest = "recording_request"
}

export type Actions = {
  actions: string[],
  exclude_actions: string[]
}

export type ResourcePermissions = Partial<Record<Resources, Actions>>;

export default interface IPronunciationsRepo {
  load: () => Promise<PermissionsManager>;
}
