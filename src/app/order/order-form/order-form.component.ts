import { Component, OnInit } from '@angular/core';
import { FormValidatorsService } from 'src/app/services/form-validators.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Order } from "../../models/Order";
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

    orderForm: FormGroup

    constructor(
        public formValidatorsService: FormValidatorsService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private cartService: CartService,
        private orderService: OrderService,
        private router: Router
    ) { }


    ngOnInit(): void {
        this.orderForm = this.formBuilder.group({
            city: ['', [
                Validators.required
            ]],
            street: ['', [
                Validators.required
            ]],
            date: ['', [
                Validators.required,
            ]],
            creditCard: ['', [
                Validators.required,
                this.formValidatorsService.onlyNumbers,
                Validators.pattern("[0-9\s]{16}")
            ]]
        })
    }


    onOrder() {
        if (this.orderForm.invalid) {
            this.formValidatorsService.validateAllFields(this.orderForm)
            return
        }

        const { city, street, date, creditCard } = this.orderForm.value
        const order: Order = {
            total_price: this.cartService.getTotalPrice(),
            city_to_send: city,
            street_to_send: street,
            date_to_send: date,
            credit_card_4_last_numbers: String(creditCard.slice(8, 12)),
            dateToday: this.formValidatorsService.setCurrentDate()
        }

        // console.log(order)
        this.orderService.userOrder(order).subscribe((result) => {
            this.router.navigate(['order-success'])
        })

    }


    doubleClickGetUserAdress(event: any) {
        console.log(this.formValidatorsService.setCurrentDate())
        this.userService.authUserIsLog()
            .subscribe((result) => {
                // console.log(result)
                this.orderForm.patchValue({
                    city: result.city,
                    street: result.street,
                    date: this.formValidatorsService.setCurrentDate()
                })
            })

    }



    getFormControl(controlName: string) {
        return this.orderForm.get(controlName) as FormControl
    }

}
