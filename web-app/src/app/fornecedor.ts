export class Fornecedor{
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
    confirmar_senha: string;
    tipo: string;
    despachar: Array<string>;
    num_despachar: number;

    constructor(){}
}