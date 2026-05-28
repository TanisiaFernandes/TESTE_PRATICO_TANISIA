class LoginPage {
  acessar() {
    cy.visit("/login"); // ou a URL correspondente
  }

  preencherEmail(email) {
    cy.get("#Email").type(email);
  }

  preencherSenha(senha) {
    cy.get("#Password").type(senha);
  }

  clicarEntrar() {
    cy.get("input.login-button").click();
  }

  validarLoginSucesso() {
    cy.get(".account").should("be.visible");
  }

  validarMensagemErro() {
    cy.contains("Login was unsuccessful").should("be.visible");
  }
}

export default LoginPage;