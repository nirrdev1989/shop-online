function setSessionInfo(request, user, cart) {
    return request.session.info = {
        name: user.name,
        lastname: user.lastname,
        isLog: true,
        isAdmin: !!user.role,
        userId: user.user_id,
        cartId: cart != undefined ? cart.cart_id : null,
        city: user.city ? user.city : null,
        street: user.street ? user.street : null
    }
}

module.exports = {
    setSessionInfo
}