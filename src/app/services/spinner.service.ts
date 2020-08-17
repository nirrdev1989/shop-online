import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { strict } from 'assert';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    private isLoding: boolean
    private isLodingChange: BehaviorSubject<boolean>


    constructor() {
        this.isLoding = false
        this.isLodingChange = new BehaviorSubject<boolean>(this.isLoding)
    }

    getisLodingChange() {
        return this.isLodingChange.asObservable()
    }


    setSpinnerStatus(status: boolean) {
        this.isLodingChange.next(status)

    }
}
