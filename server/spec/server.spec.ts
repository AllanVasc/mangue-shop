require("jasmine");
const request = require("request-promise");

const url = "http://localhost:3000";

import { Fornecedor } from './../src/fornecedor';
import { FornecedorService } from './../src/fornecedor.service';


describe("O servidor", () => {
    var server: any;

    var fornecedor_julio = {"id":0,"nome_razao":"Julio","CPF_CNPJ":"00000000000","pais":"Brasil","estado":"Pernambuco","bairro":"Boa Viagem","rua":"Rua 1","numero":"1","complemento":"Do lado da Rua 2","nome_exibicao":"Julio Eletrodomesticos","imagem":"https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2011%2F08%2F17%2F10%2FWDL-Logo-5614_11252_040944897_1556549958.jpg","descricao":"Os melhores eletrodomesticos da minha rua!","email":"jcfl@cin.ufpe.br","senha":"12345678","tipo":"PF","despachar":["ABC123","JP115","GS30","JP25"],"num_despachar":4};

    var new_fornecedor = {
        "nome_razao":"Roberval",
        "CPF_CNPJ":"10345678911",
        "pais":"Brasil",
        "estado":"Pernambuco",
        "bairro":"Boa Viagem",
        "rua":"Rua 1",
        "numero":"1",
        "complemento":"Do lado da Rua 2",
        "nome_exibicao":"Julio Eletrodomesticos",
        "imagem":"https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2011%2F08%2F17%2F10%2FWDL-Logo-5614_11252_040944897_1556549958.jpg",
        "descricao":"Os melhores eletrodomesticos da minha rua!",
        "email":"seila@gmail.com",
        "senha":"12345678",
        "confirmar_senha": "12345678",
        "tipo":"PF",
        "despachar":"",
        "num_despachar":"",
    }

    beforeAll(() => {server = require('../server')});

    afterAll(() => {server.closeServer()});

    it("retorna um fornecedor em especifico pelo id", () => {
        return request.get(url + "/fornecedor/0")
            .then( (body: any) => {
                expect(body).toBe(JSON.stringify(fornecedor_julio))
            })
            .catch( (err: any) => {
                expect(err).toEqual(null)
            });
    });

    it("retorna um fornecedor em especifico pelo email", () => {
        var options = {
          method: 'GET', 
          uri: (url + `/fornecedor/email/${fornecedor_julio.email}`), 
          json: true
        };
      
        return request(options)
            .then( (body: any) => {
                expect(JSON.stringify(body)).toBe(JSON.stringify(fornecedor_julio))
            })
            .catch( (e:any) => expect(e).toEqual(null));
    });


    it("cadastra um novo cliente", () => {
        var options = {
            method: 'POST', 
            uri: (url + '/register'), 
            body: new_fornecedor, 
            json: true
        };
        return request(options)
            .then( (body:any) => {
            expect(body).toBe("Sucesso");
            })
            .catch( (e: any) => {
                expect(e).toEqual(null);
            });
    });

    
    it("atualiza um fornecedor que ja foi cadastrado", () => {
        const fornecedorService = new FornecedorService();

        var fornecedor_update = new_fornecedor;
        fornecedor_update['descricao'] = 'A melhor loja da rua 1 e da rua 2!';
        fornecedor_update['id'] = fornecedorService.getByEmail(new_fornecedor['email'])['id'];
        
        var options = {
            method: 'PUT',
            uri: (url + '/fornecedor'), 
            body: fornecedor_update, 
            json: true
        };
        request(options)
            .then( (body:any) => expect(body).toBe("Sucesso"))
            .catch( (e:any) => {
                expect(e).toEqual(null)
            });
    });

    it("deleta um fornecedor já cadastrado", () => {
        const fornecedorService = new FornecedorService();
        var forn = fornecedorService.getByEmail(new_fornecedor['email']);
        var new_fornecedor_id = forn['id'];

        var deleteObject = {email: new_fornecedor['email'], senha: new_fornecedor['senha'], id: new_fornecedor_id};


        var options = {
            method: 'DELETE', 
            uri: (url + `/fornecedor/${new_fornecedor_id}`), 
            body: deleteObject,
            json: true
        };
        return request(options)
        .then( (body: any) =>{
            expect(body).toBe("Sucesso");
        })
        .catch( (e: any) => {
            expect(e).toEqual(null);
        });
    });

    it("Autenticação do login", () => {
        var pacote = {
          email: "",
          password: "",
        };
        
        pacote.email = fornecedor_julio.email;
        pacote.password = fornecedor_julio.senha;
        
        var options = {
          method: 'POST',
          uri: (url + '/login'),
          body: pacote,
          json: true,
        };
        return request(options)
        .then( (body: any) => {
          expect(body.message).toBe("Authenticated!");
        })
        .catch( (error: any) => expect(error).toEqual(null));
    });

    it("Redefinição de senha: envio do email", () => {
        var options = {
          method: 'POST', 
          uri: (url + `/forgot_password/${fornecedor_julio.email}`), 
          json: true
        };

        return request(options)
          .then( (body: any) => {
            expect(JSON.stringify(body)).toBe(JSON.stringify({ message: "email enviado com sucesso" }));
          })
          .catch( (error: any) => expect(error).toEqual(null));
    });

    it("Redefinição de senha: update_password", () => {
        var pacote = {
          email: "",
          new_password: "",
        };
        
        pacote.email = fornecedor_julio.email;
        pacote.new_password = fornecedor_julio.senha;
        
        // http://localhost:4200/update-password?email=jcfl@cin.ufpe.br
        var options = {
          method: 'PUT', 
          uri: (url + `/update-password/?email=` + pacote.email),
          body: pacote, 
          json: true
        };
        
        return request(options)
          .then( (body: any) => {
            expect(JSON.stringify(body)).toBe(JSON.stringify({ message: "Senha modificada!" }));
          })
          .catch( (error: any) => expect(error).toEqual(null));
    });
})