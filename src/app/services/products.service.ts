import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../models/Categories';
import { tap } from 'rxjs/operators';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { Product } from '../models/Product';
import { SpinnerService } from './spinner.service';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private categories: Categories[]
    private upDateCategories = new Subject<Categories[]>()
    private currentCategoryNmae: string

    private products: Product[] = []
    private upDateProducts = new Subject<Product[]>()

    constructor(private http: HttpClient, private spinnerService: SpinnerService) { }


    getSubCategories() {
        return this.upDateCategories.asObservable()
    }


    getSubProducts() {
        return this.upDateProducts.asObservable()
    }

    currentCategory() {
        return this.currentCategoryNmae
    }


    setproduct(product: Product) {
        this.products.push(product)
        this.upDateProducts.next([...this.products])
    }


    // get categories
    getCategories(): Observable<Categories[]> {
        // if (this.categories) {
        //     return of(this.categories)
        // }
        return this.http.get<Categories[]>('http://localhost:4567/products/categories')
            .pipe(
                tap((result) => {
                    this.categories = result
                    this.upDateCategories.next([...this.categories])
                })
            )
    }

    // get current category
    getCurrentCategory(categoryName: string): Subscription {
        this.spinnerService.setSpinnerStatus(true)
        this.currentCategoryNmae = categoryName
        console.log('GET CURRENT CATEGORY')
        return this.http.get<Product[]>(`http://localhost:4567/products/categories/${this.currentCategoryNmae}`)
            .pipe(
                tap((result) => {
                    //    console.log(result)
                    this.products = result
                    this.upDateProducts.next([...this.products])
                    this.spinnerService.setSpinnerStatus(false)
                })
            ).subscribe()
    }


    // search products form collention all products
    searchProduct(searchVal: string): void {
        this.spinnerService.setSpinnerStatus(true)
        this.http.post<Product[]>('http://localhost:4567/products/search', { searchVal }, { withCredentials: true })
            .pipe(
                tap((result) => {
                    // console.log(result)
                    this.products = result
                    this.upDateProducts.next([...this.products])
                    this.spinnerService.setSpinnerStatus(false)
                })
            ).subscribe()
    }




}
