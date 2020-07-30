import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


// components
import { AppComponent } from './app.component';
import { PublicNavbarComponent } from './public-navbar/public-navbar.component';
import { HttpMessagesComponent } from './http-messages/http-messages.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SpinnerComponent } from './spinner/spinner.component';


// home page
import { LoginComponent } from './home/login/login.component';
import { AboutComponent } from './home/about/about.component';
import { InfoComponent } from './home/info/info.component';
import { HomeComponent } from './home/home/home.component';


// register page
import { RegisterMainComponent } from './register/register-main/register-main.component';
import { StepOneComponent } from './register/step-one/step-one.component';
import { StepTwoComponent } from './register/step-two/step-two.component';


// shop components
import { StartComponent } from './shop/start/start.component';
import { ProductCardComponent } from './shop/product-card/product-card.component';
import { CartComponent } from './shop/cart/cart.component';
import { ShopMainComponent } from './shop/shop-main/shop-main.component';
import { SearchProductsComponent } from './shop/search-products/search-products.component';
import { CartBarComponent } from './shop/side-bar/side-bar.component';
import { ProductsMenuComponent } from './shop/products-menu/products-menu.component';


// admin components
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AddProductComponent } from './admin/add-product/add-product.component';



// order components
import { OrderMainComponent } from './order/order-main/order-main.component';
import { OrderFormComponent } from './order/order-form/order-form.component';
import { OrderSuccessComponent } from './order/order-success/order-success.component';


//services
import { RequestMessagesInterceptor } from "./services/request-messages.interceptor";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AboutComponent,
        InfoComponent,
        RegisterMainComponent,
        StepOneComponent,
        StepTwoComponent,
        PublicNavbarComponent,
        StartComponent,
        HttpMessagesComponent,
        FooterComponent,
        ContactComponent,
        HomeComponent,
        ProductCardComponent,
        CartComponent,
        ShopMainComponent,
        SearchProductsComponent,
        CartBarComponent,
        AdminMainComponent,
        AddProductComponent,
        ProductsMenuComponent,
        NotFoundComponent,
        SpinnerComponent,
        OrderMainComponent,
        OrderFormComponent,
        OrderSuccessComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: RequestMessagesInterceptor, multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
