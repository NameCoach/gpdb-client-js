export default interface ICredentials {
  accessKeyId: string;
  secretAccessKey: string;
  signature: () => string;
  signatureHeader: () => string;
}
