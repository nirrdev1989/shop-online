import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserLogInfo } from '../../models/User';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    isLog: boolean
    subUserInfo: Subscription
    isAdmin: boolean

    constructor(private userService: UserService) { }


    ngOnInit(): void {
        this.userService.authUserIsLog().subscribe()
        this.subUserInfo = this.userService.getSubUserInfo()
            .subscribe((result: UserLogInfo) => {
                this.isLog = result.isLog
                this.isAdmin = result.isAdmin

            })
    }


    ngOnDestroy() {
        this.subUserInfo.unsubscribe()
    }

}
