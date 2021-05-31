import * as jwt from 'jsonwebtoken';
import ICredentials from '../types/credentials';

const EXP_MILLISECONDS = 15 * 1000;

export default class Credentials implements ICredentials {
  constructor(public accessKeyId: string, public secretAccessKey: string) {}

  signature() {
    return jwt.sign(
      { ts: Math.floor(new Date().getTime()) + EXP_MILLISECONDS },
      this.secretAccessKey,
      { algorithm: 'HS256', header: { access_key_id: this.accessKeyId } }
      );
  }

  signatureHeader() {
    return `Bearer:${this.signature()}`;
  }
}

