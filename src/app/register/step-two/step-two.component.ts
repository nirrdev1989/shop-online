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
import { FormBuildersService } from 'src/app/services/form-builders.service';


@Component({
    selector: 'app-step-two',
    templateUrl: './step-two.component.html',
    styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {

    registerSecondForm: FormGroup
    cities: Observable<City[]>

    constructor(
        public formValidatorsService: FormValidatorsService,
        private userService: UserService,
        private router: Router,
        private nextFormService: NextStepService,
        private infoService: InfoService,
        private formBuilderService: FormBuildersService) {
        this.registerSecondForm = this.formBuilderService.registerSecondForm()
    }


    ngOnInit() {
        this.cities = this.infoService.getCities()
    }


    onRegister() {
        if (this.registerSecondForm.invalid) {
            this.formValidatorsService.validateAllFields(this.registerSecondForm)
            return
        }

        const { id, email, passwords: { password }, role } = this.formBuilderService.getRegisterFirstFormValue()
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

        // console.log(newUser)
        this.userService.register(newUser).subscribe(
            () => {
                this.nextFormService.nextForm(false)
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