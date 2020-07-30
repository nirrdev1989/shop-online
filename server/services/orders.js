const { connectionToMySqlPromise } = require('../promiseDB')


module.exports = {
    setOrderInfo: function (order, userId, cartId) {
        return {
            user_id: userId,
            cart_id: cartId,
            total_price: order.total_price,
            city_to_send: order.city_to_send,
            street_to_send: order.street_to_send,
            date_to_send: order.date_to_send,
            credit_card_4_last_numbers: Number(order.credit_card_4_last_numbers)
        }
    },
    setOrder: async function (order, userId, cartId) {

        const newOrder = this.setOrderInfo(order, userId, cartId)

        return await connectionToMySqlPromise('INSERT INTO orders SET ?', newOrder)
    },
    getUserOrders: async function (cartId) {
        console.log(cartId)

        return await connectionToMySqlPromise(`SELECT * FROM orders WHERE cart_id = ${cartId}`)
    },
    getCountAllOrders: async function () {

        return await connectionToMySqlPromise('SELECT COUNT(*) FROM orders')

    }
}