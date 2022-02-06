import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventDetaPassingService {
    private subject = new Subject<any>();


    sendEventData(message: string) {
        this.subject.next({ flag: message });
    }

    clearEventData() {
        this.subject.next();
    }

    getEventData(): Observable<any> {
        return this.subject.asObservable();
    }


}