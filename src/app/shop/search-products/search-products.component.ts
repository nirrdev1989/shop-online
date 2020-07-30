import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search-products',
    templateUrl: './search-products.component.html',
    styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {

    @Input() serachProducts: boolean
    @Input() serachProductsOnCart: boolean
    @Input() isAdmin: boolean
    searchVal: string = ''

    constructor(
        private cartSerive: CartService,
        private router: Router,
        private route: ActivatedRoute
    ) { }


    ngOnInit(): void {
        // console.log('SEARCH COMPONENT')
        if (this.route.snapshot.params.serach_value) {
            this.searchVal = this.route.snapshot.params.serach_value
        }
    }


    onSearch() {
        if (this.searchVal === '') return

        if (this.serachProducts) {
            this.searchNavigate()
        } else {
            this.cartSerive.searchProductsOnCart(this.searchVal)
        }
    }


    searchNavigate() {
        let url = this.isAdmin ? 'admin/products/search' : 'shop-main/products/search'
        return this.router.navigate([url, this.searchVal])
    }

}
