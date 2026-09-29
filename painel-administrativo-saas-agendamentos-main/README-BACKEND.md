# Backend e Persistência de Dados - Documentação

## Melhorias Implementadas

### 1. API Routes Next.js

Criei uma estrutura completa de API routes seguindo o padrão do Next.js App Router:

#### Empresas (`/api/companies`)
- `GET /api/companies` - Lista todas as empresas
- `POST /api/companies` - Cria nova empresa
- `GET /api/companies/[id]` - Busca empresa específica
- `PUT /api/companies/[id]` - Atualiza empresa
- `DELETE /api/companies/[id]` - Deleta empresa

#### Clientes (`/api/clients`)
- `GET /api/clients` - Lista todos os clientes (com filtro opcional por empresa)
- `POST /api/clients` - Cria novo cliente
- `GET /api/clients/[id]` - Busca cliente específico
- `PUT /api/clients/[id]` - Atualiza cliente
- `DELETE /api/clients/[id]` - Deleta cliente

#### Agendamentos (`/api/appointments`)
- `GET /api/appointments` - Lista todos os agendamentos (com filtros opcionais)
- `POST /api/appointments` - Cria novo agendamento
- `GET /api/appointments/[id]` - Busca agendamento específico
- `PUT /api/appointments/[id]` - Atualiza agendamento
- `DELETE /api/appointments/[id]` - Deleta agendamento

### 2. Sistema de Persistência

Implementei armazenamento em arquivos JSON localmente:

- **Localização**: `data/` (na raiz do projeto)
- **Arquivos**:
  - `data/companies.json` - Dados das empresas
  - `data/clients.json` - Dados dos clientes
  - `data/appointments.json` - Dados dos agendamentos

- **Funcionalidades**:
  - Criação automática do diretório `data/`
  - Criação automática dos arquivos JSON se não existirem
  - Manipulação de erros robusta
  - Tipagem TypeScript completa

### 3. Custom Hooks React

Criei hooks customizados para facilitar a integração do frontend com a API:

#### `useCompanies()`
- Gerencia estado de empresas
- Fornece funções CRUD
- Loading states e error handling
- Auto-refresh ao montar o componente

#### `useClients(companyId?)`
- Gerencia estado de clientes
- Filtro opcional por empresa
- Fornece funções CRUD
- Loading states e error handling

#### `useAppointments(companyId?, clientId?)`
- Gerencia estado de agendamentos
- Filtros opcionais por empresa e cliente
- Fornece funções CRUD
- Loading states e error handling

### 4. Atualizações no Frontend

#### `app/page.tsx`
- Substituído arrays em memória por hooks customizados
- Integrado com API real
- Melhorado error handling
- Estado inicial carregado da API

#### `components/appointments-table.tsx`
- Integrado cancelamento de agendamentos com API
- Integrado reagendamento com API
- Removida dependência de dados estáticos
- Melhorado feedback visual de erros

#### `components/company-registration-sheet.tsx`
- Ajustado para usar tipos exportados do `lib/companies.ts`
- Mantida funcionalidade de criação de empresas

### 5. Tipos TypeScript

#### Adicionados novos tipos:
- `NewCompany` - Empresa sem ID e iniciais
- `NewClient` - Cliente sem ID e iniciais
- `NewAppointment` - Agendamento sem ID

### 6. Configurações

#### `.gitignore`
- Adicionado `data/` para não commitar dados locais
- Mantido para evitar conflitos entre ambientes

## Como Testar

### 1. Iniciar o servidor de desenvolvimento
```bash
npm run dev
# ou
pnpm dev
```

### 2. Acessar a aplicação
Abra `http://localhost:3000` no navegador

### 3. Testar funcionalidades:
- **Criar empresa**: Use o botão "Cadastrar empresa"
- **Ver empresas**: Veja a tabela de empresas assinantes
- **Criar agendamento**: Vá para a aba "Agendamentos" e clique em "Novo agendamento"
- **Ver persistência**: Recarregue a página e veja que os dados continuam lá
- **Ver arquivos JSON**: Verifique a pasta `data/` para ver os arquivos criados

## Estrutura de Arquivos Criados

```
app/api/
├── companies/
│   ├── route.ts
│   └── [id]/route.ts
├── clients/
│   ├── route.ts
│   └── [id]/route.ts
└── appointments/
    ├── route.ts
    └── [id]/route.ts

hooks/
├── use-companies.ts
├── use-clients.ts
└── use-appointments.ts

lib/
└── data-storage.ts

data/ (criado automaticamente)
├── companies.json
├── clients.json
└── appointments.json
```

## Próximos Passos Sugeridos

1. **Autenticação**: Implementar NextAuth.js ou similar
2. **Validação**: Adicionar validação de schemas (Zod)
3. **Banco de Dados**: Migrar para PostgreSQL/MongoDB
4. **API Rate Limiting**: Adicionar limites de taxa
5. **Error Logging**: Implementar sistema de logs
6. **Testes**: Adicionar testes de integração
7. **Deploy**: Configurar ambiente de produção

## Notas Importantes

- Os dados são persistidos localmente em arquivos JSON
- A pasta `data/` não é versionada no Git
- Para produção, considere usar um banco de dados real
- A API está pronta para ser migrada para backend separado se necessário
- Os hooks fornecem uma interface limpa para o frontend