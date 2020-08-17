import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Categories } from 'src/app/models/Categories';
import { Product } from 'src/app/models/Product';
import { SpinnerService } from 'src/app/services/spinner.service';
import { SubSink } from "subsink";


@Component({
    selector: 'app-shop-main',
    templateUrl: './shop-main.component.html',
    styleUrls: ['./shop-main.component.css']
})
export class ShopMainComponent implements OnInit, OnDestroy {

    subs = new SubSink()
    categories: Categories[] = []
    categoryName: string
    serachMessage: string
    products: Product[] = []


    constructor(
        private productsService: ProductsService,
        private cdr: ChangeDetectorRef
    ) { }


    ngOnInit(): void {
        // console.log('HOME COMPONENT')
        this.subs.add(

            this.productsService.getSubCategories().subscribe((result) => { this.categories = result; this.cdr.detectChanges() }),

            this.productsService.getSubProducts()
                .subscribe((result) => {
                    // console.log(result)
                    if (result.length === 0) {
                        this.serachMessage = 'Not found'
                        this.products = []
                        return
                    }
                    this.products = result
                })

        )
    }


    ngOnDestroy() {
        this.subs.unsubscribe()
    }

}
