import Target from '../input/tasrget';
import User from '../input/user';

export interface SimpleSearchParams {
  target: string;
  targetTypeSig: string;
  targetOwnerSig: string;
  [x: string]: any;
}

export interface ComplexSearchParams {
  targets: Array<Target>;
  userContext: User;
  [x: string]: any;
}

export default interface IPronunciationsRepo {
  simpleSearch: (arg0: SimpleSearchParams) => Promise<unknown>;
  complexSearch: (arg0: ComplexSearchParams) => Promise<unknown>;
}
