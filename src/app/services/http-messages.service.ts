import { Injectable } from '@angular/core';
import { HttpMessage } from '../models/HttpMessage';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HttpMessagesService {

    private httpMessages: HttpMessage[] = []
    private upDateHttpMessage = new BehaviorSubject<HttpMessage[]>([])

    constructor() { }


    getHttpMessgaes() {
        return this.upDateHttpMessage.asObservable()
    }

    setMessage(message: HttpMessage) {
        console.log(message)
        this.httpMessages.push(message)
        this.upDateHttpMessage.next([...this.httpMessages])
    }

    removeMessage() {
        this.httpMessages.splice(0, this.httpMessages.length)
        this.upDateHttpMessage.next([...this.httpMessages])

    }
}
