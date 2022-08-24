Feature: Notificações no aplicativo
    As a usuário
    I want to ser notificado quando houver uma nova notificação
		And ver as notificações anteriores
    So that eu estarei atento ao fluxo de vendas da minha empresa

Scenario: Existe uma notificação não lida
    Given eu estou logado com o e-mail "mmmj@cin.ufpe.br" e senha "mmmj"
    When um cliente fizer uma nova compra
    Then o ícone de notificações terá um círculo vermelho

Scenario: Leitura das notificações não lidas
    Given eu estou logado com o e-mail "mmmj@cin.ufpe.br" e senha "mmmj"
    When eu clicar no ícone de notificações não lidas
    Then veremos a página de notificações
		And as novas notificações deverão conter um círculo vermelho

Scenario: As novas notificações foram lidas
    Given eu estou logado com o e-mail "mmmj@cin.ufpe.br" e senha "mmmj"
		And estou na página de notificações
    When eu clicar no botão de sair da página
    Then o ícone de notificações não terá um círculo vermelho
