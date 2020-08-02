import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/models/Categories';
import { FormValidatorsService } from 'src/app/services/form-validators.service';
import { Product } from 'src/app/models/Product';
import { AdminManagerService } from 'src/app/services/admin-manager.service';


@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

    productForm: FormGroup
    categories: Observable<Categories[]>
    productToEdit: Product
    imageName: string
    mode: string = 'add'

    constructor(
        public formValidatorsService: FormValidatorsService,
        private formBuilder: FormBuilder,
        private productsService: ProductsService,
        private adminManagerService: AdminManagerService
    ) { }


    ngOnInit(): void {
        this.categories = this.productsService.getCategories()

        this.productForm = this.formBuilder.group({
            name: ['', [
                Validators.required
            ]],
            category_name: ['', [
                Validators.required
            ]],
            price: ['', [
                Validators.required,
                this.formValidatorsService.onlyNumbers
            ]],
            image: [null, [
                Validators.required
            ]],
            product_id: [null]
        })

        this.adminManagerService.getProductToEdit()
            .subscribe((result) => {
                this.setValueProductToEdit(result)
            })
    }



    onSaveProduct() {
        if (this.productForm.invalid) {
            this.formValidatorsService.validateAllFields(this.productForm)
            return
        }

        this.categories.subscribe((result) => {
            const { name, category_name, price, image, product_id } = this.productForm.value

            const categoty = result.find((category) => category.category_name == category_name)

            const newProduct: Product = {
                product_name: name,
                category_id: categoty.category_id,
                price: price,
                image: image,
                product_id: product_id
            }
            // console.log(newProduct)
            // console.log(this.productForm.valid)
            if (this.mode === 'add') {
                this.adminManagerService.addProduct(newProduct)
            } else {
                this.adminManagerService.upDataProduct(newProduct)
                this.mode = 'add'

            }
            this.imageName = null
            this.productForm.reset()
        })

    }


    onClearForm() {
        this.mode = 'add'
        this.productForm.reset()
    }


    onFileSelected(event: Event) {
        const imageFile: File = (event.target as HTMLInputElement).files[0]
        this.imageName = imageFile.name
        this.productForm.patchValue({ image: imageFile })
    }


    setValueProductToEdit(result) {
        this.mode = 'edit'
        this.imageName = null
        console.log(result)
        this.productForm.setValue({
            name: result.product_name,
            category_name: result.category_name ? result.category_name : null,
            price: result.price,
            image: result.image,
            product_id: result.product_id
        })
    }


    getFormControl(controlName: string): FormControl {
        return this.productForm.get(controlName) as FormControl
    }

}
