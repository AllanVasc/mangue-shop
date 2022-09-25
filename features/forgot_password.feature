Feature: Esqueci a senha
    As uma loja que possui uma conta no aplicativo
    I want to modificar minha senha caso tenha esquecido
    So that eu possa fazer login no aplicativo com a nova senha 

Scenario: envio de e-mail para modificar a senha
    Given eu possuo uma conta no aplicativo vinculada ao e-mail "asv@cin.ufpe.br"
        And estou na página de "Esqueci minha senha"
    When eu insiro o e-mail "asv@cin.ufpe.br" no campo de e-mail
        And confirmo o envio
    Then aparece uma mensagem de confirmação do envio
        And eu recebo um e-mail com os passos para redefinir a minha senha no e-mail "asv@cin.ufpe.br"

Scenario: falha no envio de e-mail para redefinição de senha
    Given eu estou na página de "Esqueci minha senha"
        And não coloco o e-mail no formato "string@string"
    When eu coloco o e-mail "allan" no campo de e-mail
        And confirmo o envio
    Then aparece uma mensagem de dados incorretos
        And continuo na página de "Esqueci minha senha"

Scenario: Redefinição de senha
    Given eu estou na página de "Redefinição de senha"
    When eu coloco a senha "asv" no campo de "inserir nova senha"
        And eu coloco a senha "asv" no campo de "repetir nova senha"
        And eu confirmo a redefinição
    Then aparece uma mensagem de senha modificada com sucesso

Scenario: Falha na redefinição de senha
    Given eu estou na página "Redefinição de senha"
    When eu coloco a senha "asv123" no campo de "inserir nova senha"
        And eu coloco a senha "asv123456" no campo de "repetir nova senha"
        And eu confirmo a redefinição
    Then aparece uma mensagem de erro na redefinição
        And continuo na página de "Redefinição de senha" 