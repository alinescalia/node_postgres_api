/// <reference types="Cypress" />

describe('GET de todos os produtos', () => {
    it('GET/produtos', () => {
        cy.request('http://127.0.0.1:5005/produtos')
            .its('status')
            .should('equal', 200)

    })

})

describe('GET de produtos especificos', () => {
    it('GET/produto/id', () => {
        cy.request('http://127.0.0.1:5005/produtos/3')
            .its('status')
            .should('equal', 200)
    })
})