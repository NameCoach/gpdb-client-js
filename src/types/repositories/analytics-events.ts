import AnalyticEvent from '../input/analytic-event';

export default interface IAnalyticsEventsRepo {
  create: (arg0: AnalyticEvent) => Promise<any>;
}
