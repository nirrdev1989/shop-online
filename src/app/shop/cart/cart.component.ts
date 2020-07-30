import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/Product';
import { CartSearchProducts, CartProduct, ProductCountingInfo } from "src/app/models/Cart";
import { SpinnerService } from 'src/app/services/spinner.service';
import { ProductsService } from 'src/app/services/products.service';
import { SubSink } from "subsink"
import { AdminManagerService } from 'src/app/services/admin-manager.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

    @Input() order: boolean
    subs = new SubSink()

    cartProducts: CartProduct[] = []
    totalPrice: number

    searchProductOnCart: CartSearchProducts[] = []
    productSearchName: string

    constructor(
        private cartService: CartService,
    ) { }

    ngOnInit(): void {
        // console.log('CART COMPONENT')
        this.cartService.getAllProductsOfCart()
        this.subs.add(
            this.cartService.getSubCartProducts().subscribe((result) => {
                console.log('CART COMPONENT')
                this.cartProducts = result
                this.totalPrice = this.cartService.getTotalPrice(),
                    this.onSerchProductsOnCart()
            }),
        )

    }


    onDeleteProductFromCart(productId: number) {
        this.cartService.deleteProductFromCart(productId)
    }

    onClearCart() {
        this.cartService.deleteAllProductFromCart()
    }


    onSerchProductsOnCart() {
        if (this.order) {
            this.cartService.getSubProductsCartSearch()
                .subscribe((result) => {
                    this.productSearchName = ''
                    this.searchProductOnCart = result
                    this.searchProductOnCart.forEach((product) => {
                        this.productSearchName = product.product_name
                    })
                })
        }
    }


    ngOnDestroy() {
        this.subs.unsubscribe()
    }


}
