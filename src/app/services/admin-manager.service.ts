import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Subject, Observable, } from 'rxjs';
import { Product } from '../models/Product';

import { ProductsService } from './products.service';

@Injectable({
    providedIn: 'root'
})
export class AdminManagerService {

    private categoryName: string
    private productToEdit: Product
    private upDateProductToEdit = new Subject<Product>()

    constructor(
        private http: HttpClient,
        private productsService: ProductsService

    ) { }


    getProductToEdit(): Observable<Product> {
        return this.upDateProductToEdit.asObservable()
    }

    // admin add product
    addProduct(product): Observable<{ message: string, info }> {
        console.log(product)
        const prod = this.checkImageIsFile(product)
        return this.http.post<{ message: string, info: { id: number, image: string } }>('http://localhost:4567/products/addproductadmin', prod, { withCredentials: true })
            .pipe(
                tap((result) => {
                    console.log(result)
                    product.image = result.info.image
                    product.product_id = result.info.id
                    this.productsService.setproduct(product)
                    // window.location.reload();

                })
            )
    }


    // get curret product to eidit/ admin
    editProduct(product: Product): void {
        this.productToEdit = { ...product }
        this.upDateProductToEdit.next(this.productToEdit)
    }


    // admin update product
    upDataProduct(product): Observable<{}> {
        const prod = this.checkImageIsFile(product)

        return this.http.put<{ message: string }>('http://localhost:4567/products/updateproductadmin', prod, { withCredentials: true })
            .pipe(
                tap((result) => {
                    console.log(result)
                    window.location.reload();
                })
            )
    }

    // check if has file
    checkImageIsFile(product): Product {
        let prod
        if (product.image instanceof File) {
            const formData = new FormData()
            formData.append('image', product.image, product.image.name)
            formData.append('product_name', product.product_name)
            formData.append('category_id', product.category_id)
            formData.append('price', product.price)
            prod = formData
        } else {
            prod = product
        }
        return prod
    }

}
