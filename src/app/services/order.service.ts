import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/Order';
import { tap } from 'rxjs/operators';
import { CartService } from './cart.service';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class OrderService {



    constructor(private http: HttpClient, private cartService: CartService) { }

    // user new order
    userOrder(order: Order): Observable<{}> {
        return this.http.post<{ message: string }>('http://localhost:4567/orders/addorder', order, { withCredentials: true })
            .pipe(
                tap((result) => {
                    console.log(result)
                    this.cartService.deleteAllProductFromCart().subscribe(() => { })
                })
            )
    }

    // user orders
    getUserOrders(): Observable<Order[]> {
        // console.log('USER ORDER REQUEST')
        return this.http.get<Order[]>('http://localhost:4567/orders/lastorders/user', { withCredentials: true })
            .pipe(
                tap((result) => {
                    // console.log(result)
                })
            )
    }

}
