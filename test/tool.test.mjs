import test from 'node:test'
import assert from 'node:assert/strict'
import { messages } from '../src/context/messages.mjs'
import { definitions } from '../src/tools/index.mjs'
import ollama from 'ollama'


test('agent request getOrder', async () => {

    // definir a(s) ferramenta(s)
    const tools = definitions.tools
    // definir a mensagem
    messages.push({
        role: 'user',
        content: 'cancele o pedido 123'
    })

    const setup = {
        model: 'deepseek-r1:8b',
        messages,
        tools,
        think: false
    }

    // chamar o modelo
    const response = await ollama.chat(setup)
    // guardar a resposta
    const toolCalls = response.message.tool_calls ?? [];
    // validar se a ferramenta foi definida

    assert.ok(
        toolCalls.some(
            (call) => call.function.name === 'getOrder'
        ),
        `Esperava uma chamada a getOrder. Resposta: ${JSON.stringify(response.message)}`
    );
})
