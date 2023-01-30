import User from '../input/user';

export interface SaveArgs {
  firstNameRecordingId: number | string,
  lastNameRecordingId: number |string, 
  userContext: User
}

export interface GetArgs {
  userContext: User,
  ownerContext: User,
}

export interface DeleteArgs extends SaveArgs {}

export interface IPreferredRecordingsRepo {
  get: (args: GetArgs) => Promise<any>;
  save: (args: SaveArgs) => Promise<any>;
  delete: (args: DeleteArgs) => Promise<any>;
}
