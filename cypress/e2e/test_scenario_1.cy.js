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

      // will get back to it

      // select “Frankie Sweatshirt” and open its details.

      cy.contains('Frankie Sweatshirt').click();

      // select size, colour and quantity.

      cy.get('#option-label-size-143-item-169').should('have.class', 'selected').click()
      


    });
  });
  