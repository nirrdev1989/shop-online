export interface Product {
    resetId?: number
    product_id?: number
    category_name?: string
    product_name: string
    category_id: number | string
    price: number
    image: string | File
}

