import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SideBarService } from './services/side-bar.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    slide: boolean
    subSilde: Subscription

    constructor(private sideBarService: SideBarService, private cdr: ChangeDetectorRef) { }


    ngOnInit() {
        this.subSilde = this.sideBarService.getSlideStatus().subscribe((result) => {
            this.slide = result
            this.cdr.detectChanges()
        })
    }


    ngOnDestroy() {
        this.subSilde.unsubscribe()
    }
}
