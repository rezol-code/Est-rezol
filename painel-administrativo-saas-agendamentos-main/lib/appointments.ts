import { clients } from "./clients"
import { companies } from "./companies"
import { addDaysToIsoDate, formatDatePtBr, getTodayIsoDate } from "./date-utils"

export type AppointmentStatus = "Confirmado" | "Pendente"

export type Appointment = {
  id: string
  clientId: string
  service: string
  date: string
  time: string
  status: AppointmentStatus
}

export type NewAppointment = Omit<Appointment, "id">

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

export const appointments: Appointment[] = []

export function toAppointmentView(
  item: Appointment,
  clientRecords = clients,
  companyRecords = companies
): AppointmentView | null {
  const client = clientRecords.find((record) => record.id === item.clientId)
  if (!client) return null
  const company = companyRecords.find((record) => record.id === client.companyId)
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

export function getAppointmentViews(
  items = appointments,
  clientRecords = clients,
  companyRecords = companies
) {
  return items
    .map((item) => toAppointmentView(item, clientRecords, companyRecords))
    .filter((item): item is AppointmentView => item !== null)
}

export function filterAppointments(filters: {
  companyId?: string
  clientId?: string
}, items = appointments, clientRecords = clients, companyRecords = companies) {
  return getAppointmentViews(items, clientRecords, companyRecords).filter((item) => {
    if (filters.companyId && item.companyId !== filters.companyId) return false
    if (filters.clientId && item.clientId !== filters.clientId) return false
    return true
  })
}

