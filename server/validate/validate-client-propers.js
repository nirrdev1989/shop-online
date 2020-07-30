function validateFileds(object) {
    for (let key of Object.keys(object)) {
        if (object[key] === undefined) {
            console.log(object[key])
            return true
        }
        if (object[key] instanceof Object) {
            return validateFileds(object[key])
        }
    }
    return false
}


module.exports = {
    validateFileds
}