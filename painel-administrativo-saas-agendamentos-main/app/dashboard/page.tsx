"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Building2, CalendarClock, Home, Menu, Plus, User, X, ArrowRight } from "lucide-react"

import { AppointmentsTable } from "@/components/appointments-table"
import {
  CompanyRegistrationSheet,
  type NewCompany,
} from "@/components/company-registration-sheet"
import { CompaniesTable } from "@/components/companies-table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCompanies } from "@/hooks/use-companies"
import { useClients } from "@/hooks/use-clients"
import { useAppointments } from "@/hooks/use-appointments"
import type { Appointment, NewAppointment } from "@/lib/appointments"
import type { Client, NewClient } from "@/lib/clients"
import { APP_CONFIG } from "@/lib/config"

const NAV_TABS = [
  { value: "home", label: "Dashboard", icon: Home, href: "/" },
  { value: "companies", label: "Meus Clientes", icon: Building2 },
  { value: "appointments", label: "Agendamentos", icon: CalendarClock },
] as const

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>("companies")
  const [menuOpen, setMenuOpen] = useState(false)
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [appointmentCompanyId, setAppointmentCompanyId] = useState<string>("all")

  const { companies: companyRows, createCompany } = useCompanies()
  const { clients: clientRows, createClient } = useClients()
  const { appointments: appointmentRows, createAppointment } = useAppointments()

  useEffect(() => {
    if (companyRows.length > 0 && appointmentCompanyId === "all") {
      setAppointmentCompanyId(companyRows[0].id)
    }
  }, [companyRows, appointmentCompanyId])

  async function handleCreateCompany(company: NewCompany) {
    try {
      await createCompany(company)
    } catch (error) {
      console.error("Erro ao criar empresa:", error)
      alert("Erro ao criar empresa. Tente novamente.")
    }
  }

  async function handleCreateAppointment(client: NewClient, appointment: NewAppointment) {
    try {
      const newClient = await createClient(client)
      const appointmentWithClientId = {
        ...appointment,
        clientId: newClient.id,
      }
      await createAppointment(appointmentWithClientId)
    } catch (error) {
      console.error("Erro ao criar agendamento:", error)
      alert("Erro ao criar agendamento. Tente novamente.")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-card/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="size-4" aria-hidden="true" />
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg bg-primary/10 text-primary hover:bg-primary/15"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menu de navegação"
            >
              <Menu />
            </Button>

            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-sm font-medium text-foreground">
                {APP_CONFIG.currentUser.name}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                Conectado
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* Menu Pop-up */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setMenuOpen(false)}>
          <div 
            className="bg-card rounded-lg shadow-xl border border-border p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{APP_CONFIG.currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{APP_CONFIG.currentUser.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
              >
                <X className="size-5" />
              </Button>
            </div>
            
            <nav className="space-y-2">
              {NAV_TABS.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.value
                if (tab.href) {
                  return (
                    <Button
                      key={tab.value}
                      variant="ghost"
                      className="w-full justify-start h-12 hover:bg-primary/10"
                      asChild
                    >
                      <a href={tab.href}>
                        <Icon className="size-5 mr-3" />
                        {tab.label}
                        <ArrowRight className="ml-auto size-4" />
                      </a>
                    </Button>
                  )
                }
                return (
                  <Button
                    key={tab.value}
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start h-12 hover:bg-primary/10"
                    onClick={() => {
                      setActiveTab(tab.value)
                      setMenuOpen(false)
                    }}
                  >
                    <Icon className="size-5 mr-3" />
                    {tab.label}
                    {isActive && <ArrowRight className="ml-auto size-4" />}
                  </Button>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      <div className="border-b border-border/70 bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <a href="/">
                <Home className="size-5" />
              </a>
            </Button>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Building2 className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold text-foreground">
                Painel Administrativo
              </h1>
            </div>
          </div>
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => setRegistrationOpen(true)}
          >
            <Plus data-icon="inline-start" />
            Cadastrar cliente
          </Button>
        </div>
      </div>

      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-4">
          <TabsList className="hidden h-9 sm:inline-flex">
            <TabsTrigger value="companies" className="px-3">
              Meus Clientes
            </TabsTrigger>
            <TabsTrigger value="appointments" className="px-3">
              Agendamentos
            </TabsTrigger>
          </TabsList>
          <TabsContent value="companies">
            <CompaniesTable
              companies={companyRows}
              onViewAppointments={(companyId) => {
                setAppointmentCompanyId(companyId)
                setActiveTab("appointments")
              }}
            />
          </TabsContent>
          <TabsContent value="appointments">
            <AppointmentsTable
              key={appointmentCompanyId}
              initialCompanyId={appointmentCompanyId}
              companyOptions={companyRows}
              clientOptions={clientRows}
              appointmentOptions={appointmentRows}
              onCreateAppointment={handleCreateAppointment}
            />
          </TabsContent>
        </Tabs>
      </main>
      <CompanyRegistrationSheet
        open={registrationOpen}
        onOpenChange={setRegistrationOpen}
        onSubmit={handleCreateCompany}
      />
    </div>
  )
}