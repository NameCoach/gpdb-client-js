import PronunciationsRepo from './repositories/pronunciations';
import AnalyticsEventsRepo from './repositories/analytics-events';

export default interface IClient {
  pronunciations: PronunciationsRepo;
  analyticsEvents: AnalyticsEventsRepo;
}
