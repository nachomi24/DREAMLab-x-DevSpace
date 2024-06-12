//Para probar búsqueda de talleres HU006
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('www.dreamlabspace.world')
    })

    it('probar que pueda visualizar el icono de búsqueda',()=>{
        cy.get('.search-icon > .fa-solid').should('be.visible')        
    })

    it('probar que se despliegue la searchbar',()=>{
        cy.get('.search-icon > .fa-solid').click() 
        cy.get('#search').should('be.visible')
    })

    it('probar que se muestren los resultados de búsqueda',()=>{
        cy.get('.search-icon > .fa-solid').click() 
        cy.get('#search').should('be.visible')
        cy.get('#search').type('dat')
        cy.get('h2').contains('Dathaton').should('be.visible')
    })
})