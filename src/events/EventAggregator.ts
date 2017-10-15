import { AppEvent } from 'events/AppEvent';

type EventListener = (event: AppEvent) => void;

export class EventAggregator {
  private listenerMap = new Map<string, EventListener[]>();

  public addEventListener(eventType: string, listener: EventListener) {
    const eventListeners = this.getEventListeners(eventType);

    if (eventListeners.indexOf(listener) === -1) {
      eventListeners.push(listener);
    }

    this.listenerMap.set(eventType, eventListeners);
  }

  public removeEventListener(eventType: string, listener: EventListener) {
    const eventListeners = this.getEventListeners(eventType);
    const listenerIndex = eventListeners.indexOf(listener);

    if (listenerIndex !== -1) {
      eventListeners.splice(listenerIndex, 1);
    }

    this.listenerMap.set(eventType, eventListeners);
  }

  public dispatchEvent(event: AppEvent) {
    const eventListeners = this.getEventListeners(event.eventType);
    eventListeners.forEach(listener => listener(event));
  }

  private getEventListeners(eventType: string) {
    return this.listenerMap.get(eventType) || [];
  }
}
