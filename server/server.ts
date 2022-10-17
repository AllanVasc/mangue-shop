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
    if (result == "Sucesso") {
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

// Forgot Password
app.post('/forgot_password/:email', function (req, res){
  const email = req.params.email;
  try {
    fornecedorService.forgot_password(email).then((result) =>{
      if(result){
        res.status(201).send({ message: "email enviado com sucesso" });
      }
      else{
        res.status(200).send({ message: "Deu erro!"});
      }
    });
  }
  catch (err) {
    const { message } = err;
    res.status(400).send({ message });
  }
});

// Update only password
app.put('/update-password', function (req, res){
  const pacote = req.body;
  // console.log(pacote);
  try {
    const result = fornecedorService.update_password(pacote);
    if(result){
      res.status(201).send({ message: "Senha modificada!" });
    }
    else{
      res.status(200).send({ message: "Deu ruim!"});
    }
  }
  catch (err) {
    const { message } = err;
    res.status(400).send({ message });
  }
});

// Get Fornecedor pelo ID
app.get('/fornecedor/:id', function(req, res){
  const id = req.params.id;
  try{
    const fornecedor = fornecedorService.getById(id);
    if(fornecedor){
      res.status(200).send(fornecedor);
    } else {
      res.status(404).send({message: "Fornecedor nao encontrado"});
    }
  } catch (err) {
    const { message } = err;
    res.status(400).send({message})
  }
});

// Get Fornecedor pelo email
app.get('/fornecedor/email/:email', function(req, res){
  const email = req.params.email;
  // console.log(email);
  try{
    const fornecedor = fornecedorService.getByEmail(email);
    if(fornecedor){
      // console.log("encontrei o fornecedor")
      res.status(200).send(fornecedor);
    } else {
      res.status(404).send({message: "Fornecedor nao encontrado"});
    }
  } catch (err) {
    const { message } = err;
    res.status(400).send({message})
  }
});

app.delete('/fornecedor/:id', function(req, res){
  const id = req.params.id;
  const deleteObject = req.body;
  // console.log("meus parametros\n");
  // console.log(deleteObject);

  try{
    var result = fornecedorService.delete(deleteObject);
    if(result === "Sucesso"){
      res.status(200).send(result);
    } else {
      res.status(403).send(result);
    }
  } catch (err) {
    const { message } = err;
    res.status(400).send({message})
  }

});

// Update Fornecedor
app.put('/fornecedor', function(req, res){
  const id = req.params.id;
  const fornecedorAtt = req.body;
  try{
    var result = fornecedorService.update(fornecedorAtt)
    if( result === "Sucesso"){
      res.status(201).send(result)
    }
    else{
      res.status(403).send(result);
    }
  } catch (err){
    const { message } = err;
    res.status(400).send({message})
  }

});

/**handles http put requests from app regarding dispach of code */
app.put('/despachos', function(req, res){
  const pacote = req.body
  try{
    var result = fornecedorService.despachar(pacote);
    if(result){
      res.status(201).send(result)
    }
    else{
      res.status(403).send(result);
    }
  } catch (err){
    const { message } = err;
    res.status(400).send({message})
  }

});

var server = app.listen(3000, function () {
  console.log('Server listening on port 3000!');
  // console.log('All Database:\n');
  // console.log(fornecedorService.get());
})

function closeServer(): void {
  console.log('I hope to see you again! <3');
  server.close();
}

export { app, server, closeServer }