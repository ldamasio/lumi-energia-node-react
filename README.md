# lumi-energia-node-react
Este projeto extrai dados de faturas de energia elétrica em PDF, armazena esses dados no PostgreSQL, cria uma API para servir os dados e uma interface web em React para consumir essa API 

### Endereços para acessar

Frontend: https://lumi.leandrodamasio.com/

API: https://lumi-api-v1.leandrodamasio.com/

### Tecnologias utilizadas

Para a realização deste desafio, utilizamos as seguintes tecnologias e práticas:

- Typescript, Node.js (com Express), React e PostgreSQL.
- ORM Prisma para facilitar a interação com o banco de dados PostgreSQL e pela compatibilidade com Typescript.
- React e Typescript para criar o dashboard

### Parser

Para rodar o parser manualmente em ambiente de desenvolvimento, utilizar o seguinte comando:

```
node --loader ts-node/esm --require=suppress-experimental-warnings src/services/pdf.ts
```

### Testes

Os testes já são rodados toda vez que a pipeline de CI/CD for acionada, mas para rodá-los manualmente basta utilizar o seguinte comando:

```
npm test
```

Para escrever os testes, utilizamos a biblioteca Jest. Os testes foram escritos na medida em que o software foi desenvolvido utilizando-se das técnicas de TDD, ou seja, primeira escrevendo os testes para depois implementar as funcionalidades e, assim, refatorá-las com segurança.


### Características Técnicas

Versão do Node: 18

Utilizamos o ESNext por oferecer um conjunto de ferramentas e recursos que ajudam a criar aplicações JavaScript mais modernas, eficientes e robustas.

### Rotas

POST /faturas: Cria uma nova fatura. Recebe um objeto JSON no corpo da requisição contendo os dados da fatura, como empresa, cliente, valor, data de vencimento e detalhes do consumo de energia. Retorna a fatura criada.
GET /faturas: Retorna uma lista com todas as faturas cadastradas no sistema.
GET /faturas/:id: Busca uma fatura específica pelo seu ID. Retorna a fatura encontrada ou um erro 404 caso não exista.
PUT /faturas/:id: Atualiza os dados de uma fatura existente. Recebe um objeto JSON no corpo da requisição com as novas informações.
DELETE /faturas/:id: Exclui uma fatura específica pelo seu ID.