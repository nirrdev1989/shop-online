import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { strict } from 'assert';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    private upDateSpinnerStatusTrue = new BehaviorSubject<boolean>(true)
    private upDateSpinnerStatusFalse = new BehaviorSubject<boolean>(false)

    constructor() { }

    getSpinnerStatusStartFalse() {
        return this.upDateSpinnerStatusFalse.asObservable()
    }

    getSpinnerStatusStartTrue() {
        return this.upDateSpinnerStatusTrue.asObservable()
    }

    setSpinnerStatus(status: boolean) {
        this.upDateSpinnerStatusTrue.next(status)
        this.upDateSpinnerStatusFalse.next(status)
    }
}
