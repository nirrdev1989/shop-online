import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { UserFirtFormStep } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class NextStepService {

    private nextStep: boolean
    private upDateNextStep = new BehaviorSubject(false)

    constructor() { }


    getNextStep() {
        return this.upDateNextStep.asObservable()
    }

    nextForm(isNext: boolean): void {
        this.nextStep = isNext
        this.upDateNextStep.next(this.nextStep)
    }

}
