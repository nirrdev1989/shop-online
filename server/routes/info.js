const router = require('express').Router()
const infoService = require('../services/info')

// get cities list
router.get('/cities', async (request, response) => {
    try {
        const cities = await infoService.getCities()
        response.status(200).send(cities)
    } catch (error) {
        response.status(500).send(error)
    }
})

module.exports = router