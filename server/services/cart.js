const { connectionToMySqlPromise } = require('../promiseDB')


module.exports = {
    cartProductInfo: function (product, cartId) {
        return {
            product_id: product.product_id,
            count: product.count,
            price: product.price,
            cart_id: cartId
        }
    },
    createCart: async function (holder) {
        const newCart = { holder_user_id: holder }

        return await connectionToMySqlPromise('INSERT INTO carts SET ?', newCart)
    },
    findUserCart: async function (userId) {

        return await connectionToMySqlPromise('SELECT * FROM carts WHERE holder_user_id = ?', [userId])
    },
    getProductsOfCart: async function (cartId) {
        return await connectionToMySqlPromise(`
            SELECT products_of_cart.price, products_of_cart.count, products_of_cart.product_cart_id, products.product_name, products.image
            FROM products_of_cart 
            JOIN products ON products.product_id = products_of_cart.product_id 
            WHERE products_of_cart.cart_id = ${cartId}`
        )

    },
    addProductToCart: async function (product, cartId) {

        const newCartProduct = this.cartProductInfo(product, cartId)

        return await connectionToMySqlPromise('INSERT INTO products_of_cart SET ?', newCartProduct)


    },
    deleteProductFromCart: async function (productId) {
        // console.log(productId)

        return await connectionToMySqlPromise('DELETE FROM products_of_cart WHERE product_cart_id = ?', [productId])
    },
    countProductsOfCart: async function (cartId) {

        return await connectionToMySqlPromise('SELECT COUNT(*) FROM products_of_cart WHERE cart_id = ?', [cartId])
    },
    clearAllProductsFromCart: async function (cardId) {

        return await connectionToMySqlPromise('DELETE FROM products_of_cart WHERE cart_id = ?', [cardId])
    },
    setNewDateCartCreated: async function (cardId, dateToday) {

        return await connectionToMySqlPromise(`
        UPDATE carts 
        SET date_created = '${dateToday}'
        WHERE cart_id = ?`, [cardId]
        )
    }


}




