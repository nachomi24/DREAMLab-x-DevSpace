//Para probar la visibilidad de los detalles de un taller
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('https://green-ground-02320f30f.5.azurestaticapps.net/')
    })

    it('probar que se puede ver toda la información detallada de un taller',()=>{
        cy.get(':nth-child(2) > :nth-child(1) > .tarjeta-img-inside016').click()
        cy.get('.botoncito1016').should('be.visible')
        
    })
})