Feature: Atualização de dados do cadastro
    As a fornecedor cadastrado
    I want to atualizar os dados respectivos a minha loja
    So that eu possa informar novas informações aos clientes e ao sistema

Scenario: Atualização válida do endereço de uma loja
    Given um usuário que ja tem sua loja cadastrada está na página de atualizar conta 
    And o usuário havia preenchido que o campo "Rua" de sua loja tem o valor "Avenida do Governador"
    And o usuário havia preenchido que o campo "Número" de sua loja tem o valor "200"
    And o usuário havia preenchido que o campo "Rua" de sua loja tem o valor "Esquina com a Rua Almirantes"
    When o usuário clicar no botão "SALVAR"
    Then sera exibida uma mensagem de informando que a atualização foi realizada com sucesso

