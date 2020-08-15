import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { FormValidatorsService } from '../../services/form-validators.service';
import { NextStepService } from '../next-step.service';
import { UserFirtFormStep } from 'src/app/models/User';
import { FormBuildersService } from 'src/app/services/form-builders.service';

@Component({
    selector: 'app-step-one',
    templateUrl: './step-one.component.html',
    styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit {

    registerFirstForm: FormGroup
    nextStepUser: boolean
    isSubmit: boolean
    errorFormMessage: string


    constructor(
        public formValidatorsService: FormValidatorsService,
        private nextFormService: NextStepService,
        private formsBuilderService: FormBuildersService) {
        this.registerFirstForm = this.formsBuilderService.registerFirstForm()
    }


    touchedControlers(password: AbstractControl) {
        if (password.touched) this.isSubmit = false
    }


    ngOnInit() {

    }



    onNextStep() {
        this.isSubmit = true
        if (this.registerFirstForm.invalid) {
            this.formValidatorsService.validateAllFields(this.registerFirstForm)
            return
        }

        // console.log(this.formsBuilderService.getRegisterFirstFormValue())

        const userId: number = this.registerFirstForm.value.id
        const userEmail: string = this.registerFirstForm.value.email

        this.formValidatorsService.chekUserExsist(userId, userEmail)
            .subscribe((result) => {
                this.nextFormService.nextForm(true)
            })
    }


    getFormControl(controlName: string): FormControl {
        return this.registerFirstForm.get(controlName) as FormControl ||
            this.registerFirstForm.controls.passwords.get(controlName) as FormControl
    }


}
