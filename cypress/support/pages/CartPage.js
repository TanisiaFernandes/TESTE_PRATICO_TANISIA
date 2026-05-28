class CartPage {
  acessar() {
    cy.get(".cart-label") 
      .first()           
      .click();
  }

  validarProdutoNoCarrinho(nomeProduto) {
    cy.contains(".product-name", nomeProduto)
      .should("be.visible");
  }

  irParaOCheckout() {
    cy.get("#termsofservice").check();
    cy.get("#checkout").click();
  }
}

export default CartPage;