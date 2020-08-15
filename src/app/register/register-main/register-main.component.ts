import { Component, OnInit, OnDestroy } from '@angular/core';
import { NextStepService } from '../next-step.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-register-main',
    templateUrl: './register-main.component.html',
    styleUrls: ['./register-main.component.css']
})
export class RegisterMainComponent implements OnInit, OnDestroy {

    isNextStep: boolean
    subNextForm: Subscription

    constructor(private nextFormService: NextStepService) { }


    ngOnInit(): void {
        this.subNextForm = this.nextFormService.getNextStep()
            .subscribe(
                (result) => this.isNextStep = result
            )
    }


    ngOnDestroy() {
        this.subNextForm.unsubscribe()
    }

}

