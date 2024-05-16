import assert from 'assert'
class RegisterForm {
  elements = {
    titleInput: () => cy.get('#title'),
    titleFeedback: () => cy.get('#titleFeedback'),
    imageUrlInput: () => cy.get('#imageUrl'),
    urlFeedback: () => cy.get('#urlFeedback'),
    submitBtn: () => cy.get('#btnSubmit'),
  }

  typeTitle(text) {
    if (!text) return;
    this.elements.titleInput().type(text)
  }

  typeUrl(url) {
    if (!url) return;
    this.elements.imageUrlInput().type(url)
  }
  clickSubmit() {
    this.elements.submitBtn().click()
  }
  hitEnter() {
    cy.focused().type('{enter}')
  }
}

const registerForm = new RegisterForm()
const colors = {
  error: 'rgb(25, 135, 84)',
  success: 'rgb(222, 226, 230)'
}
describe('Registro de Imagem', () => {

  describe('Enviando uma imagem com entradas inválidas', () => {
    const input = {
      title: '',
      url: '',
    }

    it('Dado que estou na página de registro de imagens', () => {
      cy.visit('/')
    })

    it(`Quando eu insiro "${input.title}" no campo de título`, () => {
      registerForm.typeTitle("teste" + input.title)
    })

    it(`Então eu insiro "${input.url}" no campo URL`, () => {
      registerForm.typeUrl("teste.png" + input.url)
    })

    it('Então clico no botão enviar', () => {
      registerForm.clickSubmit()
    })

    it('Então, devo ver a mensagem "Por favor, digite um título para a imagem" acima do campo de título', () => {
      registerForm.elements.titleFeedback().should('contain.text', 'Por favor digite um título para a imagem.')
    })

    it('E devo ver a mensagem "Digite um URL válido" acima do campo imageUrl', () => {
      registerForm.elements.urlFeedback().should('contain.text', 'Digite um URL válido')
    })

    it('E devo ver um ícone de exclamação nos campos de título e URL', () => {
      registerForm.elements.titleInput().should(([$input]) => {
        const styles = window.getComputedStyle($input);
        const border = styles.getPropertyValue('border-right-color')
        assert.strictEqual(border, colors.error)
      })
    })

  })

  describe('Atualizando a página após enviar uma imagem clicando no botão enviar', () => {
    const input = {
      title: 'Alien BRAZIL',
      url: 'https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg',
    }

    after(() => {
      cy.clearLocalStorage()
    })

    it('Dado que estou na página de registro de imagens', () => {
      cy.visit('/')
    })

    it(`Então enviei uma imagem clicando no botão enviar`, () => {
      registerForm.typeTitle(input.title)
      registerForm.typeUrl(input.url)
      registerForm.clickSubmit()
      cy.wait(100)
    })

    it(`Quando eu atualizo a página`, () => {
      cy.reload()
    })

    it('Então ainda devo ver a imagem enviada na lista de imagens cadastradas', () => {
      cy.getAllLocalStorage().should((ls) => {
        const currentLs = ls[window.location.origin]
        const elements = JSON.parse(Object.values(currentLs))
        const lastElement = elements[elements.length - 1]

        assert.deepStrictEqual(lastElement, {
          title: input.title,
          imageUrl: input.url,
        })
      })
    })

  })

})