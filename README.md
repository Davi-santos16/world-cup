# World Cup

Monorepo full stack para gerenciamento e visualização de uma competição no formato Copa do Mundo. O projeto combina uma API REST em Express com Prisma/PostgreSQL e uma interface React/Vite para exibir classificação, partidas e um painel administrativo de resultados.

## Sumário

- [Visão geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Configuração rápida](#configuração-rápida)
- [Executando o projeto](#executando-o-projeto)
- [Scripts disponíveis](#scripts-disponíveis)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Banco de dados](#banco-de-dados)
- [API](#api)
- [Frontend](#frontend)
- [Fluxo de desenvolvimento](#fluxo-de-desenvolvimento)
- [Solução de problemas](#solução-de-problemas)

## Visão geral

O sistema permite acompanhar uma competição dividida por grupos, com partidas, placares e classificação calculada automaticamente a partir dos resultados cadastrados.

Principais recursos:

- Listagem de seleções nacionais por grupo.
- Tabela de classificação por grupo.
- Cálculo de pontos, vitórias, empates, derrotas, gols pró, gols contra e saldo de gols.
- Listagem de partidas por rodada ou de todas as rodadas.
- Cadastro de novas partidas pelo painel administrativo.
- Atualização de placares e marcação automática da partida como finalizada.
- Frontend público para consulta da competição.
- Rota `/admin` para gerenciamento de confrontos e resultados.
- Seed inicial com 16 seleções distribuídas entre os grupos A até H.

## Tecnologias

### Base do monorepo

- Node.js
- npm workspaces
- TypeScript
- concurrently

### API

- Express 5
- Prisma 7
- PostgreSQL
- pg
- tsx
- dotenv

### Web

- React 19
- React DOM
- Vite 6
- Tailwind CSS 4
- TypeScript

### Infra local

- Docker Compose
- PostgreSQL 16

## Estrutura do projeto

```text
.
├── apps
│   ├── api
│   │   ├── prisma
│   │   │   ├── migrations
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   └── src
│   │       ├── controller
│   │       ├── database
│   │       ├── middleware
│   │       ├── routes
│   │       ├── utils
│   │       ├── app.ts
│   │       └── server.ts
│   └── web
│       ├── public
│       └── src
│           ├── components
│           ├── hooks
│           ├── api.ts
│           ├── App.tsx
│           ├── main.tsx
│           ├── styles.css
│           └── types.ts
├── docker-compose.yml
├── package.json
├── package-lock.json
├── .env.example
└── README.md
```

### `apps/api`

Aplicação backend responsável por expor os dados da competição, persistir seleções e partidas no PostgreSQL e calcular a classificação dos grupos.

### `apps/web`

Aplicação frontend responsável pela experiência pública e administrativa. Em desenvolvimento, o Vite encaminha chamadas feitas para `/api` até a API local.

## Pré-requisitos

Instale antes de começar:

- Node.js em versão compatível com TypeScript, Vite e Prisma usados no projeto.
- npm.
- Docker e Docker Compose.

Para conferir se tudo está disponível:

```bash
node -v
npm -v
docker --version
docker compose version
```

## Configuração rápida

Na raiz do projeto:

```bash
cp .env.example .env
docker compose up -d
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Depois acesse:

- Frontend público: <http://localhost:5173>
- Painel administrativo: <http://localhost:5173/admin>
- API: <http://localhost:3333>
- Prisma Studio: execute `npm run db:studio`

## Executando o projeto

### 1. Configurar variáveis de ambiente

Copie o exemplo de ambiente:

```bash
cp .env.example .env
```

O arquivo `.env` deve ficar na raiz do monorepo, pois o script da API carrega `../../.env`.

### 2. Subir o PostgreSQL

```bash
docker compose up -d
```

O `docker-compose.yml` cria um serviço PostgreSQL com:

- Usuário: `postgres`
- Senha: `postgres`
- Banco: `world-cup`
- Porta local: `5432`

### 3. Instalar dependências

```bash
npm install
```

Como o projeto usa npm workspaces, esse comando instala as dependências da raiz, da API e do frontend.

### 4. Aplicar migrations

```bash
npm run db:migrate
```

Esse comando executa o Prisma Migrate no workspace `@world-cup/api`.

### 5. Popular dados iniciais

```bash
npm run db:seed
```

O seed remove partidas e seleções antigas, cadastra as seleções iniciais e cria as partidas da fase de grupos.

### 6. Rodar API e frontend juntos

```bash
npm run dev
```

Esse comando inicia:

- API em `http://localhost:3333`
- Web em `http://localhost:5173`

## Scripts disponíveis

Todos os comandos abaixo devem ser executados na raiz do projeto.

| Script | Descrição |
| --- | --- |
| `npm run dev` | Inicia API e frontend em paralelo. |
| `npm run dev:api` | Inicia apenas a API. |
| `npm run dev:web` | Inicia apenas o frontend. |
| `npm run build` | Executa build/typecheck dos workspaces que possuem script de build. |
| `npm run typecheck` | Verifica TypeScript nos workspaces. |
| `npm run db:generate` | Gera o Prisma Client. |
| `npm run db:migrate` | Aplica/cria migrations com Prisma Migrate. |
| `npm run db:seed` | Recria os dados iniciais. |
| `npm run db:studio` | Abre o Prisma Studio. |

### Scripts internos da API

No workspace `@world-cup/api`:

| Script | Descrição |
| --- | --- |
| `dev` | Inicia `src/server.ts` com `tsx watch` e carrega `../../.env`. |
| `build` | Executa `tsc --noEmit`. |
| `typecheck` | Executa `tsc --noEmit`. |
| `db:generate` | Executa `prisma generate`. |
| `db:migrate` | Executa `prisma migrate dev`. |
| `db:seed` | Executa `prisma db seed`. |
| `db:studio` | Executa `prisma studio`. |

### Scripts internos do frontend

No workspace `@world-cup/web`:

| Script | Descrição |
| --- | --- |
| `dev` | Inicia o servidor Vite. |
| `build` | Executa `tsc -b` e `vite build`. |
| `typecheck` | Executa `tsc -b --pretty false`. |

## Variáveis de ambiente

O projeto usa uma variável principal:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/world-cup"
```

Ela é usada pelo Prisma para conectar no PostgreSQL local.

## Banco de dados

O schema Prisma fica em `apps/api/prisma/schema.prisma`.

### Modelo `NationalTeam`

Representa uma seleção nacional.

Campos principais:

| Campo | Tipo | Descrição |
| --- | --- | --- |
| `id` | `Int` | Identificador autoincremental. |
| `name` | `String` | Nome da seleção. |
| `acronym` | `String` | Sigla única da seleção. |
| `group` | `String` | Grupo da seleção. |
| `flag` | `String` | URL da bandeira. |
| `createdAt` | `DateTime` | Data de criação. |
| `updatedAt` | `DateTime?` | Data de atualização. |

No banco, a tabela é mapeada como `national_team`.

### Modelo `Match`

Representa uma partida entre duas seleções.

Campos principais:

| Campo | Tipo | Descrição |
| --- | --- | --- |
| `id` | `Int` | Identificador autoincremental. |
| `homeTeamId` | `Int` | ID da seleção mandante. |
| `awayTeamId` | `Int` | ID da seleção visitante. |
| `homeGoals` | `Int?` | Gols da seleção mandante. |
| `awayGoals` | `Int?` | Gols da seleção visitante. |
| `phase` | `String` | Fase da competição. Padrão: `Fase de Grupos`. |
| `round` | `Int` | Rodada da partida. |
| `completed` | `Boolean` | Indica se o placar já foi lançado. |
| `createdAt` | `DateTime` | Data de criação. |
| `updatedAt` | `DateTime?` | Data de atualização. |

No banco, a tabela é mapeada como `match`.

### Seed

O arquivo `apps/api/prisma/seed.ts`:

- Apaga todas as partidas.
- Apaga todas as seleções.
- Cria 16 seleções.
- Distribui as seleções nos grupos A até H.
- Cria partidas de ida e volta entre as seleções de cada grupo.

Seleções iniciais:

| Grupo | Seleções |
| --- | --- |
| A | Brasil, Argentina |
| B | França, Alemanha |
| C | Espanha, Portugal |
| D | Inglaterra, Uruguai |
| E | Qatar, Japão |
| F | Coreia do Sul, Estados Unidos |
| G | México, Canadá |
| H | Marrocos, Croácia |

Como existem duas seleções por grupo, o seed cria duas partidas por grupo: uma na rodada 1 e outra na rodada 2, invertendo mandante e visitante.

## API

A API roda em `http://localhost:3333`.

Em desenvolvimento, o frontend usa o proxy do Vite. Portanto, chamadas feitas pelo navegador para `/api/team`, por exemplo, são encaminhadas para `http://localhost:3333/team`.

### Rotas

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/team` | Lista todas as seleções. |
| `GET` | `/team/:letra` | Lista seleções de um grupo. |
| `GET` | `/classificacao/:grupo` | Retorna a classificação de um grupo. |
| `GET` | `/partidas` | Lista todas as partidas. |
| `GET` | `/partidas/rodada/:numero` | Lista partidas de uma rodada. |
| `POST` | `/partidas` | Cria uma nova partida. |
| `PATCH` | `/partidas/:id/resultado` | Atualiza o resultado de uma partida. |

Os exemplos de resposta abaixo focam nos campos mais importantes para uso da aplicação. Registros retornados pelo Prisma também podem incluir campos de data, como `createdAt` e `updatedAt`.

### `GET /team`

Lista todas as seleções ordenadas por grupo e nome.

Exemplo:

```bash
curl http://localhost:3333/team
```

Resposta:

```json
{
  "teams": [
    {
      "id": 1,
      "name": "Argentina",
      "acronym": "ARG",
      "group": "A",
      "flag": "https://flagcdn.com/ar.svg"
    }
  ]
}
```

### `GET /team/:letra`

Lista as seleções de um grupo específico.

Exemplo:

```bash
curl http://localhost:3333/team/A
```

Observações:

- O parâmetro é convertido para maiúsculo.
- Se não houver seleções no grupo, a resposta será uma lista vazia.

### `GET /classificacao/:grupo`

Retorna a classificação calculada do grupo.

Exemplo:

```bash
curl http://localhost:3333/classificacao/A
```

Resposta:

```json
{
  "grupo": "A",
  "tabela": [
    {
      "selecao": {
        "id": 1,
        "nome": "Argentina",
        "sigla": "ARG",
        "bandeira": "https://flagcdn.com/ar.svg"
      },
      "jogosDisputados": 0,
      "vitorias": 0,
      "empates": 0,
      "derrotas": 0,
      "pontos": 0,
      "golsPro": 0,
      "golsContra": 0,
      "saldoGols": 0
    }
  ]
}
```

Regras de pontuação:

- Vitória: 3 pontos.
- Empate: 1 ponto.
- Derrota: 0 pontos.

Critérios de ordenação:

1. Mais pontos.
2. Melhor saldo de gols.
3. Mais gols pró.

Se o grupo não existir, a API retorna `404`:

```json
{
  "message": "Grupo Z não encontrado"
}
```

### `GET /partidas`

Lista todas as partidas ordenadas por rodada.

Exemplo:

```bash
curl http://localhost:3333/partidas
```

Resposta:

```json
{
  "matches": [
    {
      "id": 1,
      "homeTeamId": 1,
      "awayTeamId": 2,
      "homeGoals": null,
      "awayGoals": null,
      "phase": "Fase de Grupos",
      "round": 1,
      "completed": false,
      "homeTeam": {
        "id": 1,
        "name": "Argentina",
        "acronym": "ARG",
        "group": "A",
        "flag": "https://flagcdn.com/ar.svg"
      },
      "awayTeam": {
        "id": 2,
        "name": "Brasil",
        "acronym": "BRA",
        "group": "A",
        "flag": "https://flagcdn.com/br.svg"
      }
    }
  ]
}
```

### `GET /partidas/rodada/:numero`

Lista partidas de uma rodada.

Exemplo:

```bash
curl http://localhost:3333/partidas/rodada/1
```

Validações:

- `numero` precisa ser um inteiro positivo.
- Caso contrário, retorna `400`.

### `POST /partidas`

Cria uma nova partida.

Exemplo:

```bash
curl -X POST http://localhost:3333/partidas \
  -H "Content-Type: application/json" \
  -d '{
    "homeTeamId": 1,
    "awayTeamId": 2,
    "round": 3,
    "phase": "Fase de Grupos"
  }'
```

Body:

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `homeTeamId` | `number` | Sim | ID da seleção mandante. |
| `awayTeamId` | `number` | Sim | ID da seleção visitante. |
| `round` | `number` | Sim | Rodada. |
| `phase` | `string` | Não | Fase da competição. Padrão: `Fase de Grupos`. |

Validações:

- `homeTeamId`, `awayTeamId` e `round` devem ser inteiros positivos.
- Uma seleção não pode jogar contra ela mesma.
- As duas seleções precisam existir.

Resposta de sucesso:

```json
{
  "match": {
    "id": 17,
    "homeTeamId": 1,
    "awayTeamId": 2,
    "homeGoals": null,
    "awayGoals": null,
    "phase": "Fase de Grupos",
    "round": 3,
    "completed": false
  }
}
```

### `PATCH /partidas/:id/resultado`

Atualiza o placar de uma partida e marca a partida como concluída.

Exemplo:

```bash
curl -X PATCH http://localhost:3333/partidas/1/resultado \
  -H "Content-Type: application/json" \
  -d '{
    "golsMandante": 2,
    "golsVisitante": 1
  }'
```

Body:

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `golsMandante` | `number` | Sim | Gols da seleção mandante. |
| `golsVisitante` | `number` | Sim | Gols da seleção visitante. |

Validações:

- `id` deve ser um inteiro positivo.
- `golsMandante` e `golsVisitante` devem ser inteiros não negativos.
- A partida precisa existir.

Ao salvar, a API atualiza:

- `homeGoals`
- `awayGoals`
- `completed` para `true`

### Tratamento de erros

A API usa `AppError` para erros esperados e responde no formato:

```json
{
  "message": "Mensagem do erro"
}
```

Erros não tratados retornam `500` com a mensagem do erro.

## Frontend

O frontend fica em `apps/web` e é servido pelo Vite.

### Rotas da interface

| Caminho | Descrição |
| --- | --- |
| `/` | Página pública da competição. |
| `/admin` | Painel administrativo. |

Não há roteador externo instalado. A aplicação usa `window.history.pushState` e o caminho atual para alternar entre visualização pública e administrativa.

### Tela pública

A tela pública exibe:

- Hero visual da competição.
- Classificação por grupo.
- Abas dos grupos A até H.
- Tabela com posição, seleção, pontos, jogos, vitórias, empates, derrotas, gols e saldo.
- Indicação visual de que os dois primeiros avançam.
- Lista de partidas.
- Filtro por rodada.
- Status de partida encerrada ou futura.

### Painel administrativo

O painel administrativo exibe:

- Resumo com quantidade total de partidas.
- Quantidade de partidas finalizadas.
- Quantidade de partidas agendadas.
- Formulário para criar nova partida.
- Lista de partidas cadastradas.
- Controles para atualizar placares.
- Botão para voltar ao site público.

### Comunicação com a API

O arquivo `apps/web/src/api.ts` concentra as chamadas HTTP usadas pela interface.

Durante o desenvolvimento, as chamadas usam `/api`:

```ts
fetch(`/api${path}`)
```

O Vite reescreve esse prefixo e encaminha a requisição para `http://localhost:3333`:

```ts
proxy: {
  "/api": {
    target: "http://localhost:3333",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ""),
  },
}
```

## Fluxo de desenvolvimento

### Rodar tudo em modo desenvolvimento

```bash
npm run dev
```

Use esse modo para desenvolver a API e o frontend ao mesmo tempo.

### Rodar apenas a API

```bash
npm run dev:api
```

### Rodar apenas o frontend

```bash
npm run dev:web
```

Ao rodar apenas o frontend, a API precisa estar disponível em `http://localhost:3333` para que o proxy funcione.

### Validar TypeScript

```bash
npm run typecheck
```

### Gerar build

```bash
npm run build
```

Na API, o build atual executa apenas `tsc --noEmit`. No frontend, o build executa `tsc -b` e `vite build`.

### Usar Prisma Studio

```bash
npm run db:studio
```

O Prisma Studio permite visualizar e editar dados do banco pelo navegador.

## Solução de problemas

### Erro de conexão com o banco

Confira se o container do PostgreSQL está rodando:

```bash
docker compose ps
```

Se não estiver, suba novamente:

```bash
docker compose up -d
```

Verifique também se o `.env` existe na raiz e contém `DATABASE_URL`.

### Porta `5432` já está em uso

Algum PostgreSQL local pode estar usando a mesma porta. Pare o serviço local ou altere a porta exposta no `docker-compose.yml`.

### Frontend abre, mas não carrega dados

Confirme se a API está rodando:

```bash
npm run dev:api
```

Depois teste uma rota diretamente:

```bash
curl http://localhost:3333/team
```

Se a API responder, confira se o frontend está rodando pelo Vite em `http://localhost:5173`, pois o proxy `/api` é configurado no servidor de desenvolvimento do Vite.

### Classificação aparece zerada

Isso é esperado logo após o seed. As partidas são criadas sem placar:

- `homeGoals: null`
- `awayGoals: null`
- `completed: false`

Atualize os resultados pelo painel `/admin` para que a classificação passe a somar jogos, pontos e gols.

### Grupo não encontrado

A rota `/classificacao/:grupo` retorna `404` quando não existem seleções cadastradas para o grupo informado. O seed cria os grupos de `A` até `H`.

### Recriar os dados do zero

Execute:

```bash
npm run db:seed
```

O seed apaga partidas e seleções existentes antes de recriar os dados iniciais.

## Observações importantes

- A API escuta sempre na porta `3333`, definida em `apps/api/src/server.ts`.
- O frontend escuta na porta `5173`, definida em `apps/web/vite.config.ts`.
- O projeto ainda não possui autenticação no painel administrativo.
- O projeto ainda não possui uma suíte de testes automatizados configurada.
- As bandeiras usadas no seed são URLs externas do serviço `flagcdn.com`.
