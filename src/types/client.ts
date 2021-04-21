import PronunciationsRepo from './repositories/pronunciations';
import AnalyticsEventsRepo from './repositories/analytics-events';
import Application from './input/application';

export default interface IClient {
  application: Application,
  pronunciations: PronunciationsRepo;
  analyticsEvents: AnalyticsEventsRepo;
}
