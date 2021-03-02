export default interface AnalyticEvent {
  customerId: string;
  entityId: string;
  entityType: string;
  userId: string,
  toolSignature?: string,
  recordingId?: string,
  eventType?: string,
  eventId?: string,
  message?: string,
  javascriptLocalTime?: string,
  eventEnvironmentPath?: string,
  nameParserEventId?: string,
  recommendationModelEventId?: string,
  [x: string]: any;
};
