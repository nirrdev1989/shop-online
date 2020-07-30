import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private router: Router
    ) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.userService.authUserIsLog()
            .pipe(
                map((result) => {
                    // console.log('AUTH GUARD CAN ACTIVE ADMIN', result)
                    if (result.isLog && result.isAdmin) {
                        // console.log('IS ADMIN')
                        return true
                    } else {
                        console.log('USER IS NOT LOG')
                        this.router.navigateByUrl('/home')
                        return false
                    }
                })
            )
    }

}
