import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidatorsService } from './form-validators.service';

@Injectable({
    providedIn: 'root'
})
export class FormBuildersService {

    private _registerFirstForm: FormGroup
    private _registerSecondForm: FormGroup

    constructor(
        private formBuilder: FormBuilder,
        private formValidatorsService: FormValidatorsService
    ) { }



    getRegisterFirstFormValue() {
        return this._registerFirstForm.value
    }


    getRegisterSecondFormValue() {
        return this._registerSecondForm.value
    }


    registerFirstForm() {
        return this._registerFirstForm = this.formBuilder.group({
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
    }



    registerSecondForm() {
        return this._registerSecondForm = this.formBuilder.group({
            street: ['', [
                Validators.required,
            ]],
            city: ['', [
                Validators.required,
            ]],
            name: ['', [
                Validators.required,
                this.formValidatorsService.checkSpace,
            ]],
            lastname: ['', [
                Validators.required,
                this.formValidatorsService.checkSpace,
            ]],
        })
    }


}
