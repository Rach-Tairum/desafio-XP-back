# Carteira Digital Back-End

### Bem-vindos a API da Carteira Digital! 

Esta API foi desenvolvida como back-end da aplicação front-end de Carteira Digital para o desafio prático da XP.

Essa aplicação é composta por um banco de dados instanciado na plataforma supabase em postgres, conexão com o banco realizada via ORM sequelize, montada em estrutura MSC (Models, Services, Crontrollers), com um middleware de erro captando todos os erros possíveis que a aplicação pode gerar, middlewares de validação de dados recebidos do front e validação JWT de usuário.

## Pré Concepções para realização da aplicação:

- Criação de uma tabela de usuários que contenha: id, nome, email, senha e saldo da pessoa usuária;
- Criação de uma tabela de ações que contenha todas as ações da corretora e q a tabela contenha as seguintes colunas: id, nome da empresa, quantidade de ações da empresa na corretora, valor unitário da ação;
- Criação de uma tabela de ligação entre usuários e ações (N usuários podem possuir N ações), que possui uma chave primária composta com o id do usuário, o id da ação da empresa que o usuário possui, a quantidade total que o usuário possui de ações daquela empresa e valor total dessas ações;
- Criação de uma rota de login com criação de token JWT;
- Validação do token para rotas mais sensíveis de compra/venda de ações e depósito/saque de valores da conta digital;
- Rota de criação do token;
- Rota de validação do Token;
- Rota para obtenção das ações da corretora para exibição;
- Rota para obtenção das ações pertencentes ao usuário;
- Rota para compra de ações com validação de token;
- Rota para venda de ações com validação de token;
- Rota para deposito em conta digital com validação de token;
- Rota para saque em conta digital com validação de token;
- Rota que busca os dados do usuário para implementação do Header da aplicação;

## Instruções de uso:

### Clone:

- Faça o clone da aplicação utilizando:
  - SSH: `git clone git@github.com:Rach-Tairum/desafio-XP-back.git`
  - HTTPS: `git clone https://github.com/Rach-Tairum/desafio-XP-back.git`
- Crie uma nova branch para fazer as alterações que podem ajudar a impulsionar essa API
- Faça a instalação das dependências (`npm install`)

### Inicialização:

- Para rodar localmente o projeto utilize o comando `npm start`
  - O projeto será aberto no link http://localhost:3000 caso essa porta já esteja em uso, gerará um erro de que a aplicação não pode ser inicializada por conta da porta utilizada. Para solução, vá até o arquivo index e troque na constante port o valor de 3000 para alguma outra porta livre da sua máquina. **Por favor não remova ou troque o process.env.PORT ele é necessário para que o deploy da aplicação funcione corretamente**
  
### Possíveis rotas:
 - `/login` : cria o token com 8h de duração
 - `/users/email?q=email-do-usuário` : busca usuários pelo email e tras alguns de seus dados
 - `/users/validate` : valida o token JWT e se estiver válido retorna OK
 - `/users/deposito` : faz depósito na conta do usuário
 - `/users/saque` : faz um saque na conta do usuário
 - `/acoes` : busca todas as ações da corretora
 - `/acoes/venda/id-da-empresa` : faz a venda de uma ação
 - `/acoes/compra/id-da-empresa` : faz a compra de uma ação
 - `/acoesUser/id-do-usuario` : busca todas as ações pertencentes àquele usuário
  
### Possíveis usuários para teste:
(nenhum destes usuários são reais, foram criados somente para demonstração das funcionalidades da aplicação)

- João:
  - email: `joão.xp@teste.com`
  - senha: `euEstiveAqui`

- Maria:
  - email: `maria.xp@teste.com`
  - senha: `euEstiveAquiTambem`

- Guilherme:
  - email: `guilherme.xp@teste.com`
  - senha: `euNaoEstiveAqui`
  
- Marcia:
  - email: `marcia.xp@teste.com`
  - senha: `professoraPort`
  
 ---

</br>

## Link do Deploy da Aplicação

https://back-api-desafio.herokuapp.com/

Sugestão de ferramentas clientes de API REST para visualização da aplicação: Insomnia ou Postman
