const express = require('express')
const session = require('express-session')
const cors = require('cors')
const path = require('path')
const expressValidator = require('express-validator')


const port = process.env.PORT || 4567

const server = express()

const userRoutes = require('./server/routes/user')
const productsRouter = require('./server/routes/products')
const cartRoutes = require('./server/routes/cart')
const infoRoutes = require('./server/routes/info')
const ordersRoutes = require('./server/routes/orders')


// uses
server.use('/images', express.static(path.resolve('./server/images')))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
// server.use(cors({
//     origin: ["http://localhost:4200"],
//     credentials: true,
// }))

server.use(express.static('dist/shop'))

server.use(session({
    secret: 'SECRET_KEY',
    saveUninitialized: false,
    resave: true
}))


// routes
server.use('/cart', cartRoutes)
server.use('/user', userRoutes)
server.use('/products', productsRouter)
server.use('/info', infoRoutes)
server.use('/orders', ordersRoutes)


server.get('/*', (request, response) => {
    response.sendFile(path.resolve('dist/shop/index.html'))
})



server.listen(port, () => console.log(`Server run on port: ${port}`))