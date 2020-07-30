import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserLogInfo } from '../models/User';
import { SideBarService } from '../services/side-bar.service';
import { SpinnerService } from '../services/spinner.service';
import { SubSink } from "subsink";


@Component({
    selector: 'app-public-navbar',
    templateUrl: './public-navbar.component.html',
    styleUrls: ['./public-navbar.component.css'],
})
export class PublicNavbarComponent implements OnInit, OnDestroy {

    subs = new SubSink()
    isLog: boolean
    isAdmin: boolean
    username: string
    loding: boolean

    constructor(
        private userService: UserService,
        private sideBarService: SideBarService,
        private spinnerService: SpinnerService,
        private cdr: ChangeDetectorRef
    ) { }


    ngOnInit(): void {
        this.subs.add(
            this.spinnerService.getSpinnerStatusStartFalse().subscribe((result) => {
                this.loding = result
                this.cdr.detectChanges()
            }),
            this.userService.getSubUserInfo()
                .subscribe((result: UserLogInfo) => {
                    this.isLog = result.isLog
                    this.username = result.name + ' ' + result.lastname
                })
        )
    }


    onLogOut() {
        this.sideBarService.setSlide(false)
        this.userService.logOut()
    }


    ngOnDestroy() {
        this.subs.unsubscribe()
    }

}
