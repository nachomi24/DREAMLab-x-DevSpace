//Para probar inicio de sesión como profesor
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('https://green-ground-02320f30f.5.azurestaticapps.net/')
    })


    it('Ingresar nomina de profesor',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get(':nth-child(1) > input').type('L00000002');

    })

    it('Ingresar contraseña',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get(':nth-child(1) > input').type('L00000002');
        cy.get(':nth-child(2) > input').type('Rolando123');
    })

    it('Iniciar sesión',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get(':nth-child(1) > input').type('L00000003');
        cy.get(':nth-child(2) > input').type('Roberto123');
        cy.get('form > button').click()
        cy.wait(200)
        cy.get('.foto-perfil').should('be.visible') 
        cy.get('.contenedor-principal-tarjetas026').should('be.visible')
    })

   
})