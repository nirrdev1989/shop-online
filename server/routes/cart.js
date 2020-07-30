const router = require('express').Router()
const cartService = require('../services/cart')
const { authUser } = require('../auth/auth')
const { validateFileds } = require('../validate/validate-client-propers')


// get cart --> all products of user cart
router.get('/cartproducts', authUser, async (request, response) => {
    const { cartId, userId } = request.session.info

    try {
        const cartProducts = await cartService.getProductsOfCart(cartId)
        const findCart = await cartService.findUserCart(userId)
        // console.log(findCart)
        response.status(200).send({ cartProducts: cartProducts, cartInfo: findCart[0] })
    } catch (error) {
        response.status(500).send(error)
    }

})


// get products count
router.get('/count/cartproducts', authUser, async (request, response) => {
    const { cartId } = request.session.info

    try {
        const count = await cartService.countProductsOfCart(cartId)
        response.status(200).send({
            message: 'Counting cart',
            count: count[0]['COUNT(*)']
        })

    } catch (error) {
        response.status(500).send(error)
    }

})


// add product to cart
router.post('/addproduct', authUser, async (request, response) => {
    const { cartId } = request.session.info
    const product = request.body

    if (validateFileds(product)) return response.status(401).send({ message: 'Invalid info' })


    console.log(product)

    try {
        await cartService.addProductToCart(product, cartId)
        response.status(200).send({
            message: 'Product added to cart'
        })
    } catch (error) {
        response.status(500).send(error)
    }
})


// delete product from cart
router.delete('/deleteproduct/:productId', authUser, async (request, response) => {
    const { productId } = request.params
    // console.log(productId)
    try {
        const productDeleted = await cartService.deleteProductFromCart(productId)

        response.status(200).send({
            message: 'Product deleted to cart'
        })
    } catch (error) {
        response.status(500).send(error)
    }
})


// delete all products from cart
router.delete('/clearcart', authUser, async (request, response) => {
    const { cartId } = request.session.info

    try {
        const clearCart = await cartService.clearAllProductsFromCart(cartId)

        response.status(200).send({
            message: 'Cart clear'
        })

    } catch (error) {
        response.status(500).send(error)
    }
})


module.exports = router