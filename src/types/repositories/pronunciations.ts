import { TargetTypeSig, UserResponse } from '../input/enum-types';
import NameOwner from '../input/name-owner';
import Target from '../input/tasrget';
import User from '../input/user';

export interface SimpleSearchParams {
  target: string;
  targetTypeSig: TargetTypeSig;
  targetOwnerSig: string;
  [x: string]: any;
}

export interface ComplexSearchParams {
  targets: Array<Target>;
  userContext: User;
  [x: string]: any;
}

export interface UserResponseParams {
  recordingId: string;
  userResponse: UserResponse;
  userContext: User;
  targetOwnerSig: string;
  [x: string]: any;
}

export interface CreateRecordingParams {
  target: string;
  targetTypeSig: TargetTypeSig;
  audioBase64: string;
  userContext: User;
  nameOwnerContext: NameOwner|{};
  [x: string]: any;
}

export interface CreateRecordingRequestParams {
  target: string;
  targetTypeSig: TargetTypeSig;
  targetOwnerContext: User;
  userContext: User;
  [x: string]: any;
}

export default interface IPronunciationsRepo {
  simpleSearch: (arg0: SimpleSearchParams) => Promise<any>;
  complexSearch: (arg0: ComplexSearchParams) => Promise<any>;
  userResponse:(arg0: UserResponseParams) => Promise<any>;
  createRecording:(arg0: CreateRecordingParams) => Promise<any>;
  createRecordingRequest: (arg0: CreateRecordingRequestParams) => Promise<any>;
}
