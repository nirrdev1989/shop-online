import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import { CartSearchProducts, CartProduct, ProductCountingInfo, CartInfo } from "../models/Cart";
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private totalPrice: number
    private cartInfo: CartInfo

    private productsOfCart: CartProduct[] = []
    private upDateProductsOfCart = new Subject<CartProduct[]>()

    private productsCartSearch: CartSearchProducts[] = []
    private upDateproductsCartSearch = new Subject<CartSearchProducts[]>()

    constructor(private http: HttpClient) { }


    getCartInfo(): CartInfo {
        return this.cartInfo
    }


    getSubCartProducts(): Observable<CartProduct[]> {
        return this.upDateProductsOfCart.asObservable()
    }


    getTotalPrice(): number {
        return this.totalPrice
    }


    getSubProductsCartSearch(): Observable<CartSearchProducts[]> {
        return this.upDateproductsCartSearch.asObservable()
    }



    // number og items on user cart 
    cartProductsCount(): Observable<{}> {
        return this.http.get<{ message: string, count: number }>('http://localhost:4567/cart/count/cartproducts', { withCredentials: true })
    }

    // user cart --> products
    getAllProductsOfCart(): void {
        this.http.get<{ cartProducts: CartProduct[], cartInfo: CartInfo }>('http://localhost:4567/cart/cartproducts', { withCredentials: true })
            .pipe(
                tap((result) => {
                    this.cartInfo = result.cartInfo
                    this.productsOfCart = result.cartProducts
                    this.conculateTotalPrice()
                    this.upDateProductsOfCart.next([...this.productsOfCart])
                })
            ).subscribe()
    }


    conculateTotalPrice() {
        this.totalPrice = 0
        this.productsOfCart.map((p) => this.totalPrice += p.price)
    }

    // user add product to cart
    addProductToCart(cartProduct: ProductCountingInfo): Observable<{}> {
        return this.http.post<{ message: string }>('http://localhost:4567/cart/addproduct', cartProduct, { withCredentials: true })
            .pipe(
                tap((result) => {
                    console.log(result)
                    this.getAllProductsOfCart()

                })
            )
    }


    // user delete product fron cart
    deleteProductFromCart(productCartId: number): Observable<{}> {
        return this.http.delete<{ message: string }>(`http://localhost:4567/cart/deleteproduct/${productCartId}`, { withCredentials: true })
            .pipe(
                tap((result) => {
                    console.log(productCartId)
                    this.productsOfCart = this.productsOfCart.filter((p) => p.product_cart_id != productCartId)
                    this.conculateTotalPrice()
                    this.upDateProductsOfCart.next([...this.productsOfCart])
                })
            )
    }


    //delete all products from cart
    deleteAllProductFromCart(): Observable<{}> {
        return this.http.delete<{ message: string }>('http://localhost:4567/cart/clearcart', { withCredentials: true })
            .pipe(
                tap((result) => {
                    console.log(result)
                    this.productsOfCart = []
                    this.upDateProductsOfCart.next([...this.productsOfCart])
                })
            )
    }



    // search products on user cart
    searchProductsOnCart(searchVal: string): void {
        this.http.post<CartSearchProducts[]>('http://localhost:4567/products/search/cart', { searchVal }, { withCredentials: true })
            .pipe(
                tap((result) => {
                    // console.log(result, 'SEARCH CART PRODUCTS')
                    this.productsCartSearch = result
                    this.upDateproductsCartSearch.next([...this.productsCartSearch])
                })
            ).subscribe()
    }


}
