import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../support/pages/LoginPage";

const loginPage = new LoginPage();

Given("que o usuário acessa a página de login", () => {
  loginPage.acessar();
});

When("informar credenciais válidas", () => {
  loginPage.preencherEmail("mnlm6s1k9m@bltiwd.com");
  loginPage.preencherSenha("123456");
});

When("informar credenciais inválidas", () => {
  loginPage.preencherEmail("teste@teste.com");
  loginPage.preencherSenha("errado");
});

When("clicar no botão de login", () => {
  loginPage.clicarEntrar();
});

Then("deve visualizar que está logado na página inicial", () => {
    loginPage.validarLoginSucesso(); 
});

Then("deve visualizar mensagem de erro", () => {
  loginPage.validarMensagemErro();
});