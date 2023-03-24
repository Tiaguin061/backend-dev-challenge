# Goomer Lista Rango - Backend dev Challenge

## Sobre
Encontrei este repositório de desafio backend para ser feito em NodeJs, na qual o objetivo do projeto é criar uma API RESTful capaz de gerenciar os restaurantes e os produtos do seu cardápio. Então me senti capacitado a concluir o desafio.

## Funcionalidades do desafio
* [✔] O cadastro do restaurante precisa ter os seguintes campos:
  * Foto do restaurante
  * Nome do restaurante
  * Endereço do restaurante
  * Horários de funcionamento do restaurante (ex.: De Segunda à Sexta das 09h as 18h e de Sabado à Domingo das 11h as 20h).
<p/>

* [✔] O cadastro de produtos do restaurante precisa ter os seguintes campos:
  * Foto do produto
  * Nome do produto
  * Preço do produto
  * Categoria do produto (ex.: Doce, Salgados, Sucos...)
  * [✔] Quando o Produto for colocado em promoção, precisa ter os seguintes campos:
    * Descrição para a promoção do produto (ex.: Chopp pela metade do preço)
    * Preço promocional
    * Dias da semana e o horário em que o produto deve estar em promoção


## Tecnologias, padrões e metodologia utilizada
* **TDD(Test Driven Development)** - Foi usado para fazer os testes antes da funcionalidade nas camadas de serviços do projeto.

* **SOLID** - Foi seguido os prinicipios para melhor organização dos códigos do projeto.

* **Typescript** - Para tornar o Javascript mais poderoso e com tipagem.

* **NodeJs** - Para rodar o javascript no backend.

* **NestJs** - Framework para facilitar na construção das funcionalidades do aplicativo.

* **Prisma** - ORM para facilitar as query no banco de dados.

* **PostgreSQL** - Banco de dados relacional escolhido para ser utilizado.

* **Jest** - Para fazer os testes do projeto.

## Avaliação do projeto
O projeto é para criar funcionalidades simples e curtas, porém quis fazer seguindo **TDD** para aprimorar as minhas habilidades em Testes no NodeJs, tornando o projeto um pouco mais longo para concluir.

Apesar de ter sido feito em **NestJs**, o desafio pediu para ser feito utilizando NodeJs sem a utilização de frameworks, sugerindo a utilização do Express, porém queria juntamente com os testes, aprimorar as técnicas neste Framework, por isso decidi utiliza-lo. <br />

## Correções que podem ser feitas
O objetivo maior era concluir o projeto seguindo um bom padrão de software e isso foi feito em grande parte do aplicativo.

O que poderia ser mudado em versões futuras:

* Na camada de domínio - Deve ter a lógica e testes para cada entidade, como por exemplo: Na entidade de usuário, ter as validações de email e senha, para que ao utilizar esta entidade, não precise repetir as validações.
  * Isso resolveria as repetições das mesmas validações em determinados trecho de código em uma ou mais funcionalidade.
  * Isso melhoraria as validações de schemas que foram feitas no controller, tirando a responsabilidade da camada de Infra, de validar os dados que entram no service.


## Rodando o Projeto em localhost

```bash
$ npm install
or
$ yarn
```

* Copiar o arquivo **.env.example** e renomear para **.env** na raíz do projeto e definir os valores das variáveis ambiente.

* Ter instalado **docker** em sua máquina.
* Executar no **CMD** o seguinte comando, para que crie o container do docker:
  ```bash
  $ docker-compose up -d
  ```

* Executar no **CMD** o seguinte comando, para **rodar as migrations do prisma**:
  ```bash
  $ npx prisma migrate dev
  or
  yarn prisma migrate dev

* Para rodar o projeto em localhost, execute o seguinte comando no **CMD**: 
  ```bash
  # development
  $ npm run start
  or
  $ yarn start

  # watch mode
  $ npm run start:dev
  or
  $ yarn start:dev
  ```

## Rodando os testes do projeto

```bash
# unit tests
$ npm run test
or
$ yarn test

# test coverage
$ npm run test:cov
or
$ yarn test:cov
```