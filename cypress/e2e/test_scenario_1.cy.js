describe("Website online shopping and checkout process", () => {
  beforeEach(() => {
    // visit the homepage
    cy.visit("https://magento.softwaretestingboard.com/");

    // navigate to the Hoodies & Sweatshirts section
    cy.get("header").should("be.visible");
    cy.get("#ui-id-5").trigger("mouseover");
    cy.get("#ui-id-17").trigger("mouseover");
    cy.get("#ui-id-20").click(); // navigate to Hoodies & Sweatshirts
  });

  describe("Product List", () => {
    it("should display 12 items per page and verify the item count", () => {
      cy.get(":nth-child(3) > .modes > .active").click();
      cy.get(".products.list.items.product-items > li").should(
        "have.length",
        12
      );
      cy.get(":nth-child(3) > #toolbar-amount").should(
        "contain.text",
        "1-12 of 13"
      );
    });

    it("should display 10 items per page and verify the item count", () => {
      cy.get(":nth-child(3) > .modes > #mode-list").click();
      cy.get(".products.list.items.product-items > li").should(
        "have.length",
        10
      );
      cy.get(":nth-child(3) > #toolbar-amount").should(
        "contain.text",
        "1-10 of 13"
      );
    });
  });

  describe("Selecting and Adding Product to Cart", () => {
    beforeEach(() => {
      // Navigate to the product details page and add the product to the cart
      cy.contains("Frankie Sweatshirt").should("be.visible").click();
      cy.get('div[option-label="L"]').click().should("have.class", "selected");
      cy.get('div[option-label="Yellow"]').click();
      cy.get("#qty").clear().type("7").should("have.value", "7");
      cy.get("#product-addtocart-button").click();
    });

    it("should display the correct product quantity in the cart", () => {
      cy.get(".showcart").should("contain.text", "7");
    });

    it("should open the cart and verify the added product details", () => {
      cy.get(".action.showcart").click();
      cy.get("#mini-cart > .item > :nth-child(1) > .product-item-details")
        .should("contain.text", "L")
        .and("contain.text", "Yellow");
    });
  });

  describe("Checkout Process", () => {
    beforeEach(() => {
      cy.get(".showcart").click(); // open the cart
      cy.get("#top-cart-btn-checkout").should("be.visible").click(); // proceed to checkout
    });

    it("should complete the shipping information form", () => {
      cy.get("#customer-email").type("josh@email.com", { force: true });
      cy.get('input[name="firstname"]')
        .type("Josh")
        .should("have.value", "Josh");
      cy.get('input[name="lastname"]')
        .type("Joshon")
        .should("have.value", "Joshon");
      cy.get('input[name="street[0]"]')
        .type("Street 16")
        .should("have.value", "Street 16");
      cy.get('input[name="city"]')
        .type("Colorado")
        .should("have.value", "Colorado");
      cy.get('select[name="region_id"]')
        .select("Hawaii")
        .should("have.value", "21");
      cy.get('input[name="postcode"]')
        .type("32134")
        .should("have.value", "32134");
      cy.get('select[name="country_id"]')
        .select("United States")
        .should("have.value", "US");
      cy.get('input[name="telephone"]')
        .type("4352094")
        .should("have.value", "4352094");
      cy.get('input[type="radio"][value="flatrate_flatrate"]').check();
      cy.get("#shipping-method-buttons-container > div > button")
        .should("be.visible")
        .and("contain", "Next")
        .click();
    });

    it("should complete the payment and review process", () => {
      cy.get("#billing-address-same-as-shipping-checkmo").check();
      cy.get("button.action.primary.checkout")
        .should("be.visible")
        .should("not.be.disabled")
        .click();
    });
  });
});
