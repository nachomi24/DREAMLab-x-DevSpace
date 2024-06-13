//Para probar inicio de sesión módulo HU004
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('www.dreamlabspace.world')
    })

    it('matrícula correcta',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get(':nth-child(1) > input').type('A00833125');
        cy.get(':nth-child(2) > input').type('cristina123');
        cy.get('button').click()
        cy.wait(200)
        cy.get('.foto-perfil').should('be.visible') 
    })

    it('matrícula incorrecta',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get(':nth-child(1) > input').type('A00833122');
        cy.get(':nth-child(2) > input').type('cristina123');
        cy.get('button').click()
        cy.wait(200)
        cy.contains('Matrícula o contraseña incorrecta').should('be.visible');
    })

    it('campo vacío',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get('button').click();
            
    })
})