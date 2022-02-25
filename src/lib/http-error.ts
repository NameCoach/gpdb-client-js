export interface IHttpErrorDetails {
  status: number;
  body?: Record<string, unknown>;
  service?: string;
}

export default class HttpError extends Error {
  constructor(message?: string, details?: IHttpErrorDetails) {
    super(message);
    this.details = details;
  }
  details?: IHttpErrorDetails;
}
