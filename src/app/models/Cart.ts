export interface CartProduct {
    product_cart_id: number
    product_name: number
    originalPrice: number
    count: number
    price: number
    image: string
}

export interface ProductCountingInfo {
    product_id: number
    count: number
    price: number
}

export interface CartSearchProducts {
    product_name: string
}

export interface CartInfo {
    cartId: number
    userId: number
    date_created: string
}