//Para probar la visibilidad de los talleres
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('www.dreamlabspace.world')
    })

    it('probar que se puede ver el tab de talleres',()=>{
        cy.get('.contenedor-tarjetas016').should('be.visible')
        cy.get(':nth-child(2) > :nth-child(1) > .tarjeta-img-inside016').should('be.visible')
    })
})