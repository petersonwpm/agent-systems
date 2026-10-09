import ollama from 'ollama'
import { log, dir } from './log.mjs'
import { messages } from './context/messages.mjs'
import { definitions, implementations } from './tools/index.mjs'

const { getOrder, getCustomer, cancelOrder } = implementations

//const MODEL = 'qwen2.5:3b-instruct'
const MODEL = 'deepseek-r1:8b'
while (true) {
    const response = await ollama.chat({
        model: MODEL,
        messages,
        think: false,
        tools: definitions.tools
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
