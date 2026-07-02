# World Cup

Monorepo com API Express/Prisma e frontend React/Vite.

## Estrutura

```text
apps/
  api/  # Express, Prisma e PostgreSQL
  web/  # React, Vite e TypeScript
```

## Executar

```bash
cp .env.example .env
docker compose up -d
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:3333
- Prisma Studio: `npm run db:studio`

O comando `npm run dev` inicia os dois aplicativos. Durante o desenvolvimento,
o Vite encaminha chamadas de `/api` para a API na porta 3333.

## Scripts

- `npm run dev`: inicia API e frontend
- `npm run build`: valida a API e gera o frontend de produção
- `npm run typecheck`: verifica o TypeScript de todos os workspaces
- `npm run db:generate`: gera o Prisma Client
- `npm run db:migrate`: aplica/cria migrations
- `npm run db:seed`: recria os dados de exemplo
- `npm run db:studio`: abre o Prisma Studio
