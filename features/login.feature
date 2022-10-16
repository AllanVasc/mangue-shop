Feature: Login no aplicativo
    As a usuário do aplicativo 
    I want to entrar no aplicativo com meu e-mail e senha cadastrado
    So that eu tenha acesso às funcionalidades do sistema que são acessíveis somente depois do login

Scenario: Login realizado com sucesso
    Given não estou logado com nenhum usuário
        And existe um usuário cadastrado com o e-mail "asv@cin.ufpe.br" e senha "EUAMOESS"
        And estou na página de "login"
    When o campo de e-mail é preenchido por "asv@cin.ufpe.br"
        And o campo da senha é preenchido por "EUAMOESS"
        And tento entrar no sistema
    Then eu sou encaminhado para a página de dashboard

Scenario: Falha no login
    Given não estou logado com nenhum usuário
        And existe um usuário cadastrado com o e-mail "asv@cin.ufpe.br" e senha "EUAMOESS"
        And estou na página de "login"
    When o campo de e-mail é preenchido por "qualquercoisa"
        And o campo da senha é preenchido por "qualquercoisa2"
        And tento entrar no sistema
    Then eu recebo uma mensagem de erro 
        And eu continuo na página de login

Scenario: Falha no login com email em branco
    Given estou na página de "login"
    When o campo da senha é preenchido por "123456789"
    Then não consigo pressionar o botão de entrar
        And permaneço na página de login

Scenario: Falha no login com senha em branco
    Given estou na página de "login"
    When o campo de e-mail é preenchido por "jcfl@cin.ufpe.br"
    Then não consigo pressionar o botão de entrar
        And permaneço na página de login