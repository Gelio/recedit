import { AppEvent } from 'events/AppEvent';

export class RenderEvent implements AppEvent {
  public payload = null;
  public eventType = RenderEvent.eventType;
  public handled = false;

  public static get eventType() {
    return 'RenderEvent';
  }
}
