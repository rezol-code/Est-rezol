"use client"

import { useMemo, useState } from "react"
import { CalendarClock, MessageSquareText, Pencil, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  filterAppointments,
  type AppointmentView,
} from "@/lib/appointments"
import { formatDatePtBr } from "@/lib/date-utils"
import { clients, getClientsByCompany } from "@/lib/clients"
import { companies, type Company } from "@/lib/companies"

const ALL = "all"

function groupByClient(items: AppointmentView[]) {
  const groups: {
    clientId: string
    clientName: string
    companyName: string
    appointments: AppointmentView[]
  }[] = []

  for (const item of items) {
    const existing = groups.find((group) => group.clientId === item.clientId)
    if (existing) {
      existing.appointments.push(item)
    } else {
      groups.push({
        clientId: item.clientId,
        clientName: item.clientName,
        companyName: item.companyName,
        appointments: [item],
      })
    }
  }

  return groups
}

export function AppointmentsTable({
  initialCompanyId = companies[0]?.id ?? ALL,
  companyOptions = companies,
}: {
  initialCompanyId?: string
  companyOptions?: Company[]
}) {
  const [companyId, setCompanyId] = useState(initialCompanyId)
  const [clientId, setClientId] = useState(ALL)
  const [cancelledIds, setCancelledIds] = useState<string[]>([])
  const [rescheduling, setRescheduling] = useState<AppointmentView | null>(null)
  const [rescheduledValues, setRescheduledValues] = useState<
    Record<string, { date: string; time: string }>
  >({})
  const [feedback, setFeedback] = useState("")

  const companyClients = useMemo(() => {
    if (companyId === ALL) return clients
    return getClientsByCompany(companyId)
  }, [companyId])

  const views = useMemo(() => {
    const selectedClient =
      clientId !== ALL && companyClients.some((c) => c.id === clientId)
        ? clientId
        : undefined

    return filterAppointments({
      companyId: companyId === ALL ? undefined : companyId,
      clientId: selectedClient,
    })
      .filter((item) => !cancelledIds.includes(item.id))
      .map((item) => ({ ...item, ...rescheduledValues[item.id] }))
  }, [cancelledIds, clientId, companyId, companyClients, rescheduledValues])

  const groups = useMemo(() => groupByClient(views), [views])
  const selectedClient = companyClients.find((client) => client.id === clientId)
  const showGroupHeaders = !selectedClient

  const title = selectedClient
    ? `Agendamentos de ${selectedClient.name}`
    : "Agendamentos por cliente"

  const description = selectedClient
    ? `Horários deste cliente${companyId !== ALL ? ` em ${companies.find((c) => c.id === companyId)?.name}` : ""}.`
    : "Escolha a empresa e o cliente para ver só os horários daquela pessoa, ou deixe em todos para ver cada cliente agrupado."

  function handleCancel(item: AppointmentView) {
    if (!window.confirm(`Cancelar o agendamento de ${item.clientName}?`)) return

    setCancelledIds((current) => [...current, item.id])
    setFeedback(`Agendamento de ${item.clientName} cancelado.`)
  }

  function handleReschedule(item: AppointmentView) {
    setRescheduling(item)
    setFeedback("")
  }

  function handleRescheduleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!rescheduling) return

    const formData = new FormData(event.currentTarget)
    const date = String(formData.get("date"))
    const time = String(formData.get("time"))
    setRescheduledValues((current) => ({
      ...current,
      [rescheduling.id]: { date, time },
    }))
    setFeedback(`Agendamento de ${rescheduling.clientName} reagendado.`)
    setRescheduling(null)
  }

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b py-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <label className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Empresa assinante
            </span>
            <select
              value={companyId}
              onChange={(event) => {
                setCompanyId(event.target.value)
                setClientId(ALL)
              }}
              className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value={ALL}>Todas as empresas</option>
              {companyOptions.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Cliente
            </span>
            <select
              value={
                companyClients.some((client) => client.id === clientId)
                  ? clientId
                  : ALL
              }
              onChange={(event) => setClientId(event.target.value)}
              className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value={ALL}>Todos os clientes</option>
              {companyClients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </CardHeader>
      {feedback ? (
        <p className="border-b px-4 py-3 text-sm text-emerald-700" role="status">
          {feedback}
        </p>
      ) : null}
      {views.length === 0 ? (
        <p className="px-4 py-8 text-sm text-muted-foreground">
          Nenhum agendamento para este filtro.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {selectedClient ? null : (
                <TableHead className="px-4">Cliente</TableHead>
              )}
              <TableHead className={selectedClient ? "px-4" : undefined}>
                Empresa
              </TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="px-4 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <ClientAppointmentRows
                key={group.clientId}
                group={group}
                showClientColumn={!selectedClient}
                showGroupHeader={showGroupHeaders}
                onCancel={handleCancel}
                onReschedule={handleReschedule}
              />
            ))}
          </TableBody>
        </Table>
      )}
      <div className="flex items-center gap-2 border-t px-4 py-3 text-xs text-muted-foreground">
        <MessageSquareText className="size-3.5" aria-hidden="true" />
        Confirmações são enviadas automaticamente via WhatsApp.
      </div>
      <Sheet
        open={rescheduling !== null}
        onOpenChange={(open) => !open && setRescheduling(null)}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Reagendar atendimento</SheetTitle>
            <SheetDescription>
              {rescheduling
                ? `Atualize o horário de ${rescheduling.clientName}.`
                : "Atualize o horário do atendimento."}
            </SheetDescription>
          </SheetHeader>
          {rescheduling ? (
            <form
              className="flex flex-col gap-4 px-4"
              onSubmit={handleRescheduleSubmit}
            >
              <label className="flex flex-col gap-1 text-sm font-medium">
                Data
                <input
                  name="date"
                  type="date"
                  defaultValue={rescheduling.date}
                  required
                  className="h-9 rounded-lg border border-input bg-background px-3 font-normal outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Horário
                <input
                  name="time"
                  type="time"
                  defaultValue={rescheduling.time}
                  required
                  className="h-9 rounded-lg border border-input bg-background px-3 font-normal outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </label>
              <Button type="submit">Salvar novo horário</Button>
            </form>
          ) : null}
        </SheetContent>
      </Sheet>
    </Card>
  )
}

function ClientAppointmentRows({
  group,
  showClientColumn,
  showGroupHeader,
  onCancel,
  onReschedule,
}: {
  group: {
    clientId: string
    clientName: string
    companyName: string
    appointments: AppointmentView[]
  }
  showClientColumn: boolean
  showGroupHeader: boolean
  onCancel: (item: AppointmentView) => void
  onReschedule: (item: AppointmentView) => void
}) {
  const colSpan = showClientColumn ? 6 : 5

  return (
    <>
      {showGroupHeader ? (
        <TableRow className="hover:bg-transparent">
          <TableCell
            colSpan={colSpan}
            className="bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground"
          >
            {group.clientName}
            <span className="font-normal">
              {" "}
              · {group.companyName} · {group.appointments.length}{" "}
              {group.appointments.length === 1
                ? "agendamento"
                : "agendamentos"}
            </span>
          </TableCell>
        </TableRow>
      ) : null}
      {group.appointments.map((item) => (
        <TableRow key={item.id}>
          {showClientColumn ? (
            <TableCell className="px-4">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                  {item.clientInitials}
                </span>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">
                    {item.clientName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.clientWhatsapp}
                  </span>
                </div>
              </div>
            </TableCell>
          ) : null}
          <TableCell className={showClientColumn ? undefined : "px-4"}>
            {item.companyName}
          </TableCell>
          <TableCell>{item.service}</TableCell>
          <TableCell className="text-muted-foreground">
            <div className="flex flex-col">
              <span className="text-foreground">
                {formatDatePtBr(item.date)}
              </span>
              <span className="text-xs">{item.time}</span>
            </div>
          </TableCell>
          <TableCell>
            <Badge
              variant={item.status === "Confirmado" ? "secondary" : "outline"}
              className={
                item.status === "Confirmado"
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                  : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
              }
            >
              {item.status}
            </Badge>
          </TableCell>
          <TableCell className="px-4">
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label={`Reagendar ${item.clientName}`}
                title="Reagendar"
                onClick={() => onReschedule(item)}
              >
                <Pencil />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                aria-label={`Cancelar agendamento de ${item.clientName}`}
                title="Cancelar"
                onClick={() => onCancel(item)}
              >
                <X />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
