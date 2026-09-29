import { describe, expect, it } from "vitest"

import { filterAppointments } from "./appointments"
import { appointments, type Appointment } from "./appointments"
import { clients, type Client } from "./clients"
import { companies, type Company } from "./companies"

const company: Company = {
  id: "company-1",
  name: "Empresa Teste",
  initials: "ET",
  ownerName: "Responsável Teste",
  ownerCpf: "00000000000",
  ownerBirthDate: "01/01/1990",
  businessType: "Serviços",
  whatsapp: "11999999999",
  products: ["Consulta"],
  operatingDays: "Segunda a Sexta",
  operatingHours: "09:00 - 18:00",
  subscriptionDay: 1,
  subscriptionValue: 100,
  subscriptionStatus: "Em dia",
}

const client: Client = {
  id: "client-1",
  companyId: company.id,
  name: "Cliente Teste",
  initials: "CT",
  whatsapp: "11988888888",
}

const appointment: Appointment = {
  id: "appointment-1",
  clientId: client.id,
  service: "Consulta",
  date: "2026-09-27",
  time: "10:00",
  status: "Confirmado",
}

describe("filterAppointments", () => {
  it("starts with clean company, client, and appointment tables", () => {
    expect(companies).toEqual([])
    expect(clients).toEqual([])
    expect(appointments).toEqual([])
  })

  it("returns an empty list when there are no records", () => {
    expect(filterAppointments({}, [], [], [])).toEqual([])
  })

  it("joins provided appointments, clients, and companies", () => {
    expect(filterAppointments({}, [appointment], [client], [company])).toMatchObject([
      {
        id: appointment.id,
        clientName: client.name,
        companyId: company.id,
        companyName: company.name,
      },
    ])
  })
})