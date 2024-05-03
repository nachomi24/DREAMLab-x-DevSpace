//Para probar la visibilidad de los talleres
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:5173/')
    })

    it('probar que se puede ver el tab de talleres',()=>{
        cy.get('.contenedor-tarjetas').should('be.visible')
        cy.get(':nth-child(1) > :nth-child(1) > .tarjeta-img-inside').should('be.visible')
    })
})