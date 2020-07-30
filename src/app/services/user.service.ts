import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User, UserLogInfo } from "../models/User";
import { AuthData } from "../models/AuthData";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { tap, map } from "rxjs/operators";
import { Router } from '@angular/router';
import { SpinnerService } from './spinner.service';



@Injectable({
    providedIn: 'root'
})
export class UserService {

    private isLog: boolean
    private _userInfo: UserLogInfo
    private _upDateUserInfo = new Subject<UserLogInfo>()

    constructor(
        private http: HttpClient,
        private router: Router,
        private spinnerService: SpinnerService
    ) { }


    getUserInfo() {
        return this._userInfo
    }


    getSubUserInfo() {
        return this._upDateUserInfo.asObservable()
    }


    // user register
    register(user: User) {
        this.spinnerService.setSpinnerStatus(true)
        const newUser: User = { ...user }
        return this.http.post<{ message: string }>('http://localhost:4567/user/register', newUser)
            .pipe(
                tap((result) => {
                    this.spinnerService.setSpinnerStatus(false)
                })
            )
    }


    // user log in
    logIn(authData: AuthData) {
        return this.http.post<{ message: string }>('http://localhost:4567/user/login', authData, { withCredentials: true })
            .pipe(
                tap((result) => {
                    this.isLog = true
                    // console.log(result)
                })
            )
    }


    // auth user is log
    authUserIsLog(): Observable<any> {
        this.spinnerService.setSpinnerStatus(true)
        return this.http.get<UserLogInfo>('http://localhost:4567/user/auth', { withCredentials: true })
            .pipe(
                tap((result) => {
                    // console.log(result, 'REQUEST CHECK USER IS LOG')
                    this.isLog = true
                    this._userInfo = result
                    this._upDateUserInfo.next(this._userInfo)
                    this.spinnerService.setSpinnerStatus(false)
                })
            )
    }

    // user log out
    logOut() {
        this.spinnerService.setSpinnerStatus(true)
        this.http.get<{ message: string }>('http://localhost:4567/user/logout', { withCredentials: true })
            .subscribe((result) => {
                // console.log(result)
                this.router.navigate(['/'])
                this._userInfo = {
                    name: '',
                    lastname: '',
                    isLog: false,
                    isAdmin: null,
                    city: null,
                    strret: null
                }
                this.spinnerService.setSpinnerStatus(false)
                this._upDateUserInfo.next(this._userInfo)
            })
    }



}
