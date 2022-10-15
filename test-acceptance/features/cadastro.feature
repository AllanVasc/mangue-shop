Feature: "Cadastro de fornecedores"
    As a fornecedor
    I want to cadastrar minha loja
    So that eu possa gerenciar meu negócio

Scenario: Cadastro válido de loja como pessoa física
    Given um usuário que ainda não se cadastrou está na página final de cadastro como PF
    Given o usuário preencheu o campo "cpf" como "12341234123"
    Given o usuário preencheu o campo "nome" como "Pedro da Silva Santos"
    Given o usuário preencheu o campo "pais" como "Brasil"
    Given o usuário preencheu o campo "estado" como "Pernambuco"
    Given o usuário preencheu o campo "bairro" como "Boa Viagem"
    Given o usuário preencheu o campo "rua" como "Rua Fulano de Tal"
    Given o usuário preencheu o campo "numero" como "123"
    Given o usuário preencheu o campo "complemento" como "Esquina com a Rua Sicrano de Tal"
    Given o usuário preencheu o campo "email" como "contato@heinz.com"
    Given o usuário preencheu o campo "nome_exibicao" como "Heinz"
    Given o usuário preencheu o campo descricao como "a melhor loja DO MUNDO, MEUS CAROS AMIGOS!"
    Given o usuário preencheu o campo "senha" como "senha123"
    Given o usuário preencheu o campo "confirmar_senha" como "senha123"
    When o usuário clicar no botão "CONTINUAR"
    Then o usuário será direcionado para uma página de cadastro realizado com sucesso

Scenario: Cadastro válido de loja como pessoa jurídica
    Given um usuário que ainda não se cadastrou está na página final de cadastro como PJ
    Given o usuário preencheu o campo "cnpj" como "77777770000000"
    Given o usuário preencheu o campo "razao_social" como "PEDRO PRODUTOS DE INFORMATICA SA"
    Given o usuário preencheu o campo "pais" como "Brasil"
    Given o usuário preencheu o campo "estado" como "Pernambuco"
    Given o usuário preencheu o campo "bairro" como "Boa Viagem"
    Given o usuário preencheu o campo "rua" como "Rua Fulano de Tal"
    Given o usuário preencheu o campo "numero" como "123"
    Given o usuário preencheu o campo "complemento" como "Esquina com a Rua Sicrano de Tal"
    Given o usuário preencheu o campo "email" como "contato@pedro.com"
    Given o usuário preencheu o campo "nome_exibicao" como "Pedro Produtos"
    Given o usuário preencheu o campo descricao como "a melhor loja DO MUNDO, MEUS CAROS AMIGOS!"
    Given o usuário preencheu o campo "senha" como "senha123"
    Given o usuário preencheu o campo "confirmar_senha" como "senha123"
    When o usuário clicar no botão "CONTINUAR"
    Then o usuário será direcionado para uma página de cadastro realizado com sucesso

Scenario: Cadastro de um cpf ja registrado no banco de dados 
    Given um usuário que ainda não se cadastrou está na página final de cadastro como PF
    Given o usuário preencheu o campo "cpf" como "00000000000"
    Given o usuário preencheu o campo "nome" como "Pedro da Silva Santos"
    Given o usuário preencheu o campo "pais" como "Brasil"
    Given o usuário preencheu o campo "estado" como "Pernambuco"
    Given o usuário preencheu o campo "bairro" como "Boa Viagem"
    Given o usuário preencheu o campo "rua" como "Rua Fulano de Tal"
    Given o usuário preencheu o campo "numero" como "123"
    Given o usuário preencheu o campo "complemento" como "Esquina com a Rua Sicrano de Tal"
    Given o usuário preencheu o campo "email" como "contato@heinz.com"
    Given o usuário preencheu o campo "nome_exibicao" como "Heinz"
    Given o usuário preencheu o campo descricao como "a melhor loja DO MUNDO, MEUS CAROS AMIGOS!"
    Given o usuário preencheu o campo "senha" como "senha123"
    Given o usuário preencheu o campo "confirmar_senha" como "senha123"
    When o usuário clicar no botão "CONTINUAR"
    Then o usuário nao será direcionado para uma página de cadastro realizado com sucesso