import { JsonPipe } from '@angular/common';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Fornecedor } from '../fornecedor';

declare function require(name:string);
const Joi = require('@hapi/joi');

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';
  // ID to know who is the user
  private id: number = JSON.parse(localStorage.getItem('id') || '-1');
  private isLoggedIn = new BehaviorSubject(
    JSON.parse(localStorage.getItem('loggedIn') || 'false')
  );
  private fornecedor: Fornecedor = new Fornecedor();
  isLoggedIn$ = this.isLoggedIn.asObservable();


  constructor(private http: Http, private router: Router) {}

  
  getId(){
    return JSON.parse(localStorage.getItem('id') || '-1');
  }

  getById(id: number): Promise<Fornecedor>{
    return this.http.get(this.taURL + '/fornecedor/' + String(id), {headers: this.headers})
    .toPromise()
    .then( (res) =>{
      if (res.status === 200){
        console.log(res.json().fornecedor)
        this.fornecedor = res.json().fornecedor;
        return res.json();
      } else{
        console.log("oi")
        return null;
      }
    })
    .catch(this.catch);
  }

  getByEmail(email: string): Promise<Fornecedor>{
    return this.http.get(this.taURL + '/fornecedor/email/' + String(email), {headers: this.headers})
    .toPromise()
    .then( (res) =>{
      if (res.status === 200){
        console.log(res.json().fornecedor)
        this.fornecedor = res.json().fornecedor;
        return res.json();
      } else{
        return null;
      }
    })
    .catch(this.catch);
  }

  getFornecedor(){
    var fornecedor = this.getById(this.getId());
    return fornecedor;
  }

  getIsLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn') || this.isLoggedIn.getValue());
  }

  setIsLoggedIn(new_value: boolean){
    this.isLoggedIn.next(new_value);
    localStorage.setItem('loggedIn', new_value.toString());
  }

  setId(id: string){
    localStorage.setItem('id', id);
  }

  create(fornecedor: Fornecedor): Promise<any> {
    return this.http.post(this.taURL + "/register",JSON.stringify(fornecedor), {headers: this.headers})
      .toPromise()
      .then(res => {
        if (res.status === 201) {
          this.router.navigate(['/finish-registration']);
          return "Sucesso";
        } 
        else {
          return res.text;
        };
      })
      .catch( res => {
        var message = JSON.parse(res['_body'])['message'];
        if(message) return message;
        else return "Houve um erro não esperado no seu cadastro"
      });
  }

  update(fornecedor: Fornecedor): Promise<any>{
    console.log("Vou mandar!!!!!!\n");
    var id = this.getId()
    return this.http.put(this.taURL + "/fornecedor",JSON.stringify(fornecedor), {headers: this.headers})
      .toPromise()
      .then(res => {
        console.log("THEN!!!!!!\n");
        console.log(res);
        if (res.status === 201) {
          return "Sucesso";
        } 
        else {
          return res.text;
        };
      })
      .catch( res => {
        console.log("CATCH!!!!!!\n");
        var message = JSON.parse(res['_body'])['message'];
        if(message) return message;
        else return "Houve um erro não esperado no seu cadastro"
      });
  }

  delete(deleteObject: any): Promise<any>{
    return this.http.delete(this.taURL + "/fornecedor/" + String(deleteObject['id']), new RequestOptions({headers: this.headers, body: JSON.stringify(deleteObject)}))
    .toPromise()
    .then( res => {
      if (res.status === 200){
        return "Sucesso";
      }
      else{
        return String(res['_body']);
      }
    })
    .catch( res => {
      var message = String(res['_body']);
      if(message) return message;
      else return "Houve um erro não esperado no seu cadastro"
    });
  }
  
  update_password(pacote: Object): Promise<any>{
    // console.log(pacote);
    return this.http.put(this.taURL + `/update-password`, JSON.stringify(pacote), {headers: this.headers})
      .toPromise()
      .then((res) => {
        if (res.status === 201){
          return true;
        }
        else return false;
      })
      .catch(this.catch);
  }

  validateRegistrationPF(fornecedor: Fornecedor): any{

    const schema = Joi.object({
        nome_razao: Joi.string().pattern(new RegExp('^[a-zA-Z \']{5,80}$')).required().messages({
          'string.base': `O campo "Nome" deve ser do tipo 'text'`,
          'string.empty': `O campo "Nome" não pode ser vazio`,
          'string.pattern.base': `O campo "Nome" pode ter somente caracteres sem acento do alfabeto e deve ter entre 5 e 80 caracteres`,
          'any.required': `O campo "Nome" é um campo obrigatório`
        }),
        CPF_CNPJ: Joi.string().pattern(new RegExp('^[0-9]{11}$')).required().messages({
          'string.base': `O campo "CPF" deve ser do tipo 'text'`,
          'string.empty': `O campo "CPF" não pode ser vazio`,
          'string.pattern.base': `O campo "CPF" deve ser composto somente por dígitos numéricos correspondentes a um CPF`,
          'any.required': `O campo "CPF" é um campo obrigatório`
        }),
        pais: Joi.string().pattern(new RegExp('^[a-zA-Z \']{2,80}$')).required().messages({
          'string.base': `O campo "País" deve ser do tipo 'text'`,
          'string.empty': `O campo "País" não pode ser vazio`,
          'string.pattern.base': `O campo "País" deve ser composto somente por caracteres sem acento do alfabeto e deve ter entre 2 e 80 caracteres`,
          'any.required': `O campo "País" é um campo obrigatório`
        }),
        estado: Joi.string().pattern(new RegExp('^[a-zA-Z \']{2,80}$')).required().messages({
          'string.base': `O campo "Estado" deve ser do tipo 'text'`,
          'string.empty': `O campo "Estado" não pode ser vazio`,
          'string.pattern.base': `O campo "Estado" deve ser composto somente por caracteres sem acento do alfabeto e deve ter entre 2 e 80 caracteres`,
          'any.required': `O campo "Estado" é um campo obrigatório`
        }),
        bairro: Joi.string().pattern(new RegExp('^[a-zA-Z \']{2,80}$')).required().messages({
          'string.base': `O campo "Bairro" deve ser do tipo 'text'`,
          'string.empty': `O campo "Bairro" não pode ser vazio`,
          'string.pattern.base': `O campo "Bairro" deve ser composto somente por caracteres sem acento do alfabeto e deve ter entre 2 e 80 caracteres`,
          'any.required': `O campo "Bairro" é um campo obrigatório`
        }),
        rua: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 \']{2,80}$')).required().messages({
          'string.base': `O campo "Rua" deve ser do tipo 'text'`,
          'string.empty': `O campo "Rua" não pode ser vazio`,
          'string.pattern.base': `O campo "Rua" deve ser composto somente por números e caracteres sem acento do alfabeto e deve ter entre 2 e 80 caracteres`,
          'any.required': `O campo "Rua" é um campo obrigatório`
        }),
        numero: Joi.string().pattern(new RegExp('^[0-9]{1,7}$')).allow(null, '').messages({
          'string.base': `O campo "Número" deve ser do tipo 'text'`,
          'string.pattern.base': `O campo "Número" deve ser composto somente por dígitos numéricos e deve ter entre 1 e 7 dígitos`
        }),
        complemento: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 \']{2,80}$')).allow(null, '').messages({
          'string.base': `O campo "Complemento" deve ser do tipo 'text'`,
          'string.pattern.base': `O campo "Complemento" deve ser composto somente por números e caracteres sem acento do alfabeto e deve ter entre 2 e 80 caracteres`
        }),
        nome_exibicao: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 \']{3,40}$')).required().messages({
          'string.base': `O campo "Nome Exibição" deve ser do tipo 'text'`,
          'string.empty': `O campo "Nome Exibição" não pode ser vazio`,
          'string.pattern.base': `O campo "Nome Exibição" deve ser composto somente por números e caracteres sem acento do alfabeto e deve ter entre 3 e 40 caracteres`,
          'any.required': `O campo "Nome Exibição" é um campo obrigatório`
        }),
        descricao: Joi.string().min(10).max(400).required().messages({
          'string.base': `O campo "Descrição" deve ser do tipo 'text'`,
          'string.min': `O campo "Descrição" deve ter pelo menos 10 caracteres`,
          'string.max': `O campo "Descrição" não pode ter mais do que 400 caracteres`,
          'any.required': `O campo "Descrição" é um campo obrigatório`
        }),
        imagem: Joi.string().allow(null, ''),
        id: Joi.number().allow(null, ''),
        email: Joi.string().pattern(new RegExp('^[a-zA-Z0-9\-\.+! \']{3,40}@[a-zA-Z0-9\-\.+!\\\n \']{3,40}.[a-zA-Z0-9\-\.+! \']{3,40}$')).required().messages({
          'string.base': `O campo "Email" deve ser do tipo 'text'`,
          'string.empty': `O campo "Email" não pode ser vazio`,
          'string.pattern.base': `O campo "Email" deve ter o formato de um email válido`,
          'any.required': `O campo "Email" é um campo obrigatório`
        }),
        senha: Joi.string().min(8).max(100).required().messages({
          'string.base': `O campo "Senha" deve ser do tipo 'text'`,
          'string.min': `O campo "Senha" deve ter pelo menos 8 caracteres`,
          'string.max': `O campo "Senha" não pode ter mais do que 100 caracteres`,
          'any.required': `O campo "Senha" é um campo obrigatório`
        }),
        confirmar_senha: Joi.any().equal(Joi.ref('senha')).required().messages({
          'string.base': `O campo "Confirmar senha" deve ser do tipo 'text'`,
          'any.only': `O campo "Confirmar senha" deve ter uma senha igual a do campo "Senha"`,
          'any.required': `O campo "Confirmar senha" é um campo obrigatório`
        }),
        despachar: Joi.allow(null, ''),
        num_despachar: Joi.allow(null, ''),
        tipo: Joi.string().pattern(new RegExp('^PF$')).required()
    });

    return schema.validate(fornecedor);
  }

  validateRegistrationPJ(fornecedor: any): any{

    const schema = Joi.object({
        nome_razao: Joi.string().pattern(new RegExp('^[a-zA-Z \']{5,80}$')).required().messages({
          'string.base': `O campo "Razão Social" deve ser do tipo 'text'`,
          'string.empty': `O campo "Razão Social" não pode ser vazio`,
          'string.pattern.base': `O campo "Razão Social" pode ter somente caracteres sem acento do alfabeto e deve ter entre 5 e 80 caracteres`,
          'any.required': `O campo "Razão Social" é um campo obrigatório`
        }),
        CPF_CNPJ: Joi.string().pattern(new RegExp('^[0-9]{14}$')).required().messages({
          'string.base': `O campo "CNPJ" deve ser do tipo 'text'`,
          'string.empty': `O campo "CNPJ" não pode ser vazio`,
          'string.pattern.base': `O campo "CNPJ" deve ser composto somente por dígitos numéricos correspondentes a um CNPJ`,
          'any.required': `O campo "CNPJ" é um campo obrigatório`
        }),
        pais: Joi.string().pattern(new RegExp('^[a-zA-Z \']{2,80}$')).required().messages({
          'string.base': `O campo "País" deve ser do tipo 'text'`,
          'string.empty': `O campo "País" não pode ser vazio`,
          'string.pattern.base': `O campo "País" deve ser composto somente por caracteres sem acento do alfabeto e deve ter entre 2 e 80 caracteres`,
          'any.required': `O campo "País" é um campo obrigatório`
        }),
        estado: Joi.string().pattern(new RegExp('^[a-zA-Z \']{2,80}$')).required().messages({
          'string.base': `O campo "Estado" deve ser do tipo 'text'`,
          'string.empty': `O campo "Estado" não pode ser vazio`,
          'string.pattern.base': `O campo "Estado" deve ser composto somente por caracteres sem acento do alfabeto e deve ter entre 2 e 80 caracteres`,
          'any.required': `O campo "Estado" é um campo obrigatório`
        }),
        bairro: Joi.string().pattern(new RegExp('^[a-zA-Z \']{2,80}$')).required().messages({
          'string.base': `O campo "Bairro" deve ser do tipo 'text'`,
          'string.empty': `O campo "Bairro" não pode ser vazio`,
          'string.pattern.base': `O campo "Bairro" deve ser composto somente por caracteres sem acento do alfabeto e deve ter entre 2 e 80 caracteres`,
          'any.required': `O campo "Bairro" é um campo obrigatório`
        }),
        rua: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 \']{2,80}$')).required().messages({
          'string.base': `O campo "Rua" deve ser do tipo 'text'`,
          'string.empty': `O campo "Rua" não pode ser vazio`,
          'string.pattern.base': `O campo "Rua" deve ser composto somente por números e caracteres sem acento do alfabeto e deve ter entre 2 e 80 caracteres`,
          'any.required': `O campo "Rua" é um campo obrigatório`
        }),
        numero: Joi.string().pattern(new RegExp('^[0-9]{1,7}$')).allow(null, '').messages({
          'string.base': `O campo "Número" deve ser do tipo 'text'`,
          'string.pattern.base': `O campo "Número" deve ser composto somente por dígitos numéricos e deve ter entre 1 e 7 dígitos`
        }),
        complemento: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 \']{2,80}$')).allow(null, '').messages({
          'string.base': `O campo "Complemento" deve ser do tipo 'text'`,
          'string.pattern.base': `O campo "Complemento" deve ser composto somente por números e caracteres sem acento do alfabeto e deve ter entre 2 e 80 caracteres`
        }),
        nome_exibicao: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 \']{3,40}$')).required().messages({
          'string.base': `O campo "Nome Exibição" deve ser do tipo 'text'`,
          'string.empty': `O campo "Nome Exibição" não pode ser vazio`,
          'string.pattern.base': `O campo "Nome Exibição" deve ser composto somente por números e caracteres sem acento do alfabeto e deve ter entre 3 e 40 caracteres`,
          'any.required': `O campo "Nome Exibição" é um campo obrigatório`
        }),
        descricao: Joi.string().min(10).max(400).required().messages({
          'string.base': `O campo "Descrição" deve ser do tipo 'text'`,
          'string.min': `O campo "Descrição" deve ter pelo menos 10 caracteres`,
          'string.max': `O campo "Descrição" não pode ter mais do que 400 caracteres`,
          'any.required': `O campo "Descrição" é um campo obrigatório`
        }),
        imagem: Joi.string().allow(null, ''),
        id: Joi.number().allow(null, ''),
        email: Joi.string().pattern(new RegExp('^[a-zA-Z0-9\-\.+! \']{3,40}@[a-zA-Z0-9\-\.+!\\\n \']{3,40}.[a-zA-Z0-9\-\.+! \']{3,40}$')).required().messages({
          'string.base': `O campo "Email" deve ser do tipo 'text'`,
          'string.empty': `O campo "Email" não pode ser vazio`,
          'string.pattern.base': `O campo "Email" deve ter o formato de um email válido`,
          'any.required': `O campo "Email" é um campo obrigatório`
        }),
        senha: Joi.string().min(8).max(100).required().messages({
          'string.base': `O campo "Senha" deve ser do tipo 'text'`,
          'string.min': `O campo "Senha" deve ter pelo menos 8 caracteres`,
          'string.max': `O campo "Senha" não pode ter mais do que 100 caracteres`,
          'any.required': `O campo "Senha" é um campo obrigatório`
        }),
        confirmar_senha: Joi.any().equal(Joi.ref('senha')).required().messages({
          'string.base': `O campo "Confirmar senha" deve ser do tipo 'text'`,
          'any.only': `O campo "Confirmar senha" deve ter uma senha igual a do campo "Senha"`,
          'any.required': `O campo "Confirmar senha" é um campo obrigatório`
        }),
        despachar: Joi.allow(null, ''),
        num_despachar: Joi.allow(null, ''),
        tipo: Joi.string().pattern(new RegExp('^PJ$')).required()
    });

    return schema.validate(fornecedor);
  }
  
  login(email: string, password: string): Promise<Fornecedor> {
    var body = { email: email, password: password };
    return this.http.post(this.taURL + "/login", JSON.stringify(body), {headers: this.headers})
      .toPromise()
      .then((res) => {
        if(res.status === 201) {
          this.setIsLoggedIn(true);
          this.setId(res.json().token);
          this.router.navigate(['/dashboard']);
          return true;
        }
        else return false;
      })
      .catch(this.catch);
  }

  logOut(){
    this.setId('-1');
    this.setIsLoggedIn(false);
    this.router.navigate(['/']);
  }

  forgot_password(email: string): Promise<Fornecedor>{
    return this.http.post(this.taURL + `/forgot_password/${email}`, {headers: this.headers})
      .toPromise()
      .then((res) => {
        if(res.status === 201) return true;
        else return null;
      })
      .catch(this.catch);
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}
