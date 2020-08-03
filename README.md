# Navedex

## Tecnologias utilizadas
* Banco de dados PostgreSQL
* Query builder Knex
* ORM Bookshelf
* ESLint com o padrão AirBnB
* Express

## Informações
Consegui fazer todas os requisitos solicitados.

### Dificuldades
Nunca tinha usado o Knex nem o Bookshelf, então no começo tive um pouco de problemas, principalmente com o Bookshelf, pois tem uma documentação que algumas vezes não fica bem claro como executar determinada tarefa. Então provavelmente tinha maneiras bem mais eficientes de desenvolver algumas coisas que fiz.

Comecei implementando testes automatizados utilizando Jest, porém, o Bookshelf começou a dar alguns problemas na hora de rodar os testes, como não era um requisito deste teste da nave, acabei removendo essa implementação.

### Melhorias
Acabei não deixando os filtros mais eficientes, como desconsiderar maiúsculas ou minúsculas ou aceitar pegar só parte do nome.

Muitas partes do controller podem ser refatoradas, além de toda a parte de tratamento de erros.

## Como rodar

### Configuração do banco

Editar as informações do banco de dados em *config/.env.development* e editar PG_USER e PG_PASSWORD (usuário e senhas do banco de dados respectivamente), caso queira mudar o nome do banco, basta editar o PG_DATABASE_DEV. Por fim, criar tabela *navedex_development* (ou qualquer outro nome escolhido para o banco).

### Na pasta do projeto

Instalar dependências:
```
npm install
```

Rodar as migrations
```
npx knex migrate:latest
```

Rodar os seeds:
```
npx knex seed:run
```

### Testar com Insomnia

Link bara baixa o arquivo de teste do Insomnia: [Download](https://drive.google.com/file/d/1FisYbVGVrdfdIy2uTkfL78JJ8LYJgO98/view?usp=sharing)

No Insomnia estão todas as rotas incluindo os filtros. Carregando as seeds, é possível testar todas as rotas GET com os dados que jã estão alimentados no banco. Os dados que estão em Create tanto de Navers quanto de Projects também já estão prontos e corretos para serem testados. Todas as funcionalidades requisitadas estão funcionando.

## Referências
http://knexjs.org/
https://bookshelfjs.org/
https://expressjs.com/pt-br/
-e um pouquinho de Stack Overflow-