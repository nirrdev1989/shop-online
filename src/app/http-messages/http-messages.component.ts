import { Component, OnInit } from '@angular/core';
import { HttpMessagesService } from '../services/http-messages.service';
import { HttpMessage } from '../models/HttpMessage';
import { Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';


@Component({
    selector: 'app-http-messages',
    templateUrl: './http-messages.component.html',
    styleUrls: ['./http-messages.component.css']
})
export class HttpMessagesComponent implements OnInit {

    httpMessages: Observable<HttpMessage[]>

    constructor(
        private httpMessagesService: HttpMessagesService,
        private spinnerService: SpinnerService,
    ) { }


    ngOnInit(): void {
        this.httpMessages = this.httpMessagesService.getHttpMessgaes()
        this.checkErrors()
    }


    checkErrors() {
        this.httpMessages.subscribe((result) => {
            this.spinnerService.setSpinnerStatus(false)
        })
    }


    onCloseAlertWindow() {
        this.httpMessagesService.removeMessage()
    }

}
