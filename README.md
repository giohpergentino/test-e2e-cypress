# Teste e2e Cypress

1. Inicializar o Projeto Node.js
```sh   
mkdir cypress-project
cd cypress-project
npm init -y
```

3. Instalar o Cypress
```sh
npm install cypress
```

5. Cria os cenários de teste

6. Lista os scripts no package.json
web- roda no navegador
headless - roda no terminal

7. Configurar o Cypress
```sh
module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000', // Substitua pela URL do seu aplicativo
    supportFile: false,
    fixturesFolder: false
  }
};
```

9.  Instalar o NTL (listar os scripts do package.json)

10.  Executar os testes
```sh
npm run cypress:web ou headless
```
