import { Component, OnInit, Input } from '@angular/core';
import { Categories } from 'src/app/models/Categories';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-products-menu',
    templateUrl: './products-menu.component.html',
    styleUrls: ['./products-menu.component.css']
})
export class ProductsMenuComponent implements OnInit {

    @Input() category: Categories
    @Input() link: RouterLink


    constructor() { }

    ngOnInit(): void {
    }

}
