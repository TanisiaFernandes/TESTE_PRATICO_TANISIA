import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";

const homePage = new HomePage();
const cartPage = new CartPage();

Given("que o usuário está logado", () => {
  cy.login("mnlm6s1k9m@bltiwd.com", "123456");
});

When("acessar a página inicial", () => {
  homePage.acessar();
});

When("adicionar o produto {string} ao carrinho", (nomeProduto) => {
homePage.adicionarProdutoCarrinho(nomeProduto);
});

Then("o produto {string} deve ser exibido no carrinho", (nomeProduto) => {
  cartPage.acessar();
  cartPage.validarProdutoNoCarrinho(nomeProduto);
});
