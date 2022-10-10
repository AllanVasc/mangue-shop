export class Fornecedor{
    id: number;
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
    tipo: string;

    constructor(fornecedor: Fornecedor){
        this.id = fornecedor.id;
        this.nome_razao = fornecedor.nome_razao;
        this.CPF_CNPJ = fornecedor.CPF_CNPJ;
        this.pais = fornecedor.pais;
        this.estado = fornecedor.estado;
        this.bairro = fornecedor.bairro;
        this.rua = fornecedor.rua;
        this.numero = fornecedor.numero;
        this.complemento = fornecedor.complemento;
        this.nome_exibicao = fornecedor.nome_exibicao;
        this.imagem = fornecedor.imagem;
        this.descricao = fornecedor.descricao;
        this.email = fornecedor.email;
        this.senha = fornecedor.senha;
        this.tipo = fornecedor.tipo;
    }

    update(fornecedor: Fornecedor): void{
        this.pais = fornecedor.pais;
        this.estado = fornecedor.estado;
        this.bairro = fornecedor.bairro;
        this.rua = fornecedor.rua;
        this.numero = fornecedor.numero;
        this.complemento = fornecedor.complemento;
        this.nome_exibicao = fornecedor.nome_exibicao;
        this.imagem = fornecedor.imagem;
        this.descricao = fornecedor.descricao;
        this.email = fornecedor.email;
        this.senha = fornecedor.senha;
        this.tipo = fornecedor.tipo;
    }
}