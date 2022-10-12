import express = require('express');
import bodyParser = require("body-parser");

import { Fornecedor } from './src/fornecedor';
import { FornecedorService } from './src/fornecedor.service';

var app = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.json());

var fornecedorService: FornecedorService = new FornecedorService();

app.post('/register', async function(req: express.Request, res: express.Response){
  const fornecedor: Fornecedor = <Fornecedor> req.body;
  try {
    const result = fornecedorService.add(fornecedor);
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(403).send({ message: "Nao foi possivel adicionar o fornecedor"});
    }
  } catch (err) {
    const {message} = err;
    console.log(message)
    res.status(400).send({ message });
  }
});

// Autenticação do Login
app.post('/login', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = fornecedorService.authenticate(email, password);
    if (result) {
      const usuario = fornecedorService.getByEmail(email);
      // Send ID to set in LocalStorage
      // console.log("token = ");
      // console.log(usuario.id);
      res.status(201).send({ message: "Authenticated!", token: usuario.id});
    }
    else{
      res.status(403).send({ message: "Authentication error!"});
    }
  }
  catch (err) {
    const { message } = err;
    res.status(400).send({ message });
  }
});

var server = app.listen(3000, function () {
  console.log('Server listening on port 3000!');
  console.log('All Database:\n');
  console.log(fornecedorService.get());
})

function closeServer(): void {
  console.log('I hope to see you again! <3');
  server.close();
}

export { app, server, closeServer }