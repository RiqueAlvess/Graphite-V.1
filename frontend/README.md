# Vega Visual Editor - Frontend

Frontend da plataforma Vega Visual Editor, desenvolvido com React 19, TypeScript e Vite.

## 🚀 Tecnologias

- **React** 19 - Framework UI
- **TypeScript** 5 - Type safety
- **Vite** 5 - Build tool e dev server
- **Tailwind CSS** 3 - Utility-first CSS
- **Zustand** 4 - State management
- **React Router** v6 - Routing
- **Axios** - HTTP client
- **Vega-Lite** 5 - Visualization grammar
- **vega-embed** 6 - Vega renderer

## 📁 Estrutura

```
frontend/
├── src/
│   ├── app/                 # App root
│   │   ├── App.tsx         # Routes
│   │   └── main.tsx        # Entry point
│   │
│   ├── pages/              # Page components
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── EditorPage.tsx
│   │   ├── GalleryPage.tsx
│   │   └── SettingsPage.tsx
│   │
│   ├── components/
│   │   ├── Layout/         # Navbar, Footer
│   │   ├── Auth/           # ProtectedRoute
│   │   ├── Editor/         # Preview, StylePanel
│   │   ├── Dashboard/      # Chart cards
│   │   ├── Gallery/        # Gallery items
│   │   └── Common/         # Toast, Button, etc
│   │
│   ├── stores/             # Zustand state
│   │   ├── authStore.ts
│   │   ├── chartStore.ts
│   │   ├── galleryStore.ts
│   │   └── uiStore.ts
│   │
│   ├── services/           # API calls
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── chartService.ts
│   │   └── galleryService.ts
│   │
│   ├── types/              # TypeScript types
│   ├── constants/          # Constants, colors
│   ├── utils/              # Helpers
│   ├── styles/             # Global CSS
│   └── lib/                # Third-party configs
│
└── package.json
```

## 🏃 Como Rodar

### Pré-requisitos

- Node.js 20+
- npm ou yarn
- Backend rodando (port 3001)

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Ambiente

Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite `.env.local`:

```env
VITE_API_URL=http://localhost:3001/api
```

### 3. Iniciar Dev Server

```bash
npm run dev
```

Acesse: `http://localhost:5173`

### 4. Build para Produção

```bash
npm run build
```

Os arquivos gerados estarão em `dist/`

## 🎨 Design System

### Cores (Dark Theme)

```css
/* Backgrounds */
--bg-primary: #121826      /* Azul-petróleo profundo */
--bg-secondary: #1A1D23    /* Cinza-azulado */
--bg-tertiary: #262B35     /* Lighter */

/* Accent Colors */
--purple: #7C3AED          /* Botões primários */
--blue: #3B82F6            /* Links, secondary */
--green: #10B981           /* Success */
--red: #EF4444             /* Error */
--yellow: #F59E0B          /* Warning */

/* Text */
--text-primary: #F3F4F6    /* Quase branco */
--text-secondary: #D1D5DB  /* Cinza claro */
--text-disabled: #6B7280   /* Cinza escuro */

/* Borders */
--border: #374151
--divider: #1F2937
```

### Tipografia

- **Font Family**: Geist Sans, Inter, Roboto
- **H1**: 28px / bold
- **H2**: 24px / semi-bold
- **H3**: 18px / semi-bold
- **Body Large**: 16px / normal
- **Body Regular**: 14px / normal
- **Body Small**: 12px / normal

### Espaçamento

Escala 4px (Tailwind):
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 20px
- 2xl: 24px
- 3xl: 32px

## 🗂️ State Management (Zustand)

### authStore

```typescript
{
  token: string | null
  user: User | null
  isLoading: boolean
  error: string | null

  login(email, password)
  register(email, password, name)
  logout()
  isAuthenticated()
}
```

### chartStore

```typescript
{
  currentChart: ChartConfig | null
  charts: ChartConfig[]
  isDirty: boolean

  loadCharts(userId)
  loadChart(chartId)
  createChart(name)
  updateSpec(spec)
  saveChart()
  deleteChart(chartId)
}
```

### galleryStore

```typescript
{
  items: GalleryItem[]
  isLoading: boolean

  loadGallery()
  cloneTemplate(itemId)
}
```

### uiStore

```typescript
{
  toasts: ToastMessage[]

  addToast(message, type)
  removeToast(id)
}
```

## 🎯 Features Principais

### Editor Visual

- Preview em tempo real com Vega-Lite
- Style Panel com controles visuais
- Suporte a múltiplos tipos de gráfico
- Customização de cores, opacidade, etc
- Export para JSON (Deneb)

### Dashboard

- Lista de gráficos do usuário
- Criar/Editar/Deletar
- Indicador de plano (Free/Premium)
- Modal de criação

### Galeria

- Templates públicos
- Busca e filtros
- Clone de templates
- Métricas de uso

### Autenticação

- Login/Register
- Protected routes
- JWT storage
- Auto-logout em 401

## 🔌 API Integration

### Configuração (services/api.ts)

```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Interceptor para JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)
```

## 🧪 Scripts Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Lint
npm run lint

# Type check
npm run type-check
```

## 🚢 Deploy (Vercel)

### Via Dashboard

1. Conecte repositório GitHub
2. Configure:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Environment Variables:
   ```
   VITE_API_URL=https://seu-backend.railway.app/api
   ```
4. Deploy!

### Via CLI

```bash
npm install -g vercel
vercel --prod
```

## 🎨 Componentes Reutilizáveis

### Toast

```tsx
import { useUIStore } from '@/stores/uiStore'

const { addToast } = useUIStore()
addToast('Salvo com sucesso!', 'success')
```

### Protected Route

```tsx
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

## 🐛 Troubleshooting

### Vega-Lite não renderiza

- Verifique se o spec JSON está válido
- Confira os dados de exemplo
- Veja console para erros

### API não conecta

- Verifique `VITE_API_URL` em `.env.local`
- Backend deve estar rodando
- CORS configurado corretamente

### Build falha

```bash
# Limpar cache
rm -rf node_modules dist
npm install
npm run build
```

## 📚 Recursos

- [React 19 Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vega-Lite](https://vega.github.io/vega-lite/)
- [Zustand](https://github.com/pmndrs/zustand)

## 📝 License

Proprietary - Todos os direitos reservados
