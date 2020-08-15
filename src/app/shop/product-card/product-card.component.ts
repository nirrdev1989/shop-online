import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductCountingInfo } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart.service';
import { SideBarService } from 'src/app/services/side-bar.service';
import { AdminManagerService } from 'src/app/services/admin-manager.service';


@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

    @Input() product: Product
    @Input() isAdmin: boolean

    count: number = 1
    loding: boolean = false

    totalPriceProduct: number
    invalidCountMessage: string

    constructor(
        private cartService: CartService,
        private sideBarService: SideBarService,
        private adminManagerService: AdminManagerService
    ) { }


    ngOnInit(): void { }


    onCounting(event: any) {
        if (Number(event.target.value <= 1)) {
            event.target.value = 1
            this.count = 1
        }
    }


    onAddProductToCart() {
        let val = String(this.count)
        if (val.indexOf('.') >= 0) {
            alert('Full numbers')
            return
        }
        const cartProduct: ProductCountingInfo = {
            product_id: this.product.product_id,
            count: this.count,
            price: this.product.price * this.count
        }

        this.cartService.addProductToCart(cartProduct).subscribe(() => {
            this.count = 1
            this.sideBarService.setSlide(true)
        })
    }


    onEditProduct() {
        if (this.isAdmin) {
            console.log(this.product)
            this.sideBarService.setSlide(true)
            this.adminManagerService.editProduct(this.product)
        }
    }




}
