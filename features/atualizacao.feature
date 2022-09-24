Feature: Atualização de dados do cadastro
As a fornecedor cadastrado
I want to atualizar os dados respectivos a minha loja
So that eu possa informar novas informações aos clientes e ao sistema

Scenario: Atualização válida do endereço de uma loja
Given um usuário que já tem sua loja "Heinz" cadastrada está na página "Atualizar Loja" 
And o usuário havia preenchido que o campo "Rua" de sua loja tem o valor "Avenida do Governador"
And o usuário havia preenchido que o campo "Número" de sua loja tem o valor "200"
And o usuário havia preenchido que o campo "Rua" de sua loja tem o valor "Esquina com a Rua Almirantes"
When o usuário clicar no botão "Salvar"
Then o usuário será direcionado para a página "Atualização bem sucedida"
And será exibida uma mensagem de informando que a atualização foi realizada com sucesso

Scenario: Atualização inválida do email de uma loja para um já existente no banco de dados
Given um usuário que já tem sua loja "Maria Móveis" cadastrada está na página "Atualizar Loja" 
And o usuário havia preenchido que o campo "email" de sua loja tem o valor "maria@gmail.com"
And o campo "email" da loja "Maria Eletrônicos" já está registrado no banco de dados com o valor "maria@gmail.com" 
When o usuário clicar no botão "Salvar"
Then o usuário permanecerá na página "Atualizar Loja"
And será exibida uma mensagem de erro por ter o valor "maria@gmail.com" associado ao campo "email" já cadastrado no sistema

Scenario: Falha na atualização de algum dado da loja por nenhum campo relativo à atualização ter sido preenchido
Given um usuário que já tem sua loja "Mariazinha Móveis" cadastrada está na página "Atualizar Loja" 
And o usuário não preencheu nenhum campo existente
When o usuário clicar no botão "Atualizar"
Then o usuário permanecerá na página "Atualizar Loja"
And será exibida uma mensagem de erro informando que não foi possível realizar nenhuma atualização pois nenhum novo valor foi preenchido