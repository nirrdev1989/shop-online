import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/City';
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class InfoService {

    cities: City[]

    constructor(private http: HttpClient) { }


    getCities(): Observable<City[]> {
        if (this.cities) {
            return of(this.cities)
        }
        return this.http.get<City[]>("http://localhost:4567/info/cities")
            .pipe(
                tap((result) => {
                    this.cities = result
                })
            )
    }

    // total orders
    getOrdersCount(): Observable<{ message: string, count: number }> {
        return this.http.get<{ message: string, count: number }>('http://localhost:4567/orders/orderscount')
    }


    // get count all products
    getCountAllProducts(): Observable<{ message: string, count: number }> {
        return this.http.get<{ message: string, count: number }>('http://localhost:4567/products/all/count')
    }



}
