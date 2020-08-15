import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from '../../services/user.service';
import { AuthData } from 'src/app/models/AuthData';
import { Router } from '@angular/router';
import { FormValidatorsService } from "../../services/form-validators.service";



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    logInForm: FormGroup
    authDate: AuthData
    isSubmit: boolean = false

    constructor(
        public formValidatorsService: FormValidatorsService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
    ) { }


    ngOnInit() {
        this.logInForm = this.formBuilder.group({
            email: ['', [
                Validators.required,
            ]],
            password: ['',
                Validators.required
            ]
        })
    }


    onLogin() {
        this.isSubmit = true
        if (this.logInForm.invalid) {
            this.formValidatorsService.validateAllFields(this.logInForm)
            return
        }

        const authData: AuthData = this.logInForm.value

        this.userService.logIn(authData).subscribe((result) => {
            this.userService.authUserIsLog()
                .subscribe((result) => {
                    // console.log(result)
                    if (result.isAdmin) {
                        this.router.navigate(['admin/products/null'])
                    }
                })
        })
    }


    getFormControl(controlName: string): FormControl {
        return this.logInForm.get(controlName) as FormControl
    }

}
