# Teste e2e Cypress

1. Inicializar o Projeto Node.js
mkdir cypress-project
cd cypress-project
npm init -y

2. Instalar o Cypress
npm install cypress

3. Cria os cenários de teste

4. Lista os scripts no package.json
web- roda no navegador
headless - roda no terminal

5. Configurar o Cypress
module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000', // Substitua pela URL do seu aplicativo
    supportFile: false,
    fixturesFolder: false
  }
};

6.  Instalar o NTL (listar os scripts do package.json)

7.  Executar os testes
npm run cypress:web ou headless  
