export type Client = {
  id: string
  companyId: string
  name: string
  initials: string
  whatsapp: string
}

export type NewClient = Omit<Client, "id" | "initials">

export const clients: Client[] = []

export function getClient(id: string) {
  return clients.find((client) => client.id === id)
}

export function getClientsByCompany(companyId: string) {
  return clients.filter((client) => client.companyId === companyId)
}
