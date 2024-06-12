//Inicio sesión de admin
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('www.dreamlabspace.world')
    })
 
    it('Iniciar sesión como admin',()=>{
        cy.get('.perfil-icono').click()
        cy.get('.perfil-dropdown-menu > .mina-bold-2').click()
        cy.get(':nth-child(1) > input').type('L00000040')
        cy.get(':nth-child(2) > input').type('LuiRi123')
        cy.get('form > button').click()
    })
})