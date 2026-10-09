function getOrder(orderId) {
    return {
        id: orderId,
        customerId: 123,
        status: 'shipped',
        total: 850.00
    }
}

function getCustomer(customerId) {
    return {
        id: customerId,
        name: "João da Silva",
        email: "joao@gmail.com"
    }
}

function cancelOrder(orderId) {
    const order = getOrder(orderId)

    if (order.status === 'shipped') {
        return {
            success: false,
            reason: 'order_already_shipped'
        }
    }

    return {
        id: orderId,
        success: true,
        status: 'cancelled'
    }
}

export {
    getOrder,
    getCustomer,
    cancelOrder
}
