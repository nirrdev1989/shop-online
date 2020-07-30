const { connectionToMySqlPromise } = require('../promiseDB')


module.exports = {
    productInfo: function (request, url) {
        return {
            product_name: request.body.product_name,
            category_id: request.body.category_id,
            price: request.body.price,
            image: url ? url + "/images/" + request.file.filename : request.body.image
        }
    },
    getCategories: async function () {
        return await connectionToMySqlPromise('SELECT * FROM categories')
    },
    getCategoryProducts: async function (categoryname) {
        return await connectionToMySqlPromise(
            'SELECT * FROM products JOIN categories ON categories.category_id = products.category_id WHERE category_name = ?',
            [categoryname]
        )
    },
    addProduct: async function (product) {
        return await connectionToMySqlPromise('INSERT INTO products SET ?', product)
    },
    editProduct: async function (product) {
        return await connectionToMySqlPromise(`
            UPDATE products 
            SET product_name = '${product.product_name}', category_id = '${product.category_id}', price = '${product.price}', image = '${product.image}'
            WHERE product_name = ?`, [product.product_name]
        )
    },
    search: async function (searchVal) {
        return await connectionToMySqlPromise(`
        SELECT products.product_id, products.price, products.product_name, products.image, products.category_id, categories.category_name  
        FROM products 
        JOIN categories ON categories.category_id = products.category_id
        WHERE product_name LIKE '%${searchVal}%'
        `)
    },
    searchOnCart: async function (searchVal, cartId) {
        return await connectionToMySqlPromise(`
        SELECT products.product_name
        FROM products_of_cart
        JOIN products ON products.product_id = products_of_cart.product_id 
        WHERE products_of_cart.cart_id = ${cartId} AND products.product_name LIKE '%${searchVal}%'`
        )
    },
    allProductsCount: async function () {
        return await connectionToMySqlPromise('SELECT COUNT(*) FROM products')
    }
}


