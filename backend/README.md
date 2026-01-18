# Vega Visual Editor - Backend API

Backend da plataforma Vega Visual Editor, desenvolvido com Node.js, Express.js, TypeScript e Prisma ORM.

## 🚀 Tecnologias

- **Node.js** 20+
- **TypeScript** 5
- **Express.js** 4 - Framework web
- **Prisma** 5 - ORM para PostgreSQL
- **PostgreSQL** 15 - Database
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## 📁 Estrutura

```
backend/
├── src/
│   ├── config/              # Configurações (env, cors)
│   ├── controllers/         # Controllers HTTP
│   ├── services/            # Business logic
│   ├── middleware/          # Auth, errors, etc
│   ├── routes/              # API routes
│   ├── database/            # Prisma client
│   ├── utils/               # Helpers
│   ├── types/               # TypeScript types
│   └── server.ts            # Entry point
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── seed.ts              # Seed data
│   └── migrations/          # DB migrations
└── package.json
```

## 🏃 Como Rodar

### Pré-requisitos

- Node.js 20+
- PostgreSQL 15+ (ou Docker)
- npm ou yarn

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Ambiente

Copie `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

Edite `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/vega_editor?schema=public"
JWT_SECRET=seu-secret-super-seguro
FRONTEND_URL=http://localhost:5173
PORT=3001
NODE_ENV=development
```

### 3. Configurar Database

#### Opção 1: PostgreSQL Local

```bash
# Criar database
createdb vega_editor

# Executar migrations
npx prisma migrate dev

# Seed inicial (opcional)
npx prisma db seed
```

#### Opção 2: Docker Compose (Recomendado)

Na raiz do projeto:

```bash
docker-compose up -d
```

Depois execute as migrations:

```bash
npx prisma migrate dev
npx prisma db seed
```

### 4. Iniciar Servidor

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm run build
npm start
```

O servidor estará em `http://localhost:3001`

## 🔌 API Endpoints

### Health Check

```
GET /health
```

Retorna status do servidor.

### Autenticação

#### POST /api/auth/register
Criar nova conta de usuário.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "senha123",
  "name": "Nome do Usuário"
}
```

**Response:**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "clxxx",
    "email": "user@example.com",
    "name": "Nome do Usuário",
    "plan": "free"
  }
}
```

#### POST /api/auth/login
Fazer login.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

### Charts (Requer Autenticação)

Todas as rotas abaixo requerem header:
```
Authorization: Bearer <token>
```

#### GET /api/charts
Listar todos os gráficos do usuário.

#### POST /api/charts
Criar novo gráfico.

**Body:**
```json
{
  "name": "Meu Gráfico",
  "vegaSpec": {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": { "name": "dataset" },
    "mark": "bar",
    ...
  }
}
```

**Limitações:**
- Free plan: 1 gráfico por dia
- Premium: ilimitado

#### GET /api/charts/:id
Obter gráfico específico.

#### PUT /api/charts/:id
Atualizar gráfico.

**Body:**
```json
{
  "name": "Novo Nome",
  "vegaSpec": { ... }
}
```

#### DELETE /api/charts/:id
Deletar gráfico.

#### POST /api/charts/:id/publish
Publicar gráfico na galeria (apenas Premium).

**Body:**
```json
{
  "title": "Título do Template",
  "description": "Descrição...",
  "category": "business",
  "tags": ["vendas", "bar-chart"]
}
```

### Gallery (Pública)

#### GET /api/gallery
Listar templates e gráficos públicos.

**Query params:**
- `category` (opcional)
- `search` (opcional)

#### GET /api/gallery/:id
Obter item específico da galeria.

#### POST /api/gallery/:id/use
Incrementar contador de uso.

## 🗄️ Database Schema

### Users
- id, email, name, passwordHash
- subscriptionPlan (free/premium)
- chartsCreatedToday, lastChartResetDate

### VisualConfigs
- id, name, description
- vegaSpec (JSON)
- chartType
- userId

### GalleryItems
- id, title, description
- visualConfigId
- creatorId
- viewCount, useCount, favoriteCount
- category, tags

### ActivityLogs
- id, userId
- action, description, metadata

## 🔒 Segurança

- **JWT** para autenticação
- **bcrypt** para hash de senhas (10 rounds)
- **Helmet** para security headers
- **CORS** configurado
- **Rate limiting** (em produção)
- Validação de inputs
- SQL injection protection (Prisma)

## 🧪 Scripts Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start

# Prisma Studio (GUI para DB)
npx prisma studio

# Gerar Prisma Client
npx prisma generate

# Criar migration
npx prisma migrate dev --name nome_da_migration

# Reset database
npx prisma migrate reset

# Seed
npx prisma db seed
```

## 📊 Monitoramento

### Logs

Logs são gerados com Morgan:
- Desenvolvimento: formato `dev`
- Produção: formato `combined`

### Health Check

```bash
curl http://localhost:3001/health
```

Retorna:
```json
{
  "status": "ok",
  "timestamp": "2026-01-18T12:00:00.000Z",
  "env": "development"
}
```

## 🚢 Deploy

### Railway

1. Conecte repositório
2. Adicione PostgreSQL
3. Configure env vars
4. Deploy automático

### Render

1. Crie Web Service
2. Build: `npm install && npx prisma generate && npx prisma migrate deploy`
3. Start: `npm start`
4. Adicione PostgreSQL database
5. Configure env vars

## 🐛 Troubleshooting

### Erro de conexão com DB

```bash
# Verificar se PostgreSQL está rodando
docker ps

# Ou
pg_isready
```

### Prisma Client não encontrado

```bash
npx prisma generate
```

### Migrations pendentes

```bash
npx prisma migrate deploy
```

## 📝 License

Proprietary - Todos os direitos reservados
