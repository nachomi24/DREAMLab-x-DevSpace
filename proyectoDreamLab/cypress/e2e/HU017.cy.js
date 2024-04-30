//Para probar la visibilidad de los detalles de un taller
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:5173/')
    })

    it('probar que se puede ver toda la información detallada de un taller',()=>{
        cy.get(':nth-child(1) > .tarjeta-info').click()
        cy.get('.titulito-header').should('be.visible')
        cy.get('.modal-content-inside-body-content-ubi > p').should('be.visible')
        cy.get('.uniforma').should('be.visible')
        cy.get('.modal-content-inside-body-content-uf > :nth-child(2)').should('be.visible')
        cy.get('.modal-content-inside-body-content-fecha > :nth-child(1)').should('be.visible')
        cy.get('.horarie').should('be.visible')
        cy.get('.creadito').should('be.visible')
        cy.get('.cupito').should('be.visible')
    })
})