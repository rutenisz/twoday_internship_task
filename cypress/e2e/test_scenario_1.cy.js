describe('Website online shopping and checkout process', () => {
    it('should navigate to the Hoodies & Sweatshirts section', () => {
      //  visit the page
      cy.visit('https://magento.softwaretestingboard.com/');
      
      // assert that homepage contains expected elements
      cy.get('header').should('be.visible');
      cy.get('#ui-id-5').should('be.visible').and('contain.text', 'Men');

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
      cy.get('#qty').clear().type('7').should('have.value', '7');

      // add product to cart and check that cart icon is updated with product quantity
      cy.get('#product-addtocart-button').click();
      cy.get('.showcart').should('contain.text', '7');

      // open cart and check if product matches the one you added to the cart
      cy.get('.action.showcart').click();
    // need to solve frankie sweatshirt text error
    //   cy.get('strong.product-item-name').should('contain', 'Frankie Sweatshirt');
    //   cy.get('#mini-cart > .item  > :nth-child(1) > .product-item-details > .product-item-name > a').should('contain', 'Frankie Sweatshirt');
      cy.get('#mini-cart > .item > :nth-child(1) > .product-item-details').should('contain.text', 'L').and('contain.text', 'Yellow');

      // proceed to checkout
      cy.get('#top-cart-btn-checkout').should('be.visible').and('contain.text', 'Proceed to Checkout').click();

      // complete the order
      cy.get('#customer-email').should('be.visible').type('josh@email.com', { force: true });
      cy.get('input[name="firstname"]').type('Josh').should('have.value', 'Josh');
      cy.get('input[name="lastname"]').type('Joshon').should('have.value', 'Joshon');
      cy.get('input[name="street[0]"]').type('Street 16').should('have.value', 'Street 16');
      cy.get('input[name="city"]').type('London').should('have.value', 'London');
      cy.get('select[name="region_id"]').select('Hawaii').should('have.value', '21');
      cy.get('input[name="postcode"]').type('32134').should('have.value', '32134');;
      cy.get('select[name="country_id"]').select('United States').should('have.value', 'US');;
      cy.get('input[name="telephone"]').type('4352094').should('have.value', '4352094');
      cy.get('input[type="radio"][value="flatrate_flatrate"]').check();
      cy.get('#shipping-method-buttons-container > div > button').should('be.visible').and('contain', 'Next').click()
      cy.get('#billing-address-same-as-shipping-checkmo').check();
      cy.get('button.action.primary.checkout').should('be.visible').should('not.be.disabled').click();                     

    });
  });
  