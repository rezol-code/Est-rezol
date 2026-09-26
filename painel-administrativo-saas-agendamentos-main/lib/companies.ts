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

export const companies: Company[] = [
  {
    id: "co-1",
    name: "Salão Glow",
    initials: "SG",
    ownerName: "Mariana Ribeiro",
    ownerCpf: "123.456.789-00",
    ownerBirthDate: "14/03/1990",
    businessType: "Salão de Beleza",
    whatsapp: "(11) 98123-4567",
    products: ["Corte", "Escova", "Coloração", "Hidratação"],
    operatingDays: "Segunda a Sábado",
    operatingHours: "09:00 - 19:00",
    subscriptionDay: 5,
    subscriptionValue: 149.9,
    subscriptionStatus: "Em dia",
  },
  {
    id: "co-2",
    name: "Barbearia Souza",
    initials: "BS",
    ownerName: "Carlos Eduardo Souza",
    ownerCpf: "987.654.321-11",
    ownerBirthDate: "02/11/1985",
    businessType: "Barbearia",
    whatsapp: "(21) 99456-7788",
    products: ["Barba", "Corte Masculino", "Pigmentação"],
    operatingDays: "Terça a Domingo",
    operatingHours: "10:00 - 20:00",
    subscriptionDay: 10,
    subscriptionValue: 99.9,
    subscriptionStatus: "Pendente",
  },
  {
    id: "co-3",
    name: "Studio Luna Unhas",
    initials: "LU",
    ownerName: "Fernanda Lima",
    ownerCpf: "456.123.789-22",
    ownerBirthDate: "28/07/1993",
    businessType: "Studio de Unhas",
    whatsapp: "(31) 98765-1122",
    products: ["Manicure", "Pedicure", "Alongamento", "Nail Art"],
    operatingDays: "Segunda a Sexta",
    operatingHours: "08:30 - 18:00",
    subscriptionDay: 1,
    subscriptionValue: 129.9,
    subscriptionStatus: "Em dia",
  },
  {
    id: "co-4",
    name: "Clínica Vital Masso",
    initials: "VM",
    ownerName: "João Pedro Alves",
    ownerCpf: "321.789.456-33",
    ownerBirthDate: "19/05/1988",
    businessType: "Clínica de Massoterapia",
    whatsapp: "(41) 99123-8899",
    products: ["Massagem Relaxante", "Drenagem Linfática", "Shiatsu"],
    operatingDays: "Segunda a Sábado",
    operatingHours: "09:00 - 21:00",
    subscriptionDay: 15,
    subscriptionValue: 199.9,
    subscriptionStatus: "Em dia",
  },
  {
    id: "co-5",
    name: "Studio Bella Sobrancelhas",
    initials: "BE",
    ownerName: "Beatriz Carvalho",
    ownerCpf: "789.456.123-44",
    ownerBirthDate: "07/01/1996",
    businessType: "Studio de Sobrancelhas",
    whatsapp: "(51) 98333-4545",
    products: ["Design de Sobrancelhas", "Henna", "Micropigmentação"],
    operatingDays: "Terça a Sábado",
    operatingHours: "10:00 - 19:00",
    subscriptionDay: 20,
    subscriptionValue: 89.9,
    subscriptionStatus: "Pendente",
  },
  {
    id: "co-6",
    name: "Barbearia Monteiro",
    initials: "BM",
    ownerName: "Rafael Monteiro",
    ownerCpf: "654.321.987-55",
    ownerBirthDate: "23/09/1991",
    businessType: "Barbearia",
    whatsapp: "(11) 97788-1010",
    products: ["Corte Masculino", "Barba", "Sobrancelha"],
    operatingDays: "Segunda a Sábado",
    operatingHours: "09:00 - 20:00",
    subscriptionDay: 8,
    subscriptionValue: 99.9,
    subscriptionStatus: "Em dia",
  },
  {
    id: "co-7",
    name: "Salão Aline Color",
    initials: "AC",
    ownerName: "Aline Nogueira",
    ownerCpf: "147.258.369-66",
    ownerBirthDate: "11/12/1994",
    businessType: "Salão de Beleza",
    whatsapp: "(85) 98555-2323",
    products: ["Coloração", "Corte", "Progressiva", "Penteado"],
    operatingDays: "Segunda a Domingo",
    operatingHours: "08:00 - 22:00",
    subscriptionDay: 25,
    subscriptionValue: 179.9,
    subscriptionStatus: "Em dia",
  },
]

export function getCompany(id: string) {
  return companies.find((company) => company.id === id)
}

export function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}
