export type Feature = {
  value: any,
  description: string,
  metadata: { [x: string]: any },
}

export type ClientPreferences = {
  id: number,
  translations: { [x: string]: string },
  custom_features: { [x: string]: Feature },
  source: string
}

export interface loadParams {
  user_sig?: string;
  user_sig_type?: string;
  [x: string]: any;
}

export default interface IClientSidePreferenceRepo {
  load: (params?: loadParams) => Promise<ClientPreferences>;
}
