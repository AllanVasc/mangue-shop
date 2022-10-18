Feature: Despacho de pedidos
    As a fornecedor cadastrado
    I want to indicar o despacho dos meus pedidos 
    So that eu possa manter controle dos envios 

Scenario: Registro de despacho de pedido com sucesso
        Given eu estou logado com o usuário "HEINZ"
        And estou na aba "Despacho de Pedidos"
        And tenho pedido "ABC123" como "Despachar"
        When eu forneço o código de pedido "ABC123"
        And eu indico o pedido como "Despachado"
        Then eu continuo na aba "Despacho de Pedidos"
        And eu vejo uma mensagem de confirmação
        And o número de pedidos como "Despachar" é diminuído em 1

Scenario: Listagem dos pedidos Despachaveis
        Given eu estou logado com o usuário "HEINZ"
        And estou na aba "Despacho de Pedidos"
        And tenho pedido "ABC123" como "Despachar"
        And tenho pedido "JP115" como "Despachar"
        And tenho pedido "GS30" como "Despachar"
        When eu seleciono a opção de "Listar Pedidos Despachaveis"
        Then eu vejo uma lista contendo o pedido "ABC123"
        And eu vejo uma lista contendo o pedido "JP115"
        And eu vejo uma lista contendo o pedido "GS30" 

Scenario: Registro de despacho de pedido já enviado 
        Given eu estou logado com o usuário "HEINZ"
        And estou na aba "Despacho de Pedidos"
	And tenho o pedido "ABC123" como "em Trânsito"
	When eu forneço o código de pedido "ABC123"
        And eu indico o pedido como "Despachado"
	Then eu continuo na aba "Despacho de Pedidos"
	And eu vejo uma mensagem informando que "ABC123" é um código inválido 
	    
Scenario: Registro de despacho com código inválido 
        Given eu estou logado com o usuário "HEINZ"
        And estou na aba "Despacho de Pedidos"
	And não possuo o pedido com código "ABC123" 
	When eu forneço o código de pedido "ABC123"
        And eu indico o pedido como "Despachado"
	Then eu continuo na aba "Despacho de Pedidos"
	And eu vejo uma mensagem de erro informando que "ABC123" é inválido

