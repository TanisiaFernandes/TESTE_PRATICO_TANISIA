class HomePage {
  acessar() {
    cy.visit("/");
  }

  adicionarProdutoCarrinho(nomeProduto) {
    cy.get(".home-page-product-grid")
      .contains("a", nomeProduto)
      .filter(":visible")
      .first()
      .click();

    cy.get("#product_attribute_16_3_6_18")
      .filter(":visible")
      .first()
      .check();
    
    cy.get("#add-to-cart-button-16")
      .filter(":visible")
      .first()
      .click();
}
}
export default HomePage;