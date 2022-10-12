import { Fornecedor } from "./fornecedor";
import { DBService} from "./../database/database";

const Joi = require('@hapi/joi');

export class FornecedorService{
    fornecedores: DBService;
    idCount: number;

    // Construtor da classe, carrega o DB
    constructor() {
        this.fornecedores = new DBService('fornecedores');
        this.idCount = 0;
    }

    add(fornecedor: Fornecedor): Fornecedor{

        var newFornecedor = new Fornecedor(fornecedor);
        
        if (this.isCPF_CPNJRegistered(newFornecedor.CPF_CNPJ) ) return null;
        if (this.isEmailRegistered(newFornecedor.email) ) return null;
    
        

        this.fornecedores.add(newFornecedor);
        return newFornecedor;


    }

    update(fornecedor: Fornecedor): Fornecedor {
        var data = this.fornecedores.getData().find(({ id }: any) => id == fornecedor.id);
        if (data){
            var index = this.fornecedores.getData().indexOf(data);
            this.fornecedores.update(index, fornecedor);
            return fornecedor;
        }
        return null;
    }

    get() : Fornecedor[] {
        return this.fornecedores.getData();
    }

    getById(fornecedorId: number) : Fornecedor {
        return this.fornecedores.getData().find(({ id }: any) => id == fornecedorId);
    }

    getByEmail(fornecedorEmail: string) : Fornecedor {
        return this.fornecedores.getData().find(({ email }: any) => email == fornecedorEmail);
    }

    isCPF_CPNJRegistered(cpf_cnpj: string): boolean {
        return this.fornecedores.getData().find( (f : Fornecedor) => f.CPF_CNPJ === cpf_cnpj) ? true : false;
    }

    isEmailRegistered(email: string): boolean {
        return this.fornecedores.getData().find( ( f : Fornecedor) => f.email == email) ? true : false;
    }
    
    // Autenticação para o Login
    authenticate(email: string, password: string): boolean {
        var fornecedor = this.getByEmail(email);
        if(fornecedor && fornecedor.senha == password){
            console.log("Authenticate: Sucess");
            return true;
        }
        return false;
    }

    /*    id: number;
    nome_razao: string;
    CPF_CNPJ: string;
    pais: string;
    estado: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento: string;
    nome_exibicao: string;
    imagem: string;
    descricao: string;
    email: string;
    senha: string;
    tipo: string;*/

    validateRegistrationPF(fornecedor: Fornecedor): any{
        const schema = Joi.object({
            nome_razao: Joi.string().alphanum().min(5).max(100).required(),
            CPF_CNPJ: Joi.string().pattern(new RegExp('^[0-9]{11}$')).required(),
            pais: Joi.string().alphanum().min(2).max(80).required(),
            estado: Joi.string().alphanum().min(2).max(80).required(),
            bairro: Joi.string().alphanum().min(2).max(80).required(),
            rua: Joi.string().alphanum().min(2).max(80).required(),
            numero: Joi.string().pattern(new RegExp('^[0-9]{1,7}$')),
            complemento: Joi.string().alphanum().max(80),
            nome_exibicao: Joi.string().alphanum().min(3).max(40).required(),
            descricao: Joi.string().alphanum().min(10).max(500).required(),
            email: Joi.string().email().required(),
            senha: Joi.string().min(8).max(100).required(),
            confirmarSenha: Joi.ref('senha'),
            tipo: Joi.string().pattern(new RegExp('^PF$'))
        });

        return schema.validate(fornecedor);
    }

    validateRegistrationPJ(fornecedor: Fornecedor): any{
        const schema = Joi.object({
            nome_razao: Joi.string().alphanum().min(5).max(100).required(),
            CPF_CNPJ: Joi.string().pattern(new RegExp('^[0-9]{14}$')).required(),
            pais: Joi.string().alphanum().min(2).max(80).required(),
            estado: Joi.string().alphanum().min(2).max(80).required(),
            bairro: Joi.string().alphanum().min(2).max(80).required(),
            rua: Joi.string().alphanum().min(2).max(80).required(),
            numero: Joi.string().pattern(new RegExp('^[0-9]{1,7}$')),
            complemento: Joi.string().alphanum().max(80),
            nome_exibicao: Joi.string().alphanum().min(3).max(40).required(),
            descricao: Joi.string().alphanum().min(10).max(500).required(),
            email: Joi.string().email().required(),
            senha: Joi.string().min(8).max(100).required(),
            confirmarSenha: Joi.ref('senha'),
            tipo: Joi.string().pattern(new RegExp('^PJ$'))
        });

        return schema.validate(fornecedor);
    }
}