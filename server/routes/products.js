const router = require('express').Router()
const productsService = require('../services/products')
const multer = require('multer')
const { authUser } = require('../auth/auth')
const { validateFileds } = require('../validate/validate-client-propers')

// store images
const storage = multer.diskStorage({
    destination: './server/images',
    filename: function (request, file, callBack) {
        callBack(null, Date.now() + '.' + file.originalname)
    }
})



// get categories
router.get('/categories', async (request, response) => {
    try {
        const categories = await productsService.getCategories()

        response.status(200).send(categories)
    } catch (error) {
        response.status(500).send(error)
    }
})


// get products of current category
router.get('/categories/:categoryname', async (request, response) => {
    const { categoryname } = request.params

    try {
        const category = await await productsService.getCategoryProducts(categoryname)
        if (category.length === 0) {
            return response.status(403).send({
                message: 'Category not found'
            })
        }

        response.status(200).send(category)

    } catch (error) {
        response.status(500).send(error)
    }
})


// search products
router.post('/search', authUser, async (request, response) => {
    let { searchVal } = request.body

    try {
        const search = await await productsService.search(searchVal)

        response.status(200).send(search)
    } catch (error) {
        response.status(500).send(error)
    }
})


// search products in user cart
router.post('/search/cart', authUser, async (request, response) => {
    let { searchVal } = request.body
    const { cartId } = request.session.info

    try {
        let productsOnCart = await productsService.searchOnCart(searchVal, cartId)

        response.send(productsOnCart)
    } catch (error) {
        response.status(500).send(error)
    }
})


// admin add product
router.post('/addproductadmin', authUser, multer({ storage: storage }).single('image'), async (request, response) => {
    const url = request.protocol + '://' + request.get('host')
    console.log(url)
    // const product = request.body
    console.log(request.body, 'ADMIN ADD PRODUCT')
    if (validateFileds(request.body)) return response.status(401).send({ message: 'Invalid info' })
    try {
        const product = productsService.productInfo(request, url)

        await productsService.addProduct(product)

        response.status(200).send({
            message: 'Product added to collection'
        })
    } catch (error) {
        response.status(500).send(error)
    }

})


// update product admin
router.put('/updateproductadmin', authUser, multer({ storage: storage }).single('image'), async (request, response) => {
    // console.log(request.file)
    let url = request.protocol + '://' + request.get('host')
    if (!request.file) { url = undefined }
    console.log(request.body, 'ADMIN UPDATE PRODUCT')

    if (validateFileds(request.body)) return response.status(401).send({ message: 'Invalid info' })

    try {
        const product = productsService.productInfo(request, url)

        const setProduct = await productsService.editProduct(product)
        if (setProduct.affectedRows === 0) {
            return response.status(403).send({
                message: 'Product to chnage not found'
            })
        }

        response.status(200).send({
            message: 'Product update'
        })
    } catch (error) {
        response.status(500).send(error)
    }
})


// get all products count
router.get('/all/count', async (request, response) => {
    try {
        const productsCount = await productsService.allProductsCount()
        // console.log(productsCount)
        response.send({ message: 'Products count', count: productsCount[0]['COUNT(*)'] })
    } catch (error) {
        response.status(500).send(error)
    }
})



module.exports = router