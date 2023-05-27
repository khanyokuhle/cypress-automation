describe('Assessment Test Suite', () => {

  // Before each test launch url
  beforeEach(() => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
  })

  it('Test Case: Radio buttons', () => {
    
    // Get radio button 3 and check it
    cy.get(".radioButton").check("radio3")

    // Assert that radio button 1 and 2 are not selected
    cy.get("[value='radio1']").should("not.be.checked")
    cy.get("[value='radio2']").should("not.be.checked")

    // Get radio button 2 and check it
    cy.get(".radioButton").check("radio2")

    // Assert that radio button 1 and 2 are not selected
    cy.get("[value='radio1']").should("not.be.checked")
    cy.get("[value='radio3']").should("not.be.checked")

  })

  it('Test Case: Suggestions', () => {
    
    // Type South in the textbox 
    cy.get("#autocomplete").type("South")

    // Select South Africa from autocomplete list
    cy.get(".ui-menu-item-wrapper").contains("South Africa").then((option) => {
      option[0].click()
    })  
    
    // Clear the textbox and type Republic
    cy.get("#autocomplete").clear().type("Republic")

  })

  it('Test Case: Checkboxes', () => {

    // Check all checkboxes and verify that all of them are checked
    cy.get('[type="checkbox"]').check().should("be.checked")

    // Uncheck first checkbox and verify that it's not checked
    cy.get("#checkBoxOption1").uncheck().should("not.be.checked")

    //Verify that other 2 checkboxes are checked
    cy.get("#checkBoxOption2").should("be.checked")
    cy.get("#checkBoxOption3").should("be.checked")
  })

  it('Test Case: Show / hide', () => {

    // Click on hide button
    cy.get("#hide-textbox").click()

    // Verify textbox is hidden on the screen
    cy.get("#displayed-text").should("not.be.visible")

    // Click on show button
    cy.get("#show-textbox").click()

    // Verify that textbox is visible on the screen
    cy.get("#displayed-text").should("be.visible")
  })

  it('Test Case: Webtables', () => {

    cy.get(".tableFixHead").within(() => {
      // Get table body and loop through the rows
      cy.get("#product tbody tr").each(($row) => {
        cy.wrap($row).find("td").then(($cells) => {

          // Store cell data as variables
          const name = $cells.eq(0).text().trim()
          const position = $cells.eq(1).text().trim()
          const city = $cells.eq(2).text().trim()
          const amount = $cells.eq(3).text().trim()

          // Check if cell data is Joe Postman from Chennai and verfiy the amount
          if (name=="Joe" && position=="Postman" && city=="Chennai"){
            expect(amount).to.equal("46")
          }
        })        
      })
    })

    // Verify that amount is 296
    cy.get(".totalAmount").contains("296")
  })

  it('Test Case: iFrame', () => {

    // Verify that iFrame exists
    cy.get("#courses-iframe").should("exist")
  })
})