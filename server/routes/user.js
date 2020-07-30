const router = require('express').Router()
const userService = require('../services/user')
const cartService = require('../services/cart')
const bcrypt = require('bcryptjs')
const { setSessionInfo } = require('../session/session')
const { validateFileds } = require('../validate/validate-client-propers')


// auth user is log
router.get('/auth', (request, response, next) => {
    const { isLog, name, lastname, isAdmin, city, street } = request.session.info
    console.log(isLog, 'AUTH GET REQUEST')
    if (isLog) {
        return response.status(200).send({
            name: name,
            lastname: lastname,
            isLog: isLog,
            isAdmin: isAdmin,
            city: city,
            street: street
        })
    }
    response.status(403).send({
        message: 'Not Auth'
    })
})


//check user exsit
router.post('/chek_exist', async (request, response) => {
    const { id, email } = request.body

    try {
        const user = await userService.checkUserExsit(id, email)
        if (user.length > 0) {
            return response.status(403).send({
                message: 'User exsist'
            })
        }
        response.status(200).send()

    } catch (error) {
        response.status(500).send(error)
    }
})


// user register hash password , create cart for user
router.post('/register', async (request, response) => {
    const user = request.body
    // console.log(user)

    if (validateFileds(user)) return response.status(401).send({ message: 'Invalid info' })

    try {
        const newUser = await userService.userRegister(user)

        const cart = await cartService.createCart(user.id)

        response.status(200).send({ message: 'User register and cart created' })
    } catch (error) {
        response.status(500).send(error)
    }

})


// user log in get session
router.post('/login', async (request, response) => {
    const { email, password } = request.body
    console.log(request.body)

    try {
        const user = await userService.userLogIn(email, password)
        if (!user) {
            return response.status(403).send({ message: 'Wrong info ' })
        }

        // console.log(user)
        const checkPasswordIsMutch = await bcrypt.compare(password, user.password)
        if (!checkPasswordIsMutch) return response.status(403).send({ message: 'Wrong info' })

        if (!!user.role) {
            setSessionInfo(request, user)
            return response.status(200).send({
                message: 'Admin loged'
            })
        }

        const cart = await cartService.findUserCart(user.user_id)
        setSessionInfo(request, user, cart[0])

        response.status(200).send({
            message: 'User loged'
        })
    } catch (error) {
        response.status(500).send(error)
    }

})


// user log out
router.get('/logout', (request, response) => {
    request.session.destroy((error) => {
        if (error) {
            console.log(error)
            return response.status(500).send(error)
        }
    })
    response.status(200).send({
        message: 'User log out'
    })
})



module.exports = router