import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpMessagesService } from './http-messages.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { SideBarService } from './side-bar.service';
import { SpinnerService } from './spinner.service';

@Injectable()
export class RequestMessagesInterceptor implements HttpInterceptor {

    constructor(
        private httpMessagesService: HttpMessagesService,
        private router: Router,
        private spinnerService: SpinnerService,
        private userService: UserService,
        private sideBarService: SideBarService
    ) { }

    resetPage() {
        this.userService.logOut()
        this.sideBarService.setSlide(false)
        this.spinnerService.setSpinnerStatus(false)
        this.router.navigate(['/'])
    }
    // error.statusText === 'Internal Server Error'

    errorMessages(error: HttpErrorResponse) {
        if (error.statusText === 'Unknown Error') {
            console.log(error)
            this.httpMessagesService.setMessage(
                {
                    type: error,
                    description: error.statusText + ' : Check server',
                    success: false
                }
            )
        }
        else if (error.status === 500) {
            // console.log(error.statusText)
            this.resetPage()
        }
        else {
            console.log(error.statusText)
            this.httpMessagesService.setMessage(
                {
                    type: error,
                    description: error.error.message,
                    success: false
                }
            )
        }
    }


    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // console.log(request)
        return next.handle(request).pipe(
            tap((result) => {
                // console.log(result)
            }),
            catchError((error) => {
                this.errorMessages(error)
                return of(error)
            })
        )
    }
}
