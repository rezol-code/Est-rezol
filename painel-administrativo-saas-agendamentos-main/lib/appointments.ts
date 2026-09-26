import { clients, getClient } from "@/lib/clients"
import { companies, getCompany } from "@/lib/companies"
import { addDaysToIsoDate, formatDatePtBr, getTodayIsoDate } from "@/lib/date-utils"

export type AppointmentStatus = "Confirmado" | "Pendente"

export type Appointment = {
  id: string
  clientId: string
  service: string
  date: string
  time: string
  status: AppointmentStatus
}

export type AppointmentView = Appointment & {
  clientName: string
  clientInitials: string
  clientWhatsapp: string
  companyId: string
  companyName: string
}

export const TODAY = getTodayIsoDate()
const TOMORROW = addDaysToIsoDate(TODAY, 1)
const DAY_AFTER_TOMORROW = addDaysToIsoDate(TODAY, 2)

export const appointments: Appointment[] = [
  {
    id: "ap-1",
    clientId: "cl-1",
    service: "Corte + Escova",
    date: TODAY,
    time: "09:30",
    status: "Confirmado",
  },
  {
    id: "ap-2",
    clientId: "cl-1",
    service: "Hidratação",
    date: TOMORROW,
    time: "14:00",
    status: "Pendente",
  },
  {
    id: "ap-3",
    clientId: "cl-2",
    service: "Barba e Cabelo",
    date: TODAY,
    time: "10:15",
    status: "Pendente",
  },
  {
    id: "ap-4",
    clientId: "cl-3",
    service: "Coloração",
    date: TODAY,
    time: "16:00",
    status: "Confirmado",
  },
  {
    id: "ap-5",
    clientId: "cl-3",
    service: "Corte Masculino",
    date: DAY_AFTER_TOMORROW,
    time: "11:30",
    status: "Pendente",
  },
  {
    id: "ap-6",
    clientId: "cl-4",
    service: "Barba",
    date: TODAY,
    time: "11:00",
    status: "Confirmado",
  },
  {
    id: "ap-7",
    clientId: "cl-4",
    service: "Corte Masculino",
    date: TOMORROW,
    time: "09:00",
    status: "Confirmado",
  },
  {
    id: "ap-8",
    clientId: "cl-5",
    service: "Manicure",
    date: TODAY,
    time: "13:00",
    status: "Confirmado",
  },
  {
    id: "ap-9",
    clientId: "cl-6",
    service: "Alongamento",
    date: TOMORROW,
    time: "15:30",
    status: "Pendente",
  },
  {
    id: "ap-10",
    clientId: "cl-7",
    service: "Massagem Relaxante",
    date: TODAY,
    time: "14:00",
    status: "Pendente",
  },
  {
    id: "ap-11",
    clientId: "cl-8",
    service: "Design de Sobrancelhas",
    date: TOMORROW,
    time: "09:00",
    status: "Confirmado",
  },
  {
    id: "ap-12",
    clientId: "cl-9",
    service: "Corte Masculino",
    date: TODAY,
    time: "17:00",
    status: "Confirmado",
  },
  {
    id: "ap-13",
    clientId: "cl-10",
    service: "Coloração",
    date: TODAY,
    time: "18:00",
    status: "Pendente",
  },
]

export function toAppointmentView(item: Appointment): AppointmentView | null {
  const client = getClient(item.clientId)
  if (!client) return null
  const company = getCompany(client.companyId)
  if (!company) return null

  return {
    ...item,
    clientName: client.name,
    clientInitials: client.initials,
    clientWhatsapp: client.whatsapp,
    companyId: company.id,
    companyName: company.name,
  }
}

export function getAppointmentViews(items = appointments) {
  return items
    .map(toAppointmentView)
    .filter((item): item is AppointmentView => item !== null)
}

export function filterAppointments(filters: {
  companyId?: string
  clientId?: string
}) {
  return getAppointmentViews().filter((item) => {
    if (filters.companyId && item.companyId !== filters.companyId) return false
    if (filters.clientId && item.clientId !== filters.clientId) return false
    return true
  })
}

const todayCount = appointments.filter((item) => item.date === TODAY).length

export const stats = [
  {
    key: "companies",
    label: "Empresas Assinantes",
    value: String(companies.length),
    hint: `${companies.filter((c) => c.subscriptionStatus === "Em dia").length} com assinatura em dia`,
  },
  {
    key: "clients",
    label: "Clientes",
    value: String(clients.length),
    hint: "Clientes finais das empresas",
  },
  {
    key: "today",
    label: "Agendamentos Hoje",
    value: String(todayCount),
    hint: formatDatePtBr(TODAY),
  },
] as const
