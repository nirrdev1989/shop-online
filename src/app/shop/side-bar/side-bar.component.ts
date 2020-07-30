import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { SideBarService } from 'src/app/services/side-bar.service';
import { SubSink } from "subsink"


@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css']
})
export class CartBarComponent implements OnInit, OnDestroy {

    subs = new SubSink()

    @Input() isAdmin

    slide: boolean = false
    cartCountProducts: number

    constructor(
        private cartService: CartService,
        private sideBarService: SideBarService
    ) { }


    ngOnInit(): void {
        console.log(this.isAdmin)
        this.subs.add(
            this.sideBarService.getSlideStatus().subscribe((result) => { this.slide = result }),
        )
        // console.log('side bar componennt')
        if (!this.isAdmin) {
            this.cartService.getSubCartProducts().subscribe((result) => this.cartCountProducts = result.length)
        }
    }


    openNav() {
        this.slide = !this.slide
        this.sideBarService.setSlide(this.slide)
    }

    ngOnDestroy() {
        this.subs.unsubscribe()
    }

}
