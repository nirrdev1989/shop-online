import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SideBarService {

    private _upDateSildeStatus = new BehaviorSubject<boolean>(false)

    constructor() { }

    getSlideStatus(): Observable<boolean> {
        return this._upDateSildeStatus.asObservable()
    }

    setSlide(status: boolean): void {
        this._upDateSildeStatus.next(status)
    }
}