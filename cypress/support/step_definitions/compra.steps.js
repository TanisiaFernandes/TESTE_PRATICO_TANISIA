import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

const homePage = new HomePage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

Given("que eu já possuo um produto adicionado ao carrinho", () => {
  homePage.acessar();
  homePage.adicionarProdutoCarrinho("Build your own computer");
  cartPage.acessar();
  cartPage.validarProdutoNoCarrinho("Build your own computer");
});

When("eu avançar para a tela de checkout", () => {
cartPage.irParaOCheckout();       // Executa a ação na tela do carrinho
  checkoutPage.acessarCheckout();   // Valida a entrada na tela de checkout
});

When("finalizar a minha compra", () => {
  checkoutPage.finalizarCompra();
});

Then("deve visualizar mensagem de sucesso", () => {
  checkoutPage.validarSucesso();
});