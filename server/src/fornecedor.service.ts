import { Fornecedor } from "./fornecedor";
import { DBService} from "./../database/database";

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

    getByEmail(fornecedorEmail: string) {
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
        if(fornecedor && fornecedor.password == password) return true;
        return false;
    }
}