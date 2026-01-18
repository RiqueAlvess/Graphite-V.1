# 🎨 Vega Visual Editor - Plataforma SaaS

Uma plataforma completa para criar gráficos Vega-Lite visualmente, sem editar JSON. Compatível com Deneb e Power BI.

![Status](https://img.shields.io/badge/status-production--ready-green)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Node.js](https://img.shields.io/badge/Node.js-20-green)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Features](#features)
- [Stack Tecnológico](#stack-tecnológico)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Setup Local](#setup-local)
- [Deploy](#deploy)
- [Uso](#uso)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## 🎯 Sobre o Projeto

O Vega Visual Editor é uma plataforma SaaS que permite criar gráficos Vega-Lite customizados através de um editor visual intuitivo, sem necessidade de editar JSON manualmente. Os gráficos gerados são totalmente compatíveis com Deneb (Power BI).

### Diferencial

- ✅ Editor 100% visual (sem JSON manual)
- ✅ Preview em tempo real
- ✅ Galeria de templates prontos
- ✅ Modelo freemium generoso
- ✅ Exportação direta para Deneb
- ✅ Dark mode profissional
- ✅ Totalmente responsivo

## 🚀 Features

### Para Usuários Free

- Criar 1 gráfico editável por dia
- Editor visual completo
- Preview em tempo real
- Exportar JSON para Deneb
- Acessar galeria de templates

### Para Usuários Premium (R$ 9,90/mês)

- Gráficos ilimitados
- Publicar na galeria pública
- Acessar templates exclusivos
- Suporte prioritário

## 🛠 Stack Tecnológico

### Backend

- **Runtime**: Node.js 20 + TypeScript 5
- **Framework**: Express.js 4
- **Database**: PostgreSQL 15
- **ORM**: Prisma 5
- **Auth**: JWT (jsonwebtoken)
- **Security**: bcryptjs, helmet, cors
- **Validation**: Zod (opcional)

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite 5
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand 4
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Visualization**: Vega-Lite 5 + vega-embed 6

### DevOps

- **Containerization**: Docker + Docker Compose
- **Frontend Deploy**: Vercel
- **Backend Deploy**: Railway / Render
- **Database**: Railway / Render PostgreSQL

## 📁 Estrutura do Projeto

```
Graphite-V.1/
├── backend/                    # API Node.js + Express
│   ├── src/
│   │   ├── config/            # Configurações (env, cors, etc)
│   │   ├── controllers/       # Controllers (auth, charts, gallery)
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Auth, error handling, etc
│   │   ├── routes/            # API routes
│   │   ├── database/          # Prisma client
│   │   ├── utils/             # Helpers (jwt, password, etc)
│   │   └── server.ts          # Entry point
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   └── package.json
│
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── app/               # App root + routing
│   │   ├── pages/             # Page components
│   │   ├── components/        # Reusable components
│   │   │   ├── Layout/        # Navbar, Footer
│   │   │   ├── Auth/          # Auth components
│   │   │   ├── Editor/        # Preview, StylePanel
│   │   │   ├── Dashboard/     # Chart cards
│   │   │   ├── Gallery/       # Gallery components
│   │   │   └── Common/        # Button, Toast, etc
│   │   ├── stores/            # Zustand stores
│   │   ├── services/          # API services
│   │   ├── hooks/             # Custom hooks
│   │   ├── types/             # TypeScript types
│   │   ├── constants/         # Constants, colors
│   │   ├── utils/             # Helper functions
│   │   └── styles/            # Global CSS
│   └── package.json
│
├── docker-compose.yml          # Local development
└── README.md
```

## 🏃 Setup Local

### Pré-requisitos

- Node.js 20+ e npm/yarn
- Docker e Docker Compose (para PostgreSQL)
- Git

### 1. Clone o Repositório

```bash
git clone https://github.com/RiqueAlvess/Graphite-V.1.git
cd Graphite-V.1
```

### 2. Setup do Backend

```bash
cd backend

# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env

# Editar .env com suas configurações
# DATABASE_URL=postgresql://postgres:postgres@localhost:5432/vega_editor
# JWT_SECRET=your-secret-key-here
# FRONTEND_URL=http://localhost:5173

# Iniciar PostgreSQL com Docker
cd ..
docker-compose up -d

# Voltar ao backend
cd backend

# Executar migrations do Prisma
npx prisma migrate dev --name init

# (Opcional) Seed inicial
npx prisma db seed

# Iniciar servidor de desenvolvimento
npm run dev
```

O backend estará rodando em `http://localhost:3001`

### 3. Setup do Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env.local

# Editar .env.local
# VITE_API_URL=http://localhost:3001/api

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

### 4. Acessar a Aplicação

1. Abra `http://localhost:5173`
2. Clique em "Cadastrar" para criar uma conta
3. Faça login
4. Crie seu primeiro gráfico!

## 🌐 Deploy

### Backend (Railway/Render)

#### Railway

1. Crie uma conta em [railway.app](https://railway.app)
2. Crie um novo projeto
3. Adicione PostgreSQL database
4. Conecte seu repositório GitHub
5. Configure variáveis de ambiente:
   ```
   DATABASE_URL=(auto-gerado pelo Railway)
   JWT_SECRET=seu-secret-super-seguro
   FRONTEND_URL=https://seu-app.vercel.app
   NODE_ENV=production
   ```
6. Deploy automático ao fazer push

#### Render

1. Crie uma conta em [render.com](https://render.com)
2. Crie PostgreSQL database
3. Crie Web Service
4. Conecte GitHub repo
5. Configure:
   - Build Command: `cd backend && npm install && npx prisma generate && npx prisma migrate deploy`
   - Start Command: `cd backend && npm start`
   - Environment Variables: (mesmas do Railway)

### Frontend (Vercel)

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Importe seu repositório
3. Configure:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Environment Variables:
   ```
   VITE_API_URL=https://seu-backend.railway.app/api
   ```
5. Deploy!

## 📖 Uso

### Criar um Gráfico

1. Faça login
2. Clique em "Novo Gráfico"
3. Dê um nome ao gráfico
4. No editor:
   - Escolha o tipo de gráfico (barras, linhas, etc)
   - Customize cores, opacidade, bordas
   - Veja o preview em tempo real
5. Clique em "Salvar"

### Exportar para Deneb/Power BI

1. No editor, clique em "Exportar"
2. Copie o JSON gerado
3. No Power BI:
   - Adicione um visual Deneb
   - Cole o JSON na aba "Specification"
   - Configure seus dados
   - Pronto!

### Galeria de Templates

1. Acesse "Galeria" no menu
2. Navegue pelos templates
3. Clique em "Usar Template" para clonar
4. Personalize e salve

## 🔌 API Documentation

### Authentication

#### POST /api/auth/register
Criar nova conta

```json
{
  "email": "user@example.com",
  "password": "senha123",
  "name": "Nome do Usuário"
}
```

Response:
```json
{
  "token": "jwt-token",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "Nome do Usuário",
    "plan": "free"
  }
}
```

#### POST /api/auth/login
Fazer login

```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

### Charts

#### GET /api/charts
Listar gráficos do usuário (requer autenticação)

#### POST /api/charts
Criar novo gráfico (requer autenticação)

```json
{
  "name": "Meu Gráfico",
  "vegaSpec": { ... }
}
```

#### GET /api/charts/:id
Obter gráfico específico

#### PUT /api/charts/:id
Atualizar gráfico

#### DELETE /api/charts/:id
Deletar gráfico

### Gallery

#### GET /api/gallery
Listar templates públicos

#### POST /api/charts/:id/publish
Publicar gráfico na galeria (Premium)

## 🤝 Contributing

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 License

Este projeto é proprietário. Todos os direitos reservados.

## 👥 Autores

- **Graphite Team** - *Desenvolvimento inicial*

## 🙏 Agradecimentos

- [Vega-Lite](https://vega.github.io/vega-lite/) pela biblioteca incrível
- [Deneb](https://deneb-viz.github.io/) pela inspiração
- Comunidade Power BI

---

**Desenvolvido com ❤️ por Graphite Team**
