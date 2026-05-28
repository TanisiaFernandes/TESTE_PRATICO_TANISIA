class CheckoutPage {
  acessarCheckout() {
    cy.url().then((url) => {
      if (url.includes('checkoutasguest')) {
        cy.get('input[value="Checkout as Guest"]').click();
      }
    });
    cy.url().should('include', '/onepagecheckout');
  }

  finalizarCompra() {
    // Mapeamento das APIs reais do One Page Checkout (Opc)
    cy.intercept('POST', '**/checkout/OpcSaveBilling/').as('salvarCobranca');
    cy.intercept('POST', '**/checkout/OpcSaveShipping/').as('salvarEntrega');
    cy.intercept('POST', '**/checkout/OpcSavePaymentMethod/').as('salvarMetodoPagamento');
    cy.intercept('POST', '**/checkout/OpcSavePaymentInfo/').as('salvarInfoPagamento');
    cy.intercept('POST', '**/checkout/OpcConfirmOrder/').as('confirmarPedido');

    // ---- ETAPA 1: Endereço de Cobrança (Billing) ----
    cy.get('#checkout-step-billing', { timeout: 10000 }).should('be.visible');

    // Preenchimento obrigatório dos dados cadastrais (Igual ao Playwright)
    cy.get('#BillingNewAddress_FirstName').click().clear().type('Fulano');
    cy.get('#BillingNewAddress_LastName').click().clear().type('Beltrano');
    cy.get('#BillingNewAddress_Email').click().clear().type('teste@qa.com');

    // Preenchimento dos dados de endereço obrigatórios
    cy.get('#BillingNewAddress_CountryId').select('United States');
    cy.get('#BillingNewAddress_StateProvinceId').select('Florida'); 
    cy.get('#BillingNewAddress_City').clear().type('Miami');
    cy.get('#BillingNewAddress_Address1').clear().type('Av. Central, 123');
    cy.get('#BillingNewAddress_ZipPostalCode').clear().type('33101');
    cy.get('#BillingNewAddress_PhoneNumber').clear().type('123456789');

    // 1º Clique em Continue (Billing Address)
    cy.get("#billing-buttons-container .new-address-next-step-button").click();
    cy.wait('@salvarCobranca', { timeout: 12000 });
    
    // ---- ETAPA 2: Endereço de Entrega (Shipping Address) ----
    cy.get('#checkout-step-shipping', { timeout: 15000 }).should('be.visible');

    // Localiza e marca o "In-Store Pickup" (Retirada na Loja) pelo texto do label
    cy.contains('label', 'In-Store Pickup', { matchCase: false })
      .parent()
      .find('input[type="checkbox"]')
      .check({ force: true });

    // 2º Clique em Continue (Salvar Shipping Address com a retirada marcada)
    cy.get("#shipping-buttons-container .new-address-next-step-button").click();
    cy.wait('@salvarEntrega', { timeout: 12000 });

    // ---- ETAPA 3: Método de Envio (Shipping Method) ----
    // Esta etapa é ocultada automaticamente pelo site quando marcamos a Retirada na Loja.
    
    // ---- ETAPA 4: Método de Pagamento (Payment Method) ----
    cy.get("#checkout-step-payment-method", { timeout: 15000 }).should('be.visible');
    cy.get("#payment-method-buttons-container .payment-method-next-step-button").click();
    cy.wait('@salvarMetodoPagamento', { timeout: 10000 });
    
    // ---- ETAPA 5: Informações de Pagamento (Payment Info) ----
    cy.get("#checkout-step-payment-info", { timeout: 10000 }).should('be.visible');
    cy.get("#payment-info-buttons-container .payment-info-next-step-button").click();
    cy.wait('@salvarInfoPagamento', { timeout: 10000 });
    
    // Garante que a Etapa 5 processou antes de interagir com a Etapa 6
    cy.get("#payment-info-buttons-container .payment-info-next-step-button").should('not.be.visible');
    
    // ---- ETAPA 6: Confirmar Pedido Final (Confirm Order) ----
    cy.get("#checkout-step-confirm-order", { timeout: 12000 }).should('exist');
    
    // 🛠️ FIX: Força o clique para vencer a animação de display:none do contêiner pai
    cy.get("#confirm-order-buttons-container .confirm-order-next-step-button")
      .click({ force: true });
      
    cy.wait('@confirmarPedido', { timeout: 15000 });
  }

  validarSucesso() {
    cy.get(".title strong", { timeout: 15000 })
      .should("be.visible")
      .and("contain.text", "Your order has been successfully processed!");
  }
}

export default CheckoutPage;