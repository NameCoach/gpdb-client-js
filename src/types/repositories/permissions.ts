export enum Resources {
  Pronunciation = "pronunciation",
  UserResponse = "user_response",
  RecordingRequest = "recording_request"
};

export type ResourcePermissions = Record<Resources, string[]>;

export default interface IPronunciationsRepo {
  load: () => Promise<PermissionsManager>;
}
