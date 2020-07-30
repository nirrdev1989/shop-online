
// AUTH USER LOG IN
function authUser(request, response, next) {
    console.log(request.session.info.isLog, 'AUTH USER FUNCTION')
    if (!request.session.info.isLog) {
        return response.status(403).send({
            message: 'Not Auth'
        })
    }
    next()
}

module.exports = {
    authUser
}