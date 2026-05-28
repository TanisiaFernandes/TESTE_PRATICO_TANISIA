Cypress.Commands.add("login", (email, senha) => {
  cy.visit("/login");

  cy.get("#Email").type(email);
  cy.get("#Password").type(senha);

  cy.get("input.login-button").click();
});

Cypress.Commands.add("addProdutoCarrinho", (nomeProduto) => {
  cy.visit("/");
  
  if (nomeProduto) {
    cy.contains(nomeProduto)
      .parents(".product-item")
      .find("input[value='Add to cart']")
      .click();
  } else {
    cy.get(".product-item input[value='Add to cart']").first().click();
  }
});