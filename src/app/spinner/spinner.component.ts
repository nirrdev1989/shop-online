import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { HttpEventsService } from '../services/http-events.service';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

    isLoading: boolean = false

    constructor(
        private spinnerService: SpinnerService,
        private cdr: ChangeDetectorRef,
        private httpEventsService: HttpEventsService
    ) { }

    ngOnInit(): void {
        this.httpEventsService.getStatus().subscribe((result) => {
            this.cdr.detectChanges()
            if (result == 'start') {
                this.isLoading = true
            } else {
                this.isLoading = false
            }
        })
    }

}
