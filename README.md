# 🧩 Eteg - Desafio Técnico Fullstack

Este projeto é a implementação de um sistema fullstack para cadastro de clientes, desenvolvido como parte do desafio técnico da vaga de **Desenvolvedor Fullstack** na Eteg. A aplicação foi totalmente containerizada com Docker para garantir um ambiente de desenvolvimento consistente e de fácil execução.

## 🛠️ Tecnologias Utilizadas

| Área          | Tecnologia                                                              |
| :------------ | :---------------------------------------------------------------------- |
| **Frontend** | React, Vite, TypeScript, Zod, React Hook Form, `cpf-cnpj-validator`      |
| **Backend** | NestJS, TypeScript, Prisma ORM, PostgreSQL, `nestjs-zod`                |
| **DevOps** | Docker, Docker Compose                                                  |

---

## 🧱 Estrutura do Projeto
O projeto foi estruturado como um monorepo para facilitar o desenvolvimento e a organização do código.

```
eteg-desafio-tecnico/
├── apps/
│   ├── backend/
│   └── frontend/
├── .dockerignore
├── .env
├── .eslintrc.cjs
├── .gitignore
├── docker-compose.yml
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.base.json
```

Cada aplicação (```backend``` e ```frontend```) possui seu próprio ```Dockerfile``` para a construção de imagens otimizadas e independentes.

## 🚀 Executando com Docker
Para executar o projeto completo em seu ambiente local, siga os passos abaixo.

### Pré-requisitos
- Docker e Docker Compose instalados.
- Git para clonar o repositório.

### Instalação e Execução
- Clone o repositório para a sua máquina:
```
git clone https://github.com/NathanMarques2001/eteg-desafio-tecnico.git
cd eteg-desafio-tecnico
```

- Crie o arquivo de variáveis de ambiente. Na raiz do projeto, crie um arquivo chamado .env e adicione o seguinte conteúdo:
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=registration_system
```

- Suba o ambiente completo com um único comando:
```
docker compose up --build
```
A flag --build é necessária apenas na primeira vez ou após alterações nos Dockerfiles ou package.json.

- A stack completa será levantada, e os serviços estarão disponíveis nos seguintes endereços:

> - Aplicação Frontend: http://localhost:5173
> - API Backend: http://localhost:3000
> - Banco de Dados (PostgreSQL): localhost:5432

## 🧾 Funcionalidades Implementadas
> Cadastro de Cliente com os seguintes campos:
- Nome completo.
- E-mail (com validação de formato).
- CPF (com validação completa de estrutura e dígitos verificadores).
- Cor favorita (seleção a partir de uma lista dinâmica vinda do backend).
- Observações.

> Máscara de Input para o campo de CPF no formulário, melhorando a experiência do usuário.

> Validação de Dados robusta com Zod, garantindo a integridade tanto no frontend quanto no backend.

> Feedback ao Usuário com mensagens de sucesso ou erro após a tentativa de cadastro.

> Banco de Dados Populado com as cores do arco-íris via script de seed na inicialização.

## 👨‍💻 Autor
> - Nathan Marques
> - LinkedIn: [Nathan Marques](https://www.linkedin.com/in/nathan-marques-1a7818244/)
> - Email: nathanbrandao1@gmail.com
