import ollama from 'ollama'
import { log, dir } from './log.mjs'
import { getOrder, getCustomer, cancelOrder } from './tools.mjs';

//const MODEL = 'qwen2.5:3b-instruct'
const MODEL = 'deepseek-r1:8b'
const messages = [
    {
        role: 'system',
        content: `
            Você é um agente de pós-venda.

            Você não possui acesso direto aos dados dos pedidos.
            Para efetuar ações sobre pedidos, use obrigatoriamente as ferramentas disponíveis.

            Quando o usuário solicitar uma ação que possa ser realizada
            por uma ferramenta, não explique como o usuário poderia fazê - la.
            Execute a ferramenta apropriada.
        `
    },
    {
        role: 'user',
        content: 'cancele o pedido 123'
    }]

const tools = [
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

while (true) {

    const response = await ollama.chat({
        model: MODEL,
        messages,
        think: false,
        tools
    })
    messages.push(response.message)

    log('tool_calls')
    dir(response.message, { depth: null })
    log(JSON.stringify(response))

    if (!response.message.tool_calls?.length) {
        log(response.message.content)
        break
    }


    for (const call of response.message.tool_calls) {
        const content = execute(call)
        messages.push({
            role: 'tool',
            tool_name: call.function.name,
            content: JSON.stringify(content)
        })
    }
}

function execute(call) {
    switch (call.function.name) {
        case "getOrder": {
            return getOrder(call.function.arguments.orderId)
        }

        case "getCustomer": {
            return getCustomer(call.function.arguments.customerId)
        }

        case "cancelOrder": {
            return cancelOrder(call.function.arguments.orderId)
        }

        default:
            console.log(call.function.name)
            throw new Error("Tool não permitida")
    }
}
