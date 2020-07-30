import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { FormValidatorsService } from '../../services/form-validators.service';
import { NextStepService } from '../next-step.service';
import { UserFirtFormStep } from 'src/app/models/User';

@Component({
    selector: 'app-step-one',
    templateUrl: './step-one.component.html',
    styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit {

    registerFirstForm: FormGroup
    passwords: FormGroup
    nextStepUser: boolean
    isSubmit: boolean
    errorFormMessage: string


    constructor(
        public formValidatorsService: FormValidatorsService,
        private formBuilder: FormBuilder,
        private nextFormService: NextStepService
    ) { }


    touchedControlers(password: AbstractControl) {
        if (password.touched) this.isSubmit = false
    }


    ngOnInit() {

        this.nextFormService.getRegisterSuccess().subscribe((result) => {
            console.log(result)
            if (result) {
                this.registerFirstForm.reset()
            }

        })

        this.isSubmit = false
        this.registerFirstForm = this.formBuilder.group({
            id: ['', [
                Validators.required,
                this.formValidatorsService.checkSpace,
                this.formValidatorsService.onlyNumbers
            ]],
            email: ['', [
                Validators.required,
                Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
                this.formValidatorsService.checkSpace,
            ]],
            passwords: this.formBuilder.group({
                password: ['', [
                    Validators.required,
                    Validators.minLength(4),
                    this.formValidatorsService.passwordStatus
                ]],
                confirmPassword: ['', [
                    Validators.required,
                ]],
            }, { validator: this.formValidatorsService.confirmPasswordIsMutch }),
            role: [false],
        })

        if (this.nextFormService.getFirstFromValues()) {
            this.registerFirstForm.setValue(this.nextFormService.getFirstFromValues())
        }

    }

    onNextStep() {
        this.isSubmit = true
        if (this.registerFirstForm.invalid) {
            this.formValidatorsService.validateAllFields(this.registerFirstForm)
            return
        }

        const userId: number = this.registerFirstForm.value.id
        const userEmail: string = this.registerFirstForm.value.email

        this.formValidatorsService.chekUserExsist(userId, userEmail)
            .subscribe((result) => {
                const firstUserInfo: UserFirtFormStep = this.registerFirstForm.value
                this.nextFormService.setFirstFormValues(firstUserInfo)
                this.nextFormService.nextForm(true)
            })
    }


    getFormControl(controlName: string): FormControl {
        return this.registerFirstForm.get(controlName) as FormControl ||
            this.registerFirstForm.controls.passwords.get(controlName) as FormControl
    }


}
