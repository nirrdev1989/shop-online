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


    getUserInfo(): UserLogInfo {
        return this._userInfo
    }


    getSubUserInfo(): Observable<UserLogInfo> {
        return this._upDateUserInfo.asObservable()
    }


    // user register
    register(user: User): Observable<{}> {
        const newUser: User = { ...user }
        return this.http.post<{ message: string }>('http://localhost:4567/user/register', newUser)
            .pipe(
                tap((result) => {
                })
            )
    }


    // user log in
    logIn(authData: AuthData): Observable<{}> {
        return this.http.post<{ message: string }>('http://localhost:4567/user/login', authData, { withCredentials: true })
            .pipe(
                tap((result) => {
                    this.isLog = true
                    // console.log(result)
                })
            )
    }


    // auth user is log
    authUserIsLog(): Observable<UserLogInfo> {
        return this.http.get<UserLogInfo>('http://localhost:4567/user/auth', { withCredentials: true })
            .pipe(
                tap((result) => {
                    // console.log(result, 'REQUEST CHECK USER IS LOG')
                    this.isLog = true
                    this._userInfo = result
                    this._upDateUserInfo.next({ ...this._userInfo })
                })
            )
    }

    // user log out
    logOut(): void {
        this.http.get<{ message: string }>('http://localhost:4567/user/logout', { withCredentials: true })
            .pipe(
                tap(() => {
                    this.router.navigate(['/'])
                    this._userInfo = {
                        name: '',
                        lastname: '',
                        isLog: false,
                        isAdmin: null,
                        city: null,
                        street: null
                    }

                    this._upDateUserInfo.next({ ...this._userInfo })
                })
            ).subscribe()
    }



}
