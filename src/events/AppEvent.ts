export interface AppEvent {
  // tslint:disable-next-line no-any
  payload: any;
  eventType: string;
  handled: boolean;
}
