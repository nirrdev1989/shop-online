import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home/home.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterMainComponent } from './register/register-main/register-main.component';
import { ShopMainComponent } from './shop/shop-main/shop-main.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderMainComponent } from './order/order-main/order-main.component';
import { OrderSuccessComponent } from './order/order-success/order-success.component';


// services
import { AuthGuardGuard } from './services/auth-guard.guard';
import { AdminGuard } from './services/admin.guard';
import { ResolverService } from "./services/resolver.service";


const routes: Routes = [
    {
        path: 'home', component: HomeComponent
    },
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'contact', component: ContactComponent
    },
    {
        path: 'register', component: RegisterMainComponent
    },

    {
        path: 'shop-main/products/:category_name', component: ShopMainComponent,
        canActivate: [AuthGuardGuard],
        resolve: {
            category: ResolverService
        }
    },
    {
        path: 'shop-order', component: OrderMainComponent,
        canActivate: [AuthGuardGuard]
    },
    {
        path: 'shop-main/products/search/:serach_value', component: ShopMainComponent,
        canActivate: [AuthGuardGuard],
        resolve: {
            search: ResolverService
        }

    },
    {
        path: 'order-success', component: OrderSuccessComponent,
        canActivate: [AuthGuardGuard]
    },
    // ADMIN

    {
        path: 'admin/products/:category_name', component: AdminMainComponent,
        canActivate: [AdminGuard],
        resolve: {
            category: ResolverService
        }
    },
    {
        path: 'admin/products/search/:serach_value', component: AdminMainComponent,
        canActivate: [AdminGuard],
        resolve: {
            search: ResolverService
        }

    },
    {
        path: '**', component: NotFoundComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
