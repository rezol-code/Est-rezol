# Painel Administrativo SaaS

Sistema de gestão de agendamentos e empresas assinantes para SaaS.

## 🚀 Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **@base-ui/react** - Componentes UI
- **lucide-react** - Ícones

## 📁 Estrutura do Projeto

```
painel-administrativo-saas-agendamentos-main/
├── app/                      # Rotas Next.js
│   ├── dashboard/           # Painel administrativo
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página inicial (home)
│   └── globals.css          # Estilos globais
├── components/              # Componentes React
│   ├── ui/                  # Componentes UI base
│   ├── appointments-table.tsx
│   ├── companies-table.tsx
│   └── company-registration-sheet.tsx
├── hooks/                   # Custom hooks
│   ├── use-companies.ts
│   ├── use-clients.ts
│   └── use-appointments.ts
├── lib/                     # Utilitários e tipos
│   ├── config.ts            # Configurações globais
│   ├── companies.ts         # Tipos e funções de empresas
│   ├── clients.ts           # Tipos e funções de clientes
│   ├── appointments.ts      # Tipos e funções de agendamentos
│   ├── date-utils.ts        # Utilitários de data
│   └── utils.ts             # Utilitários gerais
└── package.json             # Dependências
```

## 🔧 Configuração

Todas as configurações estão centralizadas em `lib/config.ts`:

```typescript
export const APP_CONFIG = {
  name: 'Painel Administrativo',
  version: '1.0.0',
  currentUser: {
    name: 'Administração',
    email: 'admin@exemplo.com.br',
  },
  // ... outras configurações
}
```

## 📡 Rotas

- `/` - Página inicial com atalhos
- `/dashboard?tab=companies` - Gestão de empresas (seus clientes)
- `/dashboard?tab=appointments` - Gestão de agendamentos

## 🏗️ Tipos de Dados

### Company (Empresa)
Representa as empresas que são seus clientes.

```typescript
type Company = {
  id: string
  name: string
  initials: string
  ownerName: string
  ownerCpf: string
  ownerBirthDate: string
  businessType: string
  whatsapp: string
  products: string[]
  operatingDays: string
  operatingHours: string
  subscriptionDay: number
  subscriptionValue: number
  subscriptionStatus: "Em dia" | "Pendente"
}
```

### Client (Cliente Final)
Representa os clientes finais das empresas.

```typescript
type Client = {
  id: string
  companyId: string
  name: string
  initials: string
  whatsapp: string
}
```

### Appointment (Agendamento)
Representa os agendamentos dos clientes finais.

```typescript
type Appointment = {
  id: string
  clientId: string
  service: string
  date: string
  time: string
  status: "Confirmado" | "Pendente"
}
```

## 🎨 Personalização

### Cores
As cores do tema são definidas em `app/globals.css` nos `:root` e `.dark`.

### Componentes
Os componentes podem ser personalizados através das props disponíveis.

## 📝 Scripts

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm run start

# Testes
npm run test

# Typecheck
npm run typecheck
```

## 🔒 Segurança

- Nenhum dado sensível deve ser commitado
- Use variáveis de ambiente para configurações sensíveis
- Valide todos os dados de entrada no backend

## 📄 Licença

Este projeto é proprietário.