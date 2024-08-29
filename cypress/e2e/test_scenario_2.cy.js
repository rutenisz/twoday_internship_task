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

    // select the cheapest pants and add them to the cart
    cy.get(
      "#maincontent > div.columns > div.column.main > div.products.wrapper.grid.products-grid > ol > li:nth-child(1) div"
    )
      .first()
      .scrollIntoView()
      .trigger("mouseover", { force: true })
      .within(() => {
        // Select the size and color options
        cy.get("#option-label-size-143-item-172").click(); // Select size
        cy.get("#option-label-color-93-item-52").click(); // Select color

        // Hover over the "Add to Cart" button to ensure it's visible
        cy.get('button[title="Add to Cart"]')
          .should("be.visible")
          .click({ force: true });
      });
  });
});
