import Application from './input/application';
import AnalyticsEventsRepo from './repositories/analytics-events';
import { IAvatarsRepo } from './repositories/avatars';
import BrowserExtensionRepo from './repositories/browser-extension';
import CustomAttributesRepo from './repositories/custom-attributes';
import { IPreferredRecordingsRepo } from './repositories/preferred-recordings';
import PronunciationsRepo from './repositories/pronunciations';

export default interface IClient {
  application: Application,
  pronunciations: PronunciationsRepo;
  analyticsEvents: AnalyticsEventsRepo;
  browserExtension: BrowserExtensionRepo;
  customAttributes: CustomAttributesRepo;
  preferredRecordings: IPreferredRecordingsRepo;
  avatars: IAvatarsRepo;
}
