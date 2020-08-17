import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable({
    providedIn: 'root'
})
export class HttpEventsService {

    private status: string
    private statusChange: BehaviorSubject<string>

    constructor(private spinnerService: SpinnerService) {
        this.status = ''
        this.statusChange = new BehaviorSubject<string>(this.status)
    }


    getStatus(): Observable<string> {
        return this.statusChange.asObservable()
    }

    chatchHttpEvent(requrst?: HttpRequest<unknown>, status?: string): void {
        this.status = status
        this.statusChange.next(this.status)
    }
}
