describe('Website online shopping and checkout process', () => {
    it('should navigate to the Hoodies & Sweatshirts section', () => {
      //  visit the page
      cy.visit('https://magento.softwaretestingboard.com/');
      
      // assert that homepage contains expected elements
      cy.get('header').should('be.visible');
      cy.get('#ui-id-5').should('be.visible').and('contain', 'Men');

     // using navigation menu, find mens Hoodies & Sweatshirts section.
      cy.get('#ui-id-5').should('be.visible').trigger('mouseover')
      cy.get('#ui-id-17').should('be.visible').trigger('mouseover')
      cy.get('#ui-id-20').should('be.visible').click()

      // check/assert that the displayed number of jackets matches the selected number of jackets displayed per page

      // 12 items displayed per page
      cy.get(':nth-child(3) > .modes > .active').click()
      cy.get('.products.list.items.product-items > li').should('have.length', 12);
      cy.get(':nth-child(3) > #toolbar-amount').should('contain.text', '1-12 of 13');
      
      // 10 items displayed per page
      cy.get(':nth-child(3) > .modes > #mode-list').click();
      cy.get('.products.list.items.product-items > li').should('have.length', 10);
      cy.get(':nth-child(3) > #toolbar-amount').should('contain.text', '1-10 of 13');

    
      // select “Frankie Sweatshirt” and open its details
      cy.contains('Frankie Sweatshirt').click();

      // select size, colour and quantity.

      cy.get('div[option-label=L').click().should('have.class', 'selected');
      cy.get('div[option-label="Yellow"]').click(); 
      cy.get('#qty').clear().type('7');

      // add product to cart and check that cart icon is updated with product quantity
      cy.get('#product-addtocart-button').click();
      cy.get('.showcart').should('contain', '7');

      // open cart and check if product matches the one you added to the cart
      cy.get('.action.showcart').click();
    //   cy.get('strong.product-item-name').should('contain', 'Frankie Sweatshirt');
      cy.get('#mini-cart > .item > :nth-child(1) > .product-item-details > .product-item-name > a').should('contain', 'Frankie Sweatshirt');
      cy.get('#mini-cart > .item > :nth-child(1) > .product-item-details').should('contain', 'L').and('contain', 'Yellow');

      // proceed to checkout
      cy.get('#top-cart-btn-checkout').should('be.visible').and('contain', 'Proceed to Checkout').click();

      // complete the order

      cy.get('#customer-email-fieldset > .required > .control > #customer-email').type('josh@memail.com')
      cy.get('#LBDFAIV').type('Josh');
      cy.get('#PGB66I2').type('Joshon');
      cy.get('#XC67WCW').type('Street 16');
      cy.get('#AXHVW9O').type('London');
      cy.get('#TE3OOL7').should('be.visible').trigger('mouseover');
      cy.get('#KIS3UEA').type('3213');
      cy.get('#WKTQ55S').should('be.visible').trigger('mouseover');
      cy.get('#NJ1OUD8').type('43i2094')
      // check how to select radio button

      // complete the order

    });
  });
  