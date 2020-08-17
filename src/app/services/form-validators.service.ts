import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { City } from '../models/City';

@Injectable({
    providedIn: "root",
})
export class FormValidatorsService {

    cities: City[]

    constructor(private http: HttpClient) { }

    checkSpace(input: AbstractControl): ValidationErrors | null {
        let inputVal = input.value as string;
        if (inputVal.indexOf(" ") >= 0) {
            return {
                checkSpace: true,
            }
        }
        return null
    }


    onlyNumbers(input: AbstractControl): ValidationErrors | null {
        let inputVal = input.value as string
        if (isNaN(Number(inputVal))) {
            return {
                onlyNumbers: true
            }
        } else {
            return null
        }
    }


    setCurrentDate(): string {
        let date = new Date()
        let today = ''
        console.log(date.toLocaleDateString())
        date.toLocaleDateString().split('.').reverse().map((x) => {
            today += x.length == 1 ? '-0' + x : '-' + x
        })
        return today.slice(1, today.length)
    }


    passwordStatus(password: AbstractControl): ValidationErrors | null {
        const lower = /[a-z]/
        const upper = /[A-Z]/
        const number = /[0-9]/

        let inputVal = password.value as string

        if (inputVal.match(lower) && inputVal.match(upper) && inputVal.match(number))
            return null;
        else {
            return {
                passwordStatus: true,
            }
        }
    }


    firstCarcterToUpperCase(val: string): string {
        let fisrt = val[0].toLocaleUpperCase()
        let word = fisrt + val.slice(1, val.length).toLocaleLowerCase()
        return word
    }


    confirmPasswordIsMutch(passwordsFormFroup: FormGroup): ValidationErrors | null {
        if (
            passwordsFormFroup.controls["password"].value
            ===
            passwordsFormFroup.controls["confirmPassword"].value
        ) {
            return null
        } else {
            return { confirmPasswordIsMutch: true }
        }
    }


    validateAllFields(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach((controlName) => {
            const control = formGroup.get(controlName)
            if (!control.touched) {
                control.markAllAsTouched()
            }
            if (control instanceof FormGroup) {
                this.validateAllFields(control)
            }
        })
    }


    checkInputsStatus(input: AbstractControl): boolean | null {
        if (input.touched && input.invalid) {
            return true
        }
        return null
    }

    displayClass(input: AbstractControl) {
        return {
            'is-valid': input.valid,
            'is-invalid': input.touched && input.invalid
        }
    }


    chekUserExsist(id: number, email: string) {
        const checkInfo = { id: id, email: email }
        return this.http.post('http://localhost:4567/user/chek_exist', checkInfo)
            .pipe(
                tap((result) => {
                    console.log(result)
                })
            )
    }

}
