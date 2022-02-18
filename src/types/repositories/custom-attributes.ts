import User from '../input/user';

export type AttributeConfig = {
  id: string,
  label: string,
  presentation: string,
  metadata?: Record<string, any>;
};

export type CustomAttributesConfig = {
  data: AttributeConfig[]
}

export interface SaveValuesParams {
  targetOwnerContext: User;
  userContext: User;
  customAttributesValues: Record<string, string | boolean>;
  [x: string]: any;
}

export default interface ICustomAttributesRepo {
  retrieveConfig: () => Promise<CustomAttributesConfig>;
  saveValues: (arg0: SaveValuesParams) => Promise<any>;
}
