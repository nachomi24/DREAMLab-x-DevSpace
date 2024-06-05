//Para probar visualizar secciones HU008
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('https://green-ground-02320f30f.5.azurestaticapps.net/')
    })

    it('probar que pueda visualizar las secciones',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(3) > .mina-bold-2').click()
        cy.get('.HeaderHU008-text > h1').should('be.visible')
        cy.get('.OSHU008').should('be.visible')
        cy.get('.GVHU008').should('be.visible')        
    })
})