import User from '../input/user';

export interface SaveArgs {
  imageBase64: string;
  userContext: User;
}

export interface GetArgs {
  userContext: User;
  ownerContext: User;
}

export interface DeleteArgs {
  userContext: User;
}

export interface IAvatarsRepo {
  get: (args: GetArgs) => Promise<any>;
  save: (args: SaveArgs) => Promise<any>;
  delete: (args: DeleteArgs) => Promise<any>;
}
