import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import { CartSearchProducts, CartProduct, ProductCountingInfo, CartInfo } from "../models/Cart";
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
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

    constructor(private http: HttpClient, private spinnerService: SpinnerService) { }


    getCartInfo() {
        return this.cartInfo
    }


    getSubCartProducts() {
        return this.upDateProductsOfCart.asObservable()
    }


    getTotalPrice() {
        return this.totalPrice
    }


    getSubProductsCartSearch() {
        return this.upDateproductsCartSearch.asObservable()
    }



    // number og items on user cart 
    cartProductsCount() {
        return this.http.get<{ message: string, count: number }>('http://localhost:4567/cart/count/cartproducts', { withCredentials: true })
            .pipe(
                tap((result) => {
                    console.log(result)
                })
            )

    }

    // user cart --> products
    getAllProductsOfCart(): void {
        this.spinnerService.setSpinnerStatus(true)
        this.http.get<{ cartProducts: CartProduct[], cartInfo: CartInfo }>('http://localhost:4567/cart/cartproducts', { withCredentials: true })
            .pipe(
                map((result) => {
                    this.cartInfo = result.cartInfo
                    this.totalPrice = 0
                    result.cartProducts.map((product) => this.totalPrice += product.price)
                    return result
                }),
                tap((result) => {
                    this.productsOfCart = result.cartProducts
                    this.upDateProductsOfCart.next([...this.productsOfCart])
                    this.spinnerService.setSpinnerStatus(false)

                })
            ).subscribe()
    }


    // user add product to cart
    addProductToCart(cartProduct: ProductCountingInfo): void {
        this.http.post<{ message: string }>('http://localhost:4567/cart/addproduct', cartProduct, { withCredentials: true })
            .pipe(
                tap((result) => {
                    console.log(result)
                    this.getAllProductsOfCart()

                })
            ).subscribe()
    }


    // user delete product fron cart
    deleteProductFromCart(productCartId: number): void {
        this.http.delete<{ message: string }>(`http://localhost:4567/cart/deleteproduct/${productCartId}`, { withCredentials: true })
            .pipe(
                tap((result) => {
                    console.log(result)
                    this.getAllProductsOfCart()
                })
            ).subscribe()
    }


    //delete all products from cart
    deleteAllProductFromCart() {
        this.http.delete<{ message: string }>('http://localhost:4567/cart/clearcart', { withCredentials: true })
            .pipe(
                tap((result) => {
                    console.log(result)
                    this.getAllProductsOfCart()
                })
            ).subscribe()
    }



    // search products on user cart
    searchProductsOnCart(searchVal: string): void {
        this.spinnerService.setSpinnerStatus(true)
        this.http.post<CartSearchProducts[]>('http://localhost:4567/products/search/cart', { searchVal }, { withCredentials: true })
            .pipe(
                tap((result) => {
                    console.log(result, 'SEARCH CART PRODUCTS')
                    this.productsCartSearch = result
                    this.upDateproductsCartSearch.next([...this.productsCartSearch])
                    this.spinnerService.setSpinnerStatus(false)
                })
            ).subscribe()
    }


}
