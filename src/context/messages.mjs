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

export {
    messages
}
