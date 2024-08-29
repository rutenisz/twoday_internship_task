describe("Website online shopping and checkout process", () => {
  it("should navigate to womens pants selection", () => {
    cy.visit("https://magento.softwaretestingboard.com/");

    // assert that homepage contains expected elements
    cy.get("header").should("be.visible");
    cy.get("#ui-id-4").should("be.visible").and("contain.text", "Women");

    // using navigation menu, find women pants section
    cy.get("#ui-id-4").should("be.visible").trigger("mouseover");
    cy.get("#ui-id-10").should("be.visible").trigger("mouseover");
    cy.get("#ui-id-15").should("be.visible").click();

    // filter section to show the cheapest products available
    cy.get("#sorter").select("Price");

    cy.wait(5000);

    // select the cheapest pants and add them to the cart
    cy.get(
      "#maincontent > div.columns > div.column.main > div.products.wrapper.grid.products-grid > ol > li:nth-child(1) div"
    )
      .first()
      .scrollIntoView()
      .trigger("mouseover", { force: true })
      .within(() => {
        // select the size and color options
        cy.get("#option-label-size-143-item-172").click(); // Select size
        cy.get("#option-label-color-93-item-52").click(); // Select color

        // hover over the "Add to Cart" button to ensure it's visible
        cy.get('button[title="Add to Cart"]')
          .should("be.visible")
          .click({ force: true });
      });

    // check that product was added to the cart

    cy.get(".showcart").should("contain.text", "1");

    // add 2 more products to the cart. Check that cart icon is updated with each product

    // product 1
    cy.get(
      "#maincontent > div.columns > div.column.main > div.products.wrapper.grid.products-grid > ol > li:nth-child(2) > div"
    )
      .scrollIntoView()
      .trigger("mouseover", { force: true })
      .within(() => {
        // select the size and color options
        cy.get("#option-label-size-143-item-171").click(); // Select size
        cy.get("#option-label-color-93-item-58").click(); // Select color

        // hover over the "Add to Cart" button to ensure it's visible
        cy.get('button[title="Add to Cart"]')
          .should("be.visible")
          .click({ force: true });
      });

    // check that product 1 was added to the cart
    cy.get(".showcart").should("contain.text", "2");

    // product 2
    cy.get(
      "#maincontent > div.columns > div.column.main > div.products.wrapper.grid.products-grid > ol > li:nth-child(3) > div"
    )
      .scrollIntoView()
      .trigger("mouseover", { force: true })
      .within(() => {
        // select the size and color options
        cy.get("#option-label-size-143-item-171").click(); // Select size
        cy.get("#option-label-color-93-item-57").click(); // Select color

        // hover over the "Add to Cart" button to ensure it's visible
        cy.get('button[title="Add to Cart"]')
          .should("be.visible")
          .click({ force: true });
      });

    // check that product 2 was added to the cart
    cy.get(".showcart").should("contain.text", "3");

    // remove product from the cart
    //removing 1st product
    cy.get(".showcart").click();
    cy.get(
      "#mini-cart > li:nth-child(1) > div > div > div.product.actions > div.secondary > a"
    ).click();
    cy.get(
      "body > div.modals-wrapper > aside.modal-popup.confirm._show > div.modal-inner-wrap > footer > button.action-primary.action-accept"
    ).click();

    // verify that cart shows 2 products
    cy.get(".showcart").should("contain.text", "2");

    // proceed to checkout
    cy.get("#top-cart-btn-checkout")
      .should("be.visible")
      .and("contain.text", "Proceed to Checkout")
      .click();

    // add product to the cart from suggested products

    // complete the order
    // shipping info
    cy.get("#customer-email")
      .should("be.visible")
      .type("joana@email.com", { force: true });
    cy.get('input[name="firstname"]')
      .type("Joana")
      .should("have.value", "Joana");
    cy.get('input[name="lastname"]')
      .type("Joanson")
      .should("have.value", "Joanson");
    cy.get('input[name="street[0]"]')
      .type("Street 27")
      .should("have.value", "Street 27");
    cy.get('input[name="city"]')
      .type("Alabama")
      .should("have.value", "Alabama");
    cy.get('select[name="region_id"]')
      .select("Alabama")
      .should("have.value", "1");
    cy.get('input[name="postcode"]')
      .type("12345")
      .should("have.value", "12345");
    cy.get('select[name="country_id"]')
      .select("United States")
      .should("have.value", "US");
    cy.get('input[name="telephone"]')
      .type("786555")
      .should("have.value", "786555");
    cy.get('input[type="radio"][value="flatrate_flatrate"]').check();
    cy.get("#shipping-method-buttons-container > div > button")
      .should("be.visible")
      .and("contain", "Next")
      .click();

    // review & payments info
    cy.get("#billing-address-same-as-shipping-checkmo").check();
    cy.get("button.action.primary.checkout")
      .should("be.visible")
      .should("not.be.disabled")
      .click();
  });
});
