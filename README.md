# Mangue shop
Projeto de uma aplicação web que fornece uma plataforma de vendas para os fornecedores do ecommerce fictício "Mangue shop". Permitindo que os fornecedores se cadastrem, realizem login/logout, modifiquem a senha caso a mesma tenha sido esquecida, editem os dados de suas conta, vejam suas notificações de pedidos, gerenciem seus despachos e removam suas conta.

Este projeto foi desenvolvido com as tecnologias Angular JS e NodeJS, e faz parte da avaliação da disciplina IF682 - Engenharia de software e Sistemas no CIn-UFPE.

## Time de desenvolvimento
- Allan Soares Vasconcelos
- João Paulo de Albuquerque Rocha
- Júlio Cesar Farias da Luz
- Mácio Monteiro Meneses

## Como rodar o projeto

### Dependências

- Angular
- Node 
- npm

### Instalando dependências 
```
sudo apt install npm
sudo npm install -g @angular/cli
```

### Modificando a versão do Node
```
sudo npm install -g n
n 14.15
```

### Iniciando o projeto
```
cd web-app
sudo npm install
cd ..
cd server
sudo npm install
```
### Rodando o projeto
Iniciar o servidor
```
cd server
npm start
```
Iniciando o frontend
```
cd web-app
sudo npm install 
cd src
ng serve
```

### Buildar testes


```bash
cd test-acceptance
sudo npm install
npm run webdriver-update
```

### Rodando Testes
- Testes para o Server

```bash
cd server
npm test

```
- Testes de Interface

Recomendamos utilizar o navegador Firefox visto que versões mais recentes do Webdriver estão apresentando problemas com o Chrome.

```bash
cd server
node server.js

# Em outro terminal
cd web-app
npm start

# Em outro terminal
cd test-acceptance
npm run webdriver-start

# Em outro terminal
cd test-acceptance
npm test
```
