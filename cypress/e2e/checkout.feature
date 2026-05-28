# language: pt
Funcionalidade: Validar a adição de um produto ao carrinho

Cenário: CT01 - Adicionar produto específico ao carrinho

Dado que o usuário está logado
Quando acessar a página inicial
    E adicionar o produto "Build your own computer" ao carrinho
Então o produto "Build your own computer" deve ser exibido no carrinho