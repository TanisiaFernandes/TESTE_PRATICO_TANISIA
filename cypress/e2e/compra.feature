# language: pt
Funcionalidade: Fluxo completo de compra

Cenário: CT01 - Realizar compra com sucesso
  Dado que eu já possuo um produto adicionado ao carrinho
  Quando eu avançar para a tela de checkout
  E finalizar a minha compra
  Então deve visualizar mensagem de sucesso