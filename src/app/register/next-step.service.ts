import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { UserFirtFormStep } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class NextStepService {

    private upDateNextStep = new BehaviorSubject(false)
    private upDateregisterSuccess = new BehaviorSubject(false)

    private nextStep: boolean
    private _firstFromValues: UserFirtFormStep
    private registerSuccess: boolean

    constructor() { }


    getNextStep() {
        return this.upDateNextStep.asObservable()
    }

    getFirstFromValues() {
        return this._firstFromValues
    }

    getRegisterSuccess() {
        return this.upDateregisterSuccess.asObservable()
    }

    nextForm(isNext: boolean): void {
        this.nextStep = isNext
        this.upDateNextStep.next(this.nextStep)
    }

    setRegisterSuccess(success) {
        this.registerSuccess = success
        this.upDateregisterSuccess.next(this.registerSuccess)
    }

    setFirstFormValues(info: UserFirtFormStep): void {
        this._firstFromValues = info
    }
}
