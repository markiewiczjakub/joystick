class DispatcherEvent {
    public eventName: string;
    public callbacks: Array<any>;

    constructor(eventName: string) {
        this.eventName = eventName;
        this.callbacks = [];
    }

    registerCallback(callback: any): void {
        this.callbacks.push(callback);
    }

    unregisterCallback(callback: any): void {
        const index = this.callbacks.indexOf(callback);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
    }

    fire(data: any): void {
        const callbacks = this.callbacks.slice(0);
        callbacks.forEach((callback) => {
            callback(data);
        });
    }
}

export class Dispatcher {
    public events: any;

    constructor() {
        this.events = {};
    }

    dispatch(eventName: string, data: any): void {
        const event = this.events[eventName];
        if (event) {
            event.fire(data);
        }
    }

    on(eventName: string, callback: any): void {
        let event = this.events[eventName];
        if (!event) {
            event = new DispatcherEvent(eventName);
            this.events[eventName] = event;
        }
        event.registerCallback(callback);
    }

    off(eventName: string, callback: any): void {
        const event = this.events[eventName];
        if (event && event.callbacks.indexOf(callback) > -1) {
            event.unregisterCallback(callback);
            if (event.callbacks.length === 0) {
                delete this.events[eventName];
            }
        }
    }
}