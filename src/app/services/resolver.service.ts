import { Injectable } from '@angular/core';
import { Categories } from '../models/Categories';
import { ProductsService } from './products.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from "rxjs";
import { UserService } from './user.service';


@Injectable({
    providedIn: 'root'
})
export class ResolverService implements Resolve<Categories>  {

    constructor(
        private productServices: ProductsService,
        private router: Router,
        private userService: UserService,
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.productServices.getCategories().subscribe((result) => {
            let url = ''
            let userInfo = this.userService.getUserInfo()
            userInfo.isAdmin ? url = 'admin/products/' : url = 'shop-main/products/'

            const firstCategory = result[0].category_name
            const categoryName = route.params.category_name
            const serachValue = route.params.serach_value

            console.log('resolver')

            if (serachValue) {
                this.router.navigate([url + '/search', serachValue])
                return this.productServices.searchProduct(serachValue)
            } else {
                const findCategory = result.find((category) => category.category_name === categoryName)
                if (!findCategory) {
                    this.router.navigate([url, firstCategory])
                } else {
                    return this.productServices.getCurrentCategory(categoryName)
                }
            }
        })
    }

}
