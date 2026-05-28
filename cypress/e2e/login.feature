# language: pt
Funcionalidade: Realizar o login de usuário

Cenário: CT 01 - Realizar login com sucesso
  Dado que o usuário acessa a página de login
  Quando informar credenciais válidas
  E clicar no botão de login
  Então deve visualizar que está logado na página inicial

Cenário: CT 02 - Realizar o login com usuário inválido
  Dado que o usuário acessa a página de login
  Quando informar credenciais inválidas
  E clicar no botão de login
  Então deve visualizar mensagem de erro