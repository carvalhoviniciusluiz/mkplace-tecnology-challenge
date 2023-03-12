<h1 align="center">
  ## mkplace-tecnology-challenge
</h1>

<blockquote align="center">“O amor é apenas uma reação química.”!</blockquote>

<p align="center">
  <img alt="challenge" src="https://img.shields.io/badge/challenge-%2304D361">

  <a href="https://github.com/carvalhoviniciusluiz">
    <img alt="Made by Vinicius Carvalho" src="https://img.shields.io/badge/made%20by-Vinicius%20Carvalho-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

<p align="center">
  <a href="#configs">Configurações</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#about">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#api">API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">Licença</a>
</p>

<p align="center">
  <a href="https://insomnia.rest/run/?label=mkplace-tecnology-challenge&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fcarvalhoviniciusluiz%2Fmkplace-tecnology-challenge%2Fmain%2F.insomnia%2FInsomnia_2023-03-10.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

Este projeto foi construido utilizando [**Clean Architecture**](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). Existem vários aspectos que podem ser melhorados no entanto ele consegue passar de modo satisfatório uma visão bem abrangente da arquitetura.

## Configurações <a name="configs"></a>

<details>
  <summary><b>Dotenv</b> (click to show)</summary>

O serviço depende do arquivo `.env` que pode ser criado a partir do existente `.env.sample` presente na raiz do projeto.

```bash
cp .env.sample .env
```
</details>

<details>
  <summary><b>Scripts</b> (click to show)</summary>

Somente os principais scripts estão documentados nessa sessão, para executalos faça:

```bash
npm run start:dev
```

**SCRIPTS**

| Nome               | Descrição                                           |
| ------------------ | --------------------------------------------------- |
| build:swc          | Compila o projeto usando a biblioteca SWC da Vercel |
| start:dev          | Sobe o serviço com hot-reload                       |
| start:bff-products | Sobe o serviço de cadastro de produtos              |
| start:bff-sellers  | Sobe o serviço de cadastro de vendedores            |
| test               | Roda os testes                                      |
</details>

<details>
  <summary><b>Docker :whale:</b> (click to show)</summary>

O Docker é um recurso importante neste projeto pôs é nele que subimos serviços auxiliares como banco de dados, você deve te-lo instalado no seu ambiente para poder usa-lo.

Na raiz do projeto existe um arquivo `docker-compose.yml` responsável pelos serviços de suporte responsáveis pelo bom funcionamento do programa, todas as variáveis ambientes estão presentes em `.env`.

```bash
# Subir os serviços e manter o term travado
docker-compose up

# Subir os serviços em segundo plano
# docker-compose up -d
```
</details>

## Sobre o projeto <a name="about"></a>

<details>
  <summary><b>O QUE VAMOS ENCONTRAR</b> (click to show)</summary>

- Padrões de Projeto
  - Clean Arch
  - Hexagonal Arch
  - Factory
  - Repository
  - Strategy
  - Dependency Inversion
  - Backend For Frontend (BFF)
  - Command and Query Responsibility Segregation (CQRS)
- Boa Práticas
  - SOLID
  - DDD
- Miscelânea
  - Nestjs
  - Express
  - Cache
  - Swagger
  - TypeORM
  - MikroORM
  - Docker
- Banco de Dados
  - Postgres
  - MongoDB
  - SQLite3
</details>

__IMPORTANTE__ 1: O projeto apresenta um arquivo de importação para as suas APIs de modo a facilitar os testes, como requisito é necessário possuir o programa insomnia instalado no ambiente. A importação das rotas para o insomnia é feito usando o botão roxo `Run In Insomnia` presente no topo da página.

__IMPORTANTE__ 2: O Suporte do docker contempla somente a parte de serviços necessários para o projeto funcionar isso por que se trata de configuração para desenvolvimento e não produção.

__IMPORTANTE__ 3: Existe dois recursos de BFF presentes para exemplificar o funcionamento de serviços em paralelo consimundo do mesmo `core`, `usecases` e `repositories`. Esses serviços funcionam independentes uns dos outros e alimentam a mesma base de dados bruta (relacional), no entanto, a API principal também alimenta uma base de dados de log (nosql) que é acessível a nível de BFF. Vale resaltar que a estratégia de log vem para da força a estratégia de cache nas concultas, os BFFs tem acesso aos mesmos dados só que vindos do banco de dados bruta.

### **Requisitos:**

- [NodeJs `>17.0.0`](https://nodejs.org/en/)

- [Docker Descktop](https://docs.docker.com/desktop/mac/install/)

- [Insomnia](https://insomnia.rest/download)

### **Instalação:**

No terminal faça:

```bash
npm install
```

### **Rodando o Projeto:** <a name="run"></a>

Suba os serviços auxiliares do projeto com docker:

```bash
docker-compose up
```

Execute os serviços principais do projeto:

```bash
npm run start:dev

# não é requisito rodar os BFFs
npm run start:bff-products
npm run start:bff-sellers
```

### **Tests:**

É necessário que o docker esteja levantado, no terminal faça:
```bash
npm test
```

### **API:** <a name="api"></a>

#### BFF: Sellers

- `#GET http://localhost:3331/sellers` - Consulta de vendedores, é possível utilizar um filtro `code` como parametro da consulta;
- `#POST http://localhost:3331/sellers` - Rota para cadastrar novos vendedores;

```json
{
  "seller": {
    "name": "anna"
  }
}
```

__OBS__: No caso do cadastro para `sellers` é possível informar o parametro `code` manualmente, entretanto, na ausencia o mesmo é criado automaticamente.

#### BFF: Products

- `#GET http://localhost:3332/products` - Consulta produtos, deve-se informar `price` intervalo separado por virgula (e.g 5.9,9.9), ou, `slug` referente a um produto cadastradol
- `#POST http://localhost:3332/products` - Rota para cadastrar novos produtos;

```json
{
  "product": {
    "brand": "Esporte Fino",
    "name": "Calça",
    "price": 59.9
  }
}
```

#### API Principal: Products

- `#GET http://localhost:3333/products` - Permite recuperar todos os produtos cadastrados.
- `#GET http://localhost:3333/products/:slug` - Permite recuperar um produto especifico pelo slug.
- `#POST http://localhost:3333/products` - Rota de cadastro para novos produtos.

```json
{
  "brand": "Moda Praia",
  "name": "Biquine",
  "price": 9.9
}
```

#### API Principal: Sale Products

- `#GET http://localhost:3333/sale-products` - Rota para consultar vendas, por ela é possível saber o vendedor e o produto de uma venda.

__IMPORTANTE__: Essa API possui a maior quantidade de filtros de consulta sendo possível intercalar um e outro para obter melhores resultados, segue exemplo com `query_string`

```bash
http://localhost:3333/sale-products?
  productName=Shirt&
  productPrice=50,60&
  productBrand=fine%20knit&
  productSlug=fine-knit_shirt&
  sellerCode=6443&
  sellerName=vini2
```

- `#POST http://localhost:3333/sale-products` - Rota para cadastrar uma venda, por ela deve informar o código do vendedor eo slug do produto.

```json
{
  "seller_code": 3768,
  "product_slug": "moda-praia_biquine"
}
```

## License <a name="license"></a>

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2023-present
