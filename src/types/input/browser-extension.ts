interface VersionInfo {
  [x: string]: string;
}

export default interface BrowserExtension {
  customerId: string;
  entityId?: string;
  entityType: "browser_extension_user";
  userId: string,
  rootUrl: string,
  toolSignature: string,
  recordingId?: string,
  eventType: string,
  eventId?: string,
  message?: string,
  javascriptLocalTime?: string,
  apexLocalTime?: string,
  eventEnvironmentPath?: string,
  nameParserEventId?: string,
  recommendationModelEventId?: string,
  versionInfo: VersionInfo;
  [x: string]: any;
};
