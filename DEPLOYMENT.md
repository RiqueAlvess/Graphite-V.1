# 🚀 Guia de Deploy - Vega Visual Editor

Este documento contém instruções passo a passo para fazer deploy da plataforma em produção.

## 📋 Índice

- [Arquitetura de Deploy](#arquitetura-de-deploy)
- [Deploy do Backend](#deploy-do-backend)
- [Deploy do Frontend](#deploy-do-frontend)
- [Configuração de DNS](#configuração-de-dns)
- [Monitoramento](#monitoramento)
- [Troubleshooting](#troubleshooting)

## 🏗️ Arquitetura de Deploy

```
┌─────────────────────────────────────────────────────────────┐
│                      USUÁRIO FINAL                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTPS
                     │
        ┌────────────┴──────────────┐
        │                           │
        ▼                           ▼
┌───────────────┐           ┌──────────────┐
│   FRONTEND    │           │   BACKEND    │
│   (Vercel)    │◄─────────►│  (Railway)   │
│               │   API     │              │
│ - React SPA   │           │ - Express    │
│ - Static      │           │ - Node.js    │
│ - CDN Global  │           │ - REST API   │
└───────────────┘           └──────┬───────┘
                                   │
                                   │ SQL
                                   ▼
                            ┌─────────────┐
                            │ PostgreSQL  │
                            │  (Railway)  │
                            └─────────────┘
```

## 🔧 Pré-requisitos

Antes de começar, você precisará:

- [ ] Conta no GitHub (código deve estar em repositório)
- [ ] Conta na Vercel (frontend)
- [ ] Conta no Railway ou Render (backend + database)
- [ ] Domínio customizado (opcional, mas recomendado)

## 🗄️ Deploy do Backend

Vamos usar o **Railway** como exemplo. O processo no Render é similar.

### Passo 1: Criar Conta no Railway

1. Acesse [railway.app](https://railway.app)
2. Faça login com GitHub
3. Clique em "New Project"

### Passo 2: Adicionar PostgreSQL

1. No projeto, clique em "+ New"
2. Selecione "Database" → "PostgreSQL"
3. Aguarde o provisionamento (1-2 minutos)
4. **Importante**: Copie a `DATABASE_URL` que foi gerada

### Passo 3: Adicionar Backend

1. Clique em "+ New" novamente
2. Selecione "GitHub Repo"
3. Conecte sua conta GitHub (se ainda não conectou)
4. Selecione o repositório `Graphite-V.1`
5. Railway vai detectar automaticamente o Node.js

### Passo 4: Configurar Build

1. Clique no serviço backend criado
2. Vá em "Settings"
3. Configure:

**Root Directory:**
```
backend
```

**Build Command:**
```bash
npm install && npx prisma generate && npx prisma migrate deploy
```

**Start Command:**
```bash
npm start
```

**Watch Paths:**
```
backend/**
```

### Passo 5: Configurar Variáveis de Ambiente

1. No serviço backend, vá em "Variables"
2. Adicione as seguintes variáveis:

```env
# Database (conecta ao PostgreSQL do Railway)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# JWT Secret (gere um random string seguro)
JWT_SECRET=SuaChaveSecretaSuperSeguraAqui123!@#

# Environment
NODE_ENV=production

# Port (Railway define automaticamente)
PORT=3000

# Frontend URL (você vai pegar depois no Vercel)
FRONTEND_URL=https://vega-editor.vercel.app
```

**Como gerar JWT_SECRET seguro:**

```bash
# No terminal local
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Passo 6: Deploy!

1. Clique em "Deploy"
2. Aguarde o build (2-3 minutos)
3. Se tudo der certo, você verá "Success" ✅
4. Copie a URL gerada (ex: `https://seu-app.railway.app`)

### Passo 7: Executar Seed (Opcional)

Para popular dados iniciais:

1. Vá em "Settings" → "Service"
2. Clique em "Connect" para abrir Railway CLI
3. Execute:

```bash
npm run seed
```

Ou use o Railway CLI local:

```bash
railway link
railway run npm run seed
```

### Passo 8: Testar Backend

```bash
curl https://seu-app.railway.app/health
```

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "...",
  "env": "production"
}
```

## 🎨 Deploy do Frontend

Usaremos a **Vercel** (recomendado para React/Vite).

### Passo 1: Criar Conta na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em "Add New" → "Project"

### Passo 2: Importar Repositório

1. Selecione o repositório `Graphite-V.1`
2. Clique em "Import"

### Passo 3: Configurar Build

Na página de configuração:

**Framework Preset:**
```
Vite
```

**Root Directory:**
```
frontend
```

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```bash
npm install
```

### Passo 4: Configurar Variáveis de Ambiente

Clique em "Environment Variables" e adicione:

```env
VITE_API_URL=https://seu-app.railway.app/api
```

**⚠️ IMPORTANTE**: Use a URL do Railway que você copiou anteriormente!

### Passo 5: Deploy!

1. Clique em "Deploy"
2. Aguarde o build (1-2 minutos)
3. Vercel vai gerar uma URL (ex: `https://vega-editor.vercel.app`)
4. Acesse e teste! 🎉

### Passo 6: Atualizar CORS no Backend

Agora que você tem a URL do frontend, volte ao Railway:

1. Vá nas variáveis de ambiente do backend
2. Atualize `FRONTEND_URL`:

```env
FRONTEND_URL=https://vega-editor.vercel.app
```

3. Salve (vai fazer redeploy automático)

## 🌐 Configuração de DNS (Opcional)

### Domínio Customizado no Vercel

1. Na Vercel, vá em "Settings" → "Domains"
2. Adicione seu domínio (ex: `vegaeditor.com`)
3. Configure DNS no seu provedor:

**Para domínio raiz (vegaeditor.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Para subdomínio (www.vegaeditor.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Aguarde propagação (5-60 minutos)
5. SSL é automático! 🔒

### Domínio Customizado no Railway (Backend API)

1. No Railway, vá em "Settings" → "Domains"
2. Adicione domínio customizado (ex: `api.vegaeditor.com`)
3. Configure CNAME no seu DNS:

```
Type: CNAME
Name: api
Value: seu-app.railway.app
```

4. Aguarde propagação
5. Atualize `VITE_API_URL` na Vercel:

```env
VITE_API_URL=https://api.vegaeditor.com/api
```

## 📊 Monitoramento

### Backend (Railway)

1. **Logs em tempo real:**
   - Railway Dashboard → Seu serviço → "Logs"

2. **Métricas:**
   - Railway Dashboard → "Metrics"
   - CPU, Memória, Network

3. **Alertas:**
   - Configure notificações em "Settings" → "Notifications"

### Frontend (Vercel)

1. **Analytics:**
   - Vercel Dashboard → "Analytics"
   - Page views, performance, etc

2. **Logs de Deploy:**
   - "Deployments" → Selecione deploy → "Logs"

### Database

1. **Railway PostgreSQL:**
   - Dashboard → PostgreSQL service → "Metrics"
   - Monitor connections, storage

2. **Backup:**
   - Railway faz backup automático
   - Para backup manual: use `pg_dump`

```bash
railway connect Postgres
pg_dump -Fc vega_editor > backup.dump
```

## 🐛 Troubleshooting

### Backend não inicia

**Sintoma:** Build passa mas app crashea

**Solução:**
1. Verifique logs no Railway
2. Confira variáveis de ambiente
3. Teste migrations:

```bash
railway run npx prisma migrate status
```

### CORS Error no Frontend

**Sintoma:** "CORS policy blocked"

**Solução:**
1. Verifique `FRONTEND_URL` no backend
2. Deve ser exatamente a URL da Vercel
3. Sem `/` no final
4. Redeploy backend após mudança

### Database Connection Error

**Sintoma:** "Can't connect to database"

**Solução:**
1. Verifique `DATABASE_URL`
2. Confira se PostgreSQL está rodando
3. Teste conexão:

```bash
railway run npx prisma db push
```

### Build Falha (Frontend)

**Sintoma:** Vercel build error

**Solução:**
1. Verifique se `Root Directory` está correto: `frontend`
2. Confira se `VITE_API_URL` está definido
3. Teste build local:

```bash
cd frontend
npm run build
```

### 401 Unauthorized

**Sintoma:** Toda requisição retorna 401

**Solução:**
1. JWT expirado ou inválido
2. Limpe localStorage
3. Faça login novamente

## 🔄 CI/CD Automático

Ambos Vercel e Railway fazem deploy automático:

- **Push to main:** Deploy em produção
- **Push to outra branch:** Preview deploy
- **Pull Request:** Deploy de preview

### Workflow Recomendado

```
main (produção)
  ↓
develop (staging)
  ↓
feature/xxx (preview)
```

## 📈 Scaling

### Backend (Railway)

1. Vá em "Settings" → "Resources"
2. Aumente vCPU e RAM conforme necessário
3. Railway escala horizontalmente automaticamente

### Database

1. Upgrade plano do PostgreSQL
2. Configure connection pooling (Prisma já faz isso)

### Frontend (Vercel)

- Escala automaticamente (CDN global)
- Sem necessidade de configuração

## 💰 Custos Estimados

| Serviço | Plano | Custo/mês |
|---------|-------|-----------|
| Vercel | Hobby | $0 (grátis) |
| Railway | Hobby | $5 |
| PostgreSQL | 256MB | Incluído |
| **Total** | | **~$5/mês** |

Para produção com tráfego real:
- Vercel Pro: $20/mês
- Railway Pro: $20/mês
- PostgreSQL upgrade: +$10/mês
- **Total:** ~$50/mês

## ✅ Checklist Pré-Deploy

Antes de ir para produção:

- [ ] Testar localmente completo
- [ ] Backend health check funcionando
- [ ] Migrations aplicadas
- [ ] Seed executado (se necessário)
- [ ] Frontend conectando ao backend
- [ ] Login/Register funcionando
- [ ] Criar/Editar gráfico funcionando
- [ ] Export JSON funcionando
- [ ] CORS configurado corretamente
- [ ] Variáveis de ambiente em produção
- [ ] SSL ativo (HTTPS)
- [ ] Domínio customizado (opcional)
- [ ] Monitoramento configurado
- [ ] Backup configurado

## 🎉 Pronto!

Sua plataforma está no ar! 🚀

Acesse e compartilhe:
- Frontend: `https://vega-editor.vercel.app`
- API: `https://seu-app.railway.app`

---

**Precisa de ajuda?** Abra uma issue no GitHub!
