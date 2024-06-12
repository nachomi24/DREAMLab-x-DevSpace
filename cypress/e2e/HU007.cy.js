
//Para probar búsqueda de salas HU007
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('www.dreamlabspace.world')
    })

    it('probar que pueda visualizar el icono de búsqueda en salas',()=>{
        cy.get('#salas').click()
        cy.get('.search-icon > .fa-solid').should('be.visible')        
    })

    it('probar que se despliegue la searchbar',()=>{
        cy.get('#salas').click()
        cy.get('.search-icon > .fa-solid').click() 
        cy.get('#search').should('be.visible')
    })

    it('probar que se muestren los resultados de búsqueda',()=>{
        cy.get('#salas').click()
        cy.get('.search-icon > .fa-solid').click() 
        cy.get('#search').should('be.visible')
        cy.get('#search').type('new')
        cy.get('h2').contains('New Horizons').should('be.visible')
    })
})