Feature: Remoção de loja do sistema
    As a usuário cadastrado
    I want to apagar minha conta e remover meus dados
    So that eu possa encerrar meu negócio na plataforma

Scenario: Remoção de loja do sistema com sucesso
    Given o fornecedor de email "contato@heinz.com", senha "senha123" e CPF "12345678999" esta logado no sistema
    Given o usuário está na página de confirmar a remoção da conta
    Given o usuário confirmou seu email como "contato@heinz.com" e sua senha como "senha123"
    When o usuário clica no botão excluir conta
    Then o usuário é redirecionado para a pagina inicial do sistema
    Then os dados do usuário são apagados do sistema

Scenario: Falha na remoção de loja do sistema por causa de credenciais invalidas inseridas 
    Given o fornecedor de email "contato@heinz.com", senha "senha123" e CPF "12345678999" esta logado no sistema
    Given o usuário está na página de confirmar a remoção da conta
    Given o usuário confirmou seu email como "seila@topmail.com" e sua senha como "abacate22"
    When o usuário clica no botão excluir conta
    Then uma mensagem de erro vai aparecer informando que houve um erro na validacao das credenciais do fornecedor
    Then o usuário permanecerá na mesma página de confirmar remoção de conta