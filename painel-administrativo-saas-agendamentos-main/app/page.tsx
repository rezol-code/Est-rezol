"use client"

import { useState } from "react"
import { Building2, CalendarClock, MoreVertical, Plus, User } from "lucide-react"

import { AppointmentsTable } from "@/components/appointments-table"
import {
  CompanyRegistrationSheet,
  type NewCompany,
} from "@/components/company-registration-sheet"
import { CompaniesTable } from "@/components/companies-table"
import { StatCards } from "@/components/stat-cards"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { companies } from "@/lib/companies"

const NAV_TABS = [
  { value: "companies", label: "Empresas assinantes", icon: Building2 },
  { value: "appointments", label: "Agendamentos", icon: CalendarClock },
] as const

const CURRENT_USER = {
  name: "Ana Ribeiro",
  email: "ana@salaoglow.com.br",
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>("companies")
  const [menuOpen, setMenuOpen] = useState(false)
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [companyRows, setCompanyRows] = useState(companies)
  const [appointmentCompanyId, setAppointmentCompanyId] = useState(
    companies[0]?.id ?? "all"
  )

  function handleCreateCompany(company: NewCompany) {
    const initials = company.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("")

    setCompanyRows((current) => [
      { ...company, id: crypto.randomUUID(), initials },
      ...current,
    ])
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" aria-label="Abrir menu de navegação">
                    <MoreVertical />
                  </Button>
                }
              />
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle>Navegação</SheetTitle>
                </SheetHeader>
                <div className="flex items-center gap-3 px-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="size-5" />
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium text-foreground">
                      {CURRENT_USER.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {CURRENT_USER.email}
                    </span>
                  </div>
                </div>
                <Separator />
                <nav className="flex flex-col gap-1 px-2">
                  {NAV_TABS.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.value
                    return (
                      <Button
                        key={tab.value}
                        variant={isActive ? "secondary" : "ghost"}
                        className="justify-start"
                        onClick={() => {
                          setActiveTab(tab.value)
                          setMenuOpen(false)
                        }}
                      >
                        <Icon data-icon="inline-start" />
                        {tab.label}
                      </Button>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-sm font-medium text-foreground">
                {CURRENT_USER.name}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                Conectado
              </span>
            </div>
          </div>

        </div>
      </header>

      <div className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Painel de Agendamentos
            </h1>
            <p className="text-sm text-muted-foreground">
              Empresas assinantes e agendamentos de cada cliente.
            </p>
          </div>
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => setRegistrationOpen(true)}
          >
            <Plus data-icon="inline-start" />
            Cadastrar empresa
          </Button>
        </div>
      </div>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6">
        <StatCards companiesCount={companyRows.length} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-4">
          <TabsList className="hidden h-9 sm:inline-flex">
            <TabsTrigger value="companies" className="px-3">
              Empresas assinantes
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
