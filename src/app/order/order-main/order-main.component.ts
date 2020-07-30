import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/services/side-bar.service';


@Component({
    selector: 'app-order-main',
    templateUrl: './order-main.component.html',
    styleUrls: ['./order-main.component.css']
})
export class OrderMainComponent implements OnInit {

    constructor(
        private sideBarService: SideBarService,
    ) { }

    ngOnInit(): void {
        this.sideBarService.setSlide(false)
    }



}
