Feature: Login no aplicativo
    As a usuário do aplicativo 
    I want to entrar no aplicativo com meu e-mail e senha cadastrado
    So that eu tenha acesso às funcionalidades do sistema que são acessíveis somente depois do login

Scenario: Login realizado com sucesso
    Given não estou logado com nenhum usuário
        And existe um usuário cadastrado com o e-mail "asv@cin.ufpe.br" e senha "asv"
        And estou na página de "Login"
    When o campo de e-mail é preenchido por "asv@cin.ufpe.br"
        And o campo da senha é preenchido por "asv"
    Then eu sou encaminhado para a página de "Dashboard"

Scenario: Falha no login
    Given não estou logado com nenhum usuário
        And existe um usuário cadastrado com o e-mail "asv@cin.ufpe.br" e senha "asv"
        And estou na página de "Login"
    When o campo de e-mail é preenchido por "qualquercoisa"
        And o campo da senha é preenchido por "qualquercoisa2"
    Then eu recebo uma mensagem de erro 
        And eu continuo na página de "Login" 