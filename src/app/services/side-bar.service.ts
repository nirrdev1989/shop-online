import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SideBarService {

    private _upDateSildeStatus = new BehaviorSubject<boolean>(false)

    constructor() { }

    getSlideStatus() {
        return this._upDateSildeStatus.asObservable()
    }

    setSlide(status: boolean) {
        this._upDateSildeStatus.next(status)
    }
}