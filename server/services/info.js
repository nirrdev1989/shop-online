const { connectionToMySqlPromise } = require('../promiseDB')


module.exports = {
    getCities: async function () {
        return await connectionToMySqlPromise('SELECT * FROM cities')
    }
}