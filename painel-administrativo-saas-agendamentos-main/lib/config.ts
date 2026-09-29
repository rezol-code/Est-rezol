// Configurações globais do sistema
export const APP_CONFIG = {
  name: 'Painel Administrativo',
  version: '1.0.0',
  description: 'Sistema de gestão de agendamentos',
  
  // Configurações de usuário
  currentUser: {
    name: 'Administração',
    email: 'admin@exemplo.com.br',
  },
  
  // Configurações de API
  api: {
    baseUrl: '/api',
    timeout: 30000,
  },
  
  // Configurações de UI
  ui: {
    pageSize: 20,
    maxItems: 100,
  },
  
  // Configurações de data
  timeZone: 'America/Sao_Paulo',
  dateFormat: 'pt-BR',
} as const

// Configurações de validação
export const VALIDATION_CONFIG = {
  company: {
    name: { minLength: 2, maxLength: 100 },
    ownerName: { minLength: 3, maxLength: 100 },
    ownerCpf: { pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/ },
    whatsapp: { pattern: /^\+?\d{10,15}$/ },
    subscriptionValue: { min: 0.01, max: 100000 },
  },
  client: {
    name: { minLength: 2, maxLength: 100 },
    whatsapp: { pattern: /^\+?\d{10,15}$/ },
  },
  appointment: {
    service: { minLength: 2, maxLength: 100 },
    time: { pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/ },
  },
} as const