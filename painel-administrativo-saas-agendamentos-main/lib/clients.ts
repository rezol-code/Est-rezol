export type Client = {
  id: string
  companyId: string
  name: string
  initials: string
  whatsapp: string
}

export const clients: Client[] = [
  {
    id: "cl-1",
    companyId: "co-1",
    name: "Juliana Martins",
    initials: "JM",
    whatsapp: "(11) 99111-2200",
  },
  {
    id: "cl-2",
    companyId: "co-1",
    name: "Paulo Henrique Dias",
    initials: "PH",
    whatsapp: "(11) 99222-3300",
  },
  {
    id: "cl-3",
    companyId: "co-1",
    name: "Eduardo Pires",
    initials: "EP",
    whatsapp: "(11) 99333-4400",
  },
  {
    id: "cl-4",
    companyId: "co-2",
    name: "Diego Almeida",
    initials: "DA",
    whatsapp: "(21) 98811-5500",
  },
  {
    id: "cl-5",
    companyId: "co-3",
    name: "Camila Borges",
    initials: "CB",
    whatsapp: "(31) 98700-6600",
  },
  {
    id: "cl-6",
    companyId: "co-3",
    name: "Rita de Cássia",
    initials: "RC",
    whatsapp: "(31) 98600-7700",
  },
  {
    id: "cl-7",
    companyId: "co-4",
    name: "Henrique Lopes",
    initials: "HL",
    whatsapp: "(41) 98500-8800",
  },
  {
    id: "cl-8",
    companyId: "co-5",
    name: "Sofia Martins",
    initials: "SM",
    whatsapp: "(51) 98400-9900",
  },
  {
    id: "cl-9",
    companyId: "co-6",
    name: "Lucas Ferreira",
    initials: "LF",
    whatsapp: "(11) 98300-1010",
  },
  {
    id: "cl-10",
    companyId: "co-7",
    name: "Patricia Gomes",
    initials: "PG",
    whatsapp: "(85) 98200-2020",
  },
]

export function getClient(id: string) {
  return clients.find((client) => client.id === id)
}

export function getClientsByCompany(companyId: string) {
  return clients.filter((client) => client.companyId === companyId)
}
