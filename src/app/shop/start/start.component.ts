import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/Order';


@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy {

    totalPrice: number
    buttonStatus: string
    lastDateCartCreated: string
    lastOrder: Order
    subInfo: Subscription

    constructor(
        private router: Router,
        private orderService: OrderService,
        private cartService: CartService,
        private cdr: ChangeDetectorRef

    ) { }


    ngOnInit(): void {
        this.cartService.getAllProductsOfCart()

        this.subInfo = this.cartService.getSubCartProducts()
            .subscribe((cartResult) => {
                this.cdr.detectChanges()
                // console.log('START COMPONENT')
                console.log(cartResult)
                this.totalPrice = this.cartService.getTotalPrice()
                const cartInfo = this.cartService.getCartInfo()
                this.lastDateCartCreated = cartInfo?.date_created

                this.orderService.getUserOrders()
                    .subscribe((ordersResult) => {
                        // console.log(ordersResult)
                        if (cartResult.length <= 0 && ordersResult.length <= 0) {
                            return this.buttonStatus = 'Make your first buying'
                        }
                        else if (cartResult.length > 0) {
                            this.lastDateCartCreated = this.fixDate(this.lastDateCartCreated)
                            return this.buttonStatus = 'Continue shopping'
                        }
                        else if (cartResult.length <= 0 && ordersResult.length > 0) {
                            this.buttonStatus = 'Start shopping'
                            this.lastOrder = ordersResult[ordersResult.length - 1]
                            this.lastOrder.date_to_send = this.fixDate(this.lastOrder.date_to_send)
                            // console.log(this.lastOrder)
                        }
                    })
            })
    }


    start() {
        this.router.navigate(['shop-main/products/null'])
    }


    fixDate(date: string) {
        let index = date?.indexOf('T')
        return date?.slice(0, index + 1)
    }


    ngOnDestroy() {
        this.subInfo.unsubscribe()
    }
}
