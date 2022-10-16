Feature: Atualização de dados do cadastro
    As a fornecedor cadastrado
    I want to atualizar os dados respectivos a minha loja
    So that eu possa informar novas informações aos clientes e ao sistema

Scenario: Atualização válida do endereço de uma loja
    Given um usuário que ja tem sua loja cadastrada está na página de atualizar conta
    Given o usuário havia preenchido que o campo "rua" de sua loja tem o valor "Avenida do Governador"
    Given o usuário havia preenchido que o campo "numero" de sua loja tem o valor "200"
    Given o usuário havia preenchido que o campo "complemento" de sua loja tem o valor "Esquina com a Rua Almirantes"
    Given o usuario confirmou sua senha
    When o usuário clicar no botão salvar
    Then sera exibida uma mensagem informando que a atualização foi realizada com sucesso

Scenario: Atualização inválida do email de uma loja para um já existente no banco de dados
    Given um usuário que ja tem sua loja cadastrada está na página de atualizar conta
    Given o usuário havia preenchido que o campo email tem o valor "maria@gmail.com" que ja existe no banco de dados do servidor
    Given o usuario confirmou sua senha
    When o usuário clicar no botão salvar
    Then será exibida uma mensagem de erro informando que a atualizacao nao foi realizada no sistema
