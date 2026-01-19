/// <reference types="cypress" />
import  {  faker  }  from  '@faker-js/faker' ;



describe('Cadastro no Hub de Leitura', () => {

   beforeEach(()=>{
    cy.visit('register.html')

   })


    it('Deve realizar cadastro com sucesso: função JS ', () => {
        let email = `teste${Date.now()}@teste.com`

        cy.get('#name').type('Jaque Andrade')
        cy.get('#email').type(email)
        cy.get('#phone').type('000000000000')
        cy.get('#password').type('123456')
        cy.get('#confirm-password').type('123456')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        
        
    });
  
     it('Deve realizar cadastro com faker ', () => {
        let name = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.get('#phone').type('000000000000')
        cy.get('#password').type('123456')
        cy.get('#confirm-password').type('123456')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()

        //Resultado esperado
        cy.url().should('include','dashboard')
        cy.get('#user-name').should('contain',name )

        it('Não deve permitir cadastro com campos obrigatórios vazios', () => {
        cy.get('#register-btn').click()
        cy.contains('Campo obrigatório').should('be.visible')
          
         })

        
        
    });

     it('Não deve permitir cadastro com senhas diferentes', () => {
  cy.get('#name').type(faker.person.fullName())
  cy.get('#email').type(faker.internet.email())
  cy.get('#phone').type('11999999999')
  cy.get('#password').type('123456')
  cy.get('#confirm-password').type('654321')
  cy.get('#terms-agreement').check()
  cy.get('#register-btn').click()

  // Resultado esperado: mensagem de erro
  cy.contains('Senhas não coincidem').should('be.visible')
})

  it('Não deve permitir cadastro sem aceitar os termos', () => {
  cy.get('#name').type(faker.person.fullName())
  cy.get('#email').type(faker.internet.email())
  cy.get('#phone').type('11999999999')
  cy.get('#password').type('123456')
  cy.get('#confirm-password').type('123456')

  // Não marca o checkbox de termos
  cy.get('#register-btn').click()

  // Resultado esperado: bloqueio do cadastro
  cy.contains('Você deve aceitar os termos').should('be.visible')
})


});