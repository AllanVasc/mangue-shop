import { Fornecedor } from './../src/fornecedor';
import { FornecedorService } from './../src/fornecedor.service';

describe("O serviço de clientes", () => {
  var originalTimeout: any;
  var fornecedorService: FornecedorService;
  var client: any;

  var new_fornecedor_pf = {
    "nome_razao":"Aristoteles",
    "CPF_CNPJ":"10341628911",
    "pais":"Brasil",
    "estado":"Pernambuco",
    "bairro":"Boa Viagem",
    "rua":"Rua 1",
    "numero":"1",
    "complemento":"Do lado da Rua 2",
    "nome_exibicao":"Aristoteles Loja",
    "imagem":"https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2011%2F08%2F17%2F10%2FWDL-Logo-5614_11252_040944897_1556549958.jpg",
    "descricao":"Os melhores eletrodomesticos da minha rua!",
    "email":"naosei@gmail.com",
    "senha":"12345678",
    "confirmar_senha": "12345678",
    "tipo":"PF",
    "despachar":"",
    "num_despachar":"",
}   

var new_fornecedor_pj = {
    "nome_razao":"Arquimedes",
    "CPF_CNPJ":"12341620900",
    "pais":"Estados Unidos",
    "estado":"Florida",
    "bairro":"Miami Beach",
    "rua":"Avenue 1",
    "numero":"1",
    "complemento":"Do lado da Avenue 2",
    "nome_exibicao":"Arquimedes Loja",
    "imagem":"https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2011%2F08%2F17%2F10%2FWDL-Logo-5614_11252_040944897_1556549958.jpg",
    "descricao":"Os melhores eletrodomesticos da minha rua!",
    "email":"arquimedes@gmail.com",
    "senha":"12345678",
    "confirmar_senha": "12345678",
    "tipo":"PJ",
    "despachar":"",
    "num_despachar":"",
}

  beforeAll(() => {
    process.stdout.write("clients-service: ");
  });
  beforeEach(() => {
    fornecedorService = new FornecedorService();

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  afterAll(() => {
    console.log('\n');
  });


  function create_fornecedor(fornecedor: any){
    var result = fornecedorService.add(fornecedor);
  }

  function delete_fornecedor(fornecedor: any) {
    var aux_id = fornecedorService.getByEmail(fornecedor['email'])['id'];
    fornecedorService.delete({email: fornecedor['email'], senha: fornecedor['senha'], id: aux_id});
  }

  it("FornecedorService inicialmente tem apenas um fornecedor", () => {
    expect(fornecedorService.get().length).toBe(1);
  });

  it("valida cadastro de fornecedores como pessoa fisica", () => {
    var val = fornecedorService.validateRegistrationPF(new_fornecedor_pf);
    var bool = false
    if(val['error']){
        bool = true;
    }
    expect(bool).toBe(false);
  });

  it("invalida cadastro de fornecedores como pessoa juridica com cnpj errado", () => {
    var val = fornecedorService.validateRegistrationPJ(new_fornecedor_pj);
    var bool = false
    if(val['error']){
        bool = true;
    }
    expect(bool).toBe(true);
  });


  it("cadastra clientes", () => {
    create_fornecedor(new_fornecedor_pf);
    var fornecedor_cadastrado = fornecedorService.getByEmail(new_fornecedor_pf['email']);


    expect(fornecedor_cadastrado['nome_razao']).toBe(new_fornecedor_pf['nome_razao']);
    expect(fornecedor_cadastrado['cpf_cnpj']).toBe(new_fornecedor_pf['cpf_cnpj']);
    expect(fornecedor_cadastrado['email']).toBe(new_fornecedor_pf['email']);
    expect(fornecedor_cadastrado['senha']).toBe(new_fornecedor_pf['senha']);

    delete_fornecedor(new_fornecedor_pf);
  });

  it("atualiza dados de cliente já cadastrado", () => {
    create_fornecedor(new_fornecedor_pf);
    
    new_fornecedor_pf['descricao'] = 'Lorem Ipsum, minha nova descricao, Lorem Ipsum';
    var new_id = fornecedorService.getByEmail(new_fornecedor_pf['email'])['id'];
    new_fornecedor_pf['id'] = new_id;

    var result = fornecedorService.update(new_fornecedor_pf);
    expect(result).toBe("Sucesso");

    delete_fornecedor(new_fornecedor_pf);
  });

  it("deleta um cliente cadastrado", () => {
    create_fornecedor(new_fornecedor_pf);
    
    var new_id = fornecedorService.getByEmail(new_fornecedor_pf['email'])['id'];
    new_fornecedor_pf['id'] = new_id;

    delete_fornecedor(new_fornecedor_pf);
    expect(fornecedorService.getByEmail(new_fornecedor_pf['email'])).toBe(undefined);
  });

})