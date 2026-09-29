export type SubscriptionStatus = "Em dia" | "Pendente"

export type Company = {
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
  subscriptionStatus: SubscriptionStatus
}

export type NewCompany = Omit<Company, "id" | "initials">

export const companies: Company[] = []

export function getCompany(id: string) {
  return companies.find((client) => client.id === id)
}

export function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}
