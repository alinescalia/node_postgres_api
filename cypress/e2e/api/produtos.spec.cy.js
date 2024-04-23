/// <reference types="Cypress" />

describe('GET de todos os produtos', () => {
    it('GET/produtos', () => {
        cy.request('/produtos')
            .its('status')
            .should('equal', 200)

    })

})

describe('GET de produtos especificos', () => {
    it('GET/produto/id', () => {
        cy.request('/produtos/3')
            .its('status')
            .should('equal', 200)
    })
})