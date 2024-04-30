//Para probar visualizar secciones HU008
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:5173/')
    })

    it('probar que pueda visualizar las secciones',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(3) > .mina-bold-2').click()
        cy.get('.Header-text > h1').should('be.visible')
        cy.get('.OS').should('be.visible')
        cy.get('.GV').should('be.visible')        
    })
})