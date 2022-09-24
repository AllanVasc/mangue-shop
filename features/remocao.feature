Feature: Remoção de loja do sistema
As a usuário cadastrado
I want to apagar minha conta e remover meus dados
So that eu possa encerrar meu negócio na plataforma

Scenario: Remoção de loja do sistema
Given usuário responsável da loja "Heinz" está logado no sistema com senha "123"
And o usuário está na página "Confirmação excluir conta"
When o usuário clica no botão "Excluir conta"
Then os dados do usuário são apagados do sistema
And o usuário é redirecionado para uma página de operação concluída com sucesso