Feature: Esqueci a senha
    As um fornecedor que possui uma conta no aplicativo
    I want to modificar minha senha caso tenha esquecido
    So that eu possa fazer login no aplicativo com a nova senha

Scenario: envio de e-mail para redefinição de senha
    Given não estou logado com nenhum usuário
        And tem um usuário cadastrado com o e-mail "asv@cin.ufpe.br" e senha "EUAMOESS"
        And estou na página de "forgot-password"
    When o campo de e-mail é preenchido por "asv@cin.ufpe.br"
        And confirmo o envio
    Then aparece uma mensagem de confirmação do envio

Scenario: desisto de redefinir a senha
    Given não estou logado com nenhum usuário
        And estou na página de "forgot-password"
    When o campo de e-mail é preenchido por "asv@cin.ufpe.br"
        And decido voltar
    Then eu vou para a página de "login"

Scenario: falha no envio de e-mail para redefinição de senha
    Given não estou logado com nenhum usuário
        And estou na página de "forgot-password"
    When o campo de e-mail é preenchido por "Allan"
        And confirmo o envio
    Then eu consigo ver uma mensagem de erro 
        And eu continuo na página de "forgot-password"
        
Scenario: Redefinição de senha
    Given tem um usuário cadastrado com o e-mail "teste@cin.ufpe.br" e senha "testando123"
        And estou na página de "update-password" com email "teste@cin.ufpe.br"
    When eu coloco a senha "12345678" no campo de "psw1"
        And eu coloco a senha "12345678" no campo de "psw2"
        And eu confirmo a redefinição
    Then aparece uma mensagem de senha modificada com sucesso

Scenario: Falha na redefinição de senha por senha diferente
    Given tem um usuário cadastrado com o e-mail "teste2@cin.ufpe.br" e senha "EUAMOESS"
        And estou na página de "update-password" com email "teste2@cin.ufpe.br"
    When eu coloco a senha "12345678" no campo de "psw1"
        And eu coloco a senha "TOTALMENTE_DIFERENTE" no campo de "psw2"
        And eu confirmo a redefinição
    Then eu recebo uma notificação de erro 
        And eu permaneço na página de "update-password"

Scenario: Falha na redefinição de senha por formato invalido
    Given tem um usuário cadastrado com o e-mail "teste3@cin.ufpe.br" e senha "EUAMOESS"
        And estou na página de "update-password" com email "teste3@cin.ufpe.br"
    When eu coloco a senha "123" no campo de "psw1"
        And eu coloco a senha "123" no campo de "psw2"
        And eu confirmo a redefinição
    Then eu recebo uma notificação de erro 
        And eu permaneço na página de "update-password"