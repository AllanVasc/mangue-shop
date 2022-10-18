import { Fornecedor } from './../src/fornecedor';
import { FornecedorService } from './../src/fornecedor.service';

describe("O serviço de clientes", () => {
  var originalTimeout: any;
  var fornecedorService: FornecedorService;

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
    "despachar":["ABC123","JP115","GS30","JP25"],
    "num_despachar":4,
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
    process.stdout.write("fornecedor-service tests: ");
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

  // Sempre antes de testes usar essas duas funções para manter a integridade do banco de dados
  function create_fornecedor(fornecedor: any){
    var result = fornecedorService.add(fornecedor);
  }

  function delete_fornecedor(fornecedor: any) {
    var aux_id = fornecedorService.getByEmail(fornecedor['email'])['id'];
    fornecedorService.delete({email: fornecedor['email'], senha: fornecedor['senha'], id: aux_id});
  }

//---------------------------------------------- JULIO ------------------------------------------------------------------------
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

//------------------------------------------------------ ALLAN ----------------------------------------------------------------
  it("Autenticação do login", () => {
    delete new_fornecedor_pf['id'];
    create_fornecedor(new_fornecedor_pf);

    var status = fornecedorService.authenticate(new_fornecedor_pf.email, new_fornecedor_pf.senha);
    expect(status).toBe(true);
    delete_fornecedor(new_fornecedor_pf);
  });

  // Internamente usa a sendEmail()
  it("Redefinição de senha: envio de email", async () => {
    create_fornecedor(new_fornecedor_pf);
    return fornecedorService.forgot_password(new_fornecedor_pf.email)
      .then(status => {
        expect(status).toBe(true);
        delete_fornecedor(new_fornecedor_pf);
    });
  });

  it("Atualiza somente a senha do fornecedor", () => {
    var backup_fornecedor = new_fornecedor_pf;
    create_fornecedor(new_fornecedor_pf);
    var pacote = {
      email: "",
      new_password: "",
    };

    pacote.email = new_fornecedor_pf.email;
    pacote.new_password = "updatesenha";

    var status = fornecedorService.update_password(pacote);
    expect(status).toBe(true);
    backup_fornecedor.senha = pacote.new_password;
    delete_fornecedor(backup_fornecedor);
  });

//--------------------------------------------------------JOAO PAULO---------------------------------------------------------------

it("verifica código de despacho válido e atualiza array", () => {
  new_fornecedor_pf.senha = new_fornecedor_pf.confirmar_senha;

  create_fornecedor(new_fornecedor_pf);
  var pacote = {
    email: "",
    codigo: "",
  };
  pacote.email = new_fornecedor_pf.email;
  pacote.codigo = "ABC123";

  var status = fornecedorService.despachar(pacote);
  expect(status).toBe(true);
  new_fornecedor_pf.despachar = ["ABC123","JP115","GS30","JP25"];
  new_fornecedor_pf.num_despachar = 4;
  delete_fornecedor(new_fornecedor_pf);
});

})