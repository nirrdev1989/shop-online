import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, delay } from 'rxjs/operators';
import { HttpMessagesService } from './http-messages.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { SideBarService } from './side-bar.service';
import { SpinnerService } from './spinner.service';
import { HttpEventsService } from './http-events.service';

@Injectable()
export class RequestMessagesInterceptor implements HttpInterceptor {

    constructor(
        private httpMessagesService: HttpMessagesService,
        private router: Router,
        private spinnerService: SpinnerService,
        private userService: UserService,
        private sideBarService: SideBarService,
        private httpEventsService: HttpEventsService
    ) {

    }

    resetPage() {
        this.userService.logOut()
        this.sideBarService.setSlide(false)
        this.router.navigate(['/'])
    }
    // error.statusText === 'Internal Server Error'

    errorMessages(error: HttpErrorResponse) {
        if (error.statusText === 'Unknown Error') {
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
        console.log(request)
        this.httpEventsService.chatchHttpEvent(request, 'start')
        // this.spinnerService.setSpinnerStatus(true)
        return next.handle(request).pipe(
            // delay(500),
            tap((result) => {
                console.log('interceptor seccess request')
                // this.spinnerService.setSpinnerStatus(false)
                this.httpEventsService.chatchHttpEvent(undefined, 'end')
            }),
            catchError((error) => {
                // this.spinnerService.setSpinnerStatus(false)
                this.httpEventsService.chatchHttpEvent(undefined, 'end')
                this.errorMessages(error)
                return of(error)
            })
        )
    }
}
