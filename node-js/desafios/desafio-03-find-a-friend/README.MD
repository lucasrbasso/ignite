### Desafio 
Desenvolver uma api utilizando conceitos de SOLID para uma plataforma de adoção de animais.

Link do desafio: https://efficient-sloth-d85.notion.site/Desafio-03-0b927eb32dbd4f21ab40224ffdf6cf19

Figma do desafio: https://www.figma.com/community/file/1220006040435238030

### Regras da aplicação:

[X] Deve ser possível se cadastrar como uma ORG
[X] Deve ser possível realizar login como uma ORG
[X] Deve ser possível cadastrar um pet
[X] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
[X] Deve ser possível filtrar pets por suas características
[X] Deve ser possível visualizar detalhes de um pet para adoção
[X] Autenticação com JWT

### Regras de negócio:

[X] Para listar os pets, obrigatoriamente precisamos informar a cidade
[X] Uma ORG precisa ter um endereço e um número de WhatsApp
[X] Um pet deve estar ligado a uma ORG
[X] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
[X] Todos os filtros, além da cidade, são opcionais
[X] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

### Adicionais:

[X] Testes unitários
[X] Testes E2E
[X] Integração com a AWS S3
