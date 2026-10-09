const toolsDefinition = {
    tools: [
        {
            type: "function",
            function: {
                name: "getOrder",
                description: "Obtem informações sobre um pedido",
                parameters: {
                    type: "object",

                    properties: {
                        orderId: {
                            type: "string",
                            description: "ID do pedido"
                        }
                    },

                    required: ["orderId"]
                }

            }
        },
        {
            type: "function",
            function: {
                name: "getCustomer",
                description: "Busca um cliente pelo ID. Use EXATAMENTE o customerId retornado por getOrder.",
                parameters: {
                    type: "object",

                    properties: {
                        customerId: {
                            type: "string",
                            description: "ID do cliente"
                        }
                    },

                    required: ["customerId"]
                }

            }
        },
        {
            type: "function",
            function: {
                name: "cancelOrder",
                description: "Busca um pedido pelo ID e efetua o cancelamento",
                parameters: {
                    type: "object",

                    properties: {
                        orderId: {
                            type: "string",
                            description: "ID do pedido"
                        }
                    },

                    required: ["orderId"]
                }

            }
        }
    ]
}

export default toolsDefinition
