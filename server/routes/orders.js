const router = require('express').Router()
const ordersService = require('../services/orders')
const cartService = require('../services/cart')
const { authUser } = require('../auth/auth')
const { validateFileds } = require('../validate/validate-client-propers')



// user new order
router.post('/addorder', authUser, async (request, response) => {
    const { userId, cartId } = request.session.info
    const order = request.body
    console.log(userId, cartId, 'USER OREDERRRRR')

    if (validateFileds(order)) return response.status(401).send({ message: 'Invalid info' })

    try {

        const newOrder = await ordersService.setOrder(order, userId, cartId)

        const resetCartDate = await cartService.setNewDateCartCreated(cartId, order.dateToday)

        response.send({ message: 'Order success' })
    } catch (error) {
        response.status(500).send(error)
    }
})


// get  user orders
router.get('/lastorders/user', authUser, async (request, response) => {
    const { cartId } = request.session.info

    try {
        const userOrders = await ordersService.getUserOrders(cartId)
        // console.log(userOrders)

        response.status(200).send(userOrders)
    } catch (error) {
        response.status(500).send(error)
    }

})


// get orders count
router.get('/orderscount', async (request, response) => {

    try {
        const ordersCount = await ordersService.getCountAllOrders()
        // console.log(ordersCount)
        response.send({ message: 'Orders count', count: ordersCount[0]['COUNT(*)'] })
    } catch (error) {
        response.status(500).send(error)
    }
})




module.exports = router