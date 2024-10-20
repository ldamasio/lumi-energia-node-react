# lumi-energia-node-react
Este projeto extrai dados de faturas de energia elétrica em PDF, armazena esses dados no PostgreSQL, cria uma API para servir os dados e uma interface web em React para consumir essa API 

### Endereços para acessar

Frontend: https://lumi.leandrodamasio.com/

API: https://lumi-api-v1.leandrodamasio.com/

### Tecnologias utilizadas

Para a realização deste desafio, utilizamos as seguintes tecnologias e práticas:

- Typescript, Node.js (com Express), React e PostgreSQL.
- ORM Sequelize para facilitar a interação com o banco de dados PostgreSQL.
- React e Typescript para criar o dashboard

### Parser

Para rodar o parser manualmente em ambiente de desenvolvimento, utilizar o seguinte comando:

```
node --loader ts-node/esm --require=suppress-experimental-warnings src/services/pdf.ts
```

os campos: id, número do cliente, numero da istalação, vencimento, valor a pagar, mês de referência, energia eletrica - quantidade de kwh, energia eletrica - valor (R$), energia SCEE s/ ICMS - kwh, energia sceee sem icme - valor (R$), energia compensada - kwh, energia compensada - valor (R$), contribuicao iluminação pública municipal (cosip)

### Testes

Os testes já são rodados toda vez que a pipeline de CI/CD for acionada, mas para rodá-los manualmente basta utilizar o seguinte comando:

```
npm test
```

Para escrever os testes, utilizamos a biblioteca Jest. Os testes foram escritos na medida em que o software foi desenvolvido utilizando-se das técnicas de TDD, ou seja, primeira escrevendo os testes para depois implementar as funcionalidades e, assim, refatorá-las com segurança.


### Características Técnicas

Versão do Node: 18

o ESNext oferece um conjunto de ferramentas e recursos que podem ajudar você a criar aplicações JavaScript mais modernas, eficientes e robustas.

A utilização de CommonJS para configurar o Sequelize e criar migrações em um projeto ESNext é uma prática comum devido à compatibilidade com ferramentas existentes, à estabilidade do ecossistema CJS e à possibilidade de realizar uma migração gradual para ES Modules. Ao entender esses motivos, você poderá tomar decisões mais informadas sobre a arquitetura do seu projeto e escolher a abordagem mais adequada para cada parte do seu código.

# Documentação

# CI/CD



# Frontend

https://www.labs-lumi.com.br/#sobre-nos

