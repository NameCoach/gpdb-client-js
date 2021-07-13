import { sign } from "../platform/jwt";
import ICredentials from '../types/credentials';

const EXP_MILLISECONDS = 15 * 1000;

export default class Credentials implements ICredentials {
  constructor(public accessKeyId: string, public secretAccessKey: string) {}

  signature() {

    return sign({
      algorithm: 'HS256',
      header: { access_key_id: this.accessKeyId },
      payload: { ts: Math.floor(new Date().getTime()) + EXP_MILLISECONDS },
      secretAccessKey: this.secretAccessKey
    });
  }

  signatureHeader() {
    return `Bearer:${this.signature()}`;
  }
}

