const { connectionToMySqlPromise } = require('../promiseDB')
const bcrypt = require('bcryptjs')



module.exports = {
    userInfo: function (user) {
        return {
            user_id: user.id,
            email: user.email,
            password: user.password,
            city: user.city,
            street: user.street,
            name: user.name,
            lastname: user.lastname,
            role: user.role
        }
    },
    checkUserExsit: async function (id, email) {
        return await connectionToMySqlPromise('SELECT * FROM users WHERE user_id = ? OR email = ?', [id, email])
    },
    userRegister: async function (user) {
        const newUser = this.userInfo(user)
        console.log(newUser)

        const hashPassword = await bcrypt.hash(newUser.password, 10)
        newUser.password = hashPassword

        return await connectionToMySqlPromise('INSERT  INTO users SET ?', newUser)
    },
    userLogIn: async function (email) {
        // const { email, password } = request.body
        const user = await connectionToMySqlPromise('SELECT * FROM users WHERE email = ?', [email])
        return user[0]
    },
}