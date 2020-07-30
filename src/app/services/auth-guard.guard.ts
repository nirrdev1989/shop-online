import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

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
                    if (result.isLog && !result.isAdmin) {
                        return true
                    } else {
                        // console.log('USER IS NOT LOG')
                        this.router.navigateByUrl('/home')
                        return false
                    }
                })
            )
    }

}
