describe('Display list of employees', () => {
  it('when a user visits the page', () => {
    cy.visit('http://localhost:3000')
    cy.get('section[id="employee_list"]').should('contain', 'Employee')
  })
})