export interface Order {
    total_price: number
    city_to_send: string
    street_to_send: string
    date_to_send: string
    credit_card_4_last_numbers: number | string,
    dateToday?: string
}