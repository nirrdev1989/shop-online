const mySql = require('mysql')

const connectMySql = mySql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'shopping_online'
})

// connectMySql.connect((error) => {
//     if (error) {
//         throw error
//     }
//     console.log('Database is connect')
// })

function connectionToMySqlPromise(sqlQurey, properties) {
    return new Promise((resolve, reject) => {
        connectMySql.query(sqlQurey, properties, (error, result) => {
            // console.log('ERROR', error)
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

module.exports = {
    connectionToMySqlPromise
}