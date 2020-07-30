import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Order } from 'src/app/models/Order';

@Component({
    selector: 'app-order-success',
    templateUrl: './order-success.component.html',
    styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

    urlRef: SafeResourceUrl
    oderInfo: Order

    constructor(private orderService: OrderService, private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.orderService.getUserOrders()
            .subscribe((result) => {
                this.oderInfo = result[result.length - 1]
                console.log(result[result.length - 1])
            })
    }



    createBill() {
        let info = `
         City: ${this.oderInfo.city_to_send}\r\n
         Street: ${this.oderInfo.street_to_send}\r\n
         Total price: ${this.oderInfo.total_price}\r\n
         Card: ${this.oderInfo.credit_card_4_last_numbers}\r\n
         Date to send:  ${this.oderInfo.date_to_send}
        `
        const blob = new Blob([info], { type: 'text/plain' })
        this.urlRef = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob))
    }

}
