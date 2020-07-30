import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormValidatorsService } from '../../services/form-validators.service';
import { Observable } from 'rxjs';
import { City } from 'src/app/models/City';
import { NextStepService } from '../next-step.service';
import { User } from 'src/app/models/User';
import { InfoService } from 'src/app/services/info.service';


@Component({
    selector: 'app-step-two',
    templateUrl: './step-two.component.html',
    styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {

    registerSecondForm: FormGroup
    // @Input() firstFormValues: FormGroup
    cities: Observable<City[]>

    constructor(
        public formValidatorsService: FormValidatorsService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        private nextFormService: NextStepService,
        private infoService: InfoService
    ) { }


    ngOnInit() {
        this.cities = this.infoService.getCities()

        this.registerSecondForm = this.formBuilder.group({
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


    onRegister() {
        if (this.registerSecondForm.invalid) {
            this.formValidatorsService.validateAllFields(this.registerSecondForm)
            return
        }

        const { id, email, passwords: { password }, role } = this.nextFormService.getFirstFromValues()
        const { street, city, name, lastname } = this.registerSecondForm.value

        const newUser: User = {
            id: id,
            email: email,
            password: password,
            role: role,
            street: street,
            city: city,
            name: name,
            lastname: lastname

        }

        this.userService.register(newUser).subscribe((result) => {
            this.nextFormService.nextForm(false)
            this.nextFormService.setRegisterSuccess(true)
            this.router.navigate(['home'])
        })
    }


    onBack() {
        this.nextFormService.nextForm(false)
    }


    getFormControl(controlName: string): FormControl {
        return this.registerSecondForm.get(controlName) as FormControl
    }

}