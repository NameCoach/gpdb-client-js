import Application from './input/application';
import AnalyticsEventsRepo from './repositories/analytics-events';
import BrowserExtensionRepo from './repositories/browser-extension';
import PronunciationsRepo from './repositories/pronunciations';

export default interface IClient {
  application: Application,
  pronunciations: PronunciationsRepo;
  analyticsEvents: AnalyticsEventsRepo;
  browserExtension: BrowserExtensionRepo
}
