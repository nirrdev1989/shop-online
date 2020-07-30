import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

    ordersCount: number
    activeProducts: number

    constructor(
        private infoService: InfoService
    ) { }


    ngOnInit(): void {
        this.infoService.getOrdersCount().subscribe((result) => this.ordersCount = result.count)
        this.infoService.getCountAllProducts().subscribe((result) => this.activeProducts = result.count)
    }
}
