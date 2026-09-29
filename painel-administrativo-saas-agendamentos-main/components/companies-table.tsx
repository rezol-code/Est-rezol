"use client"

import { useState, type ComponentType } from "react"
import {
  Briefcase,
  Building2,
  Cake,
  CalendarDays,
  Clock,
  CreditCard,
  IdCard,
  Package,
  Phone,
  User,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
  formatCurrency,
  type Company,
} from "@/lib/companies"

function statusClass(status: Company["subscriptionStatus"]) {
  return status === "Em dia"
    ? "border-transparent bg-chart-1/10 text-chart-1"
    : "border-transparent bg-accent text-accent-foreground"
}

export function CompaniesTable({
  companies,
  onViewAppointments,
}: {
  companies: Company[]
  onViewAppointments?: (companyId: string) => void
}) {
  const [selected, setSelected] = useState<Company | null>(null)

  return (
    <>
      <Card className="gap-0 py-0">
        <CardHeader className="border-b py-4">
          <CardTitle>Meus Clientes</CardTitle>
          <CardDescription>
            Empresas que contratam seus serviços. Abra os detalhes para ver
            cadastro, funcionamento e assinatura.
          </CardDescription>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/55 hover:bg-secondary/55">
              <TableHead className="px-4">Cliente</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Mensalidade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="px-4 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-36 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Building2 className="mb-1 size-5 text-primary" aria-hidden="true" />
                    <span className="font-medium text-foreground">
                      Nenhum cliente cadastrado
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Use "Cadastrar cliente" para iniciar.
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="px-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                        {company.initials}
                      </span>
                      <span className="font-medium text-foreground">
                        {company.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{company.ownerName}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {company.businessType}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {company.whatsapp}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(company.subscriptionValue)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusClass(company.subscriptionStatus)}
                    >
                      {company.subscriptionStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewAppointments?.(company.id)}
                      >
                        Agendamentos
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelected(company)}
                      >
                        Detalhes
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <Sheet
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-md">
          {selected ? (
            <>
              <SheetHeader className="border-b">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                    {selected.initials}
                  </span>
                  <div className="flex flex-col gap-1">
                    <SheetTitle>{selected.name}</SheetTitle>
                    <SheetDescription>{selected.businessType}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex flex-col gap-6 p-4">
                <section className="flex flex-col gap-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Responsável
                  </h3>
                  <InfoRow
                    icon={User}
                    label="Nome"
                    value={selected.ownerName}
                  />
                  <InfoRow icon={IdCard} label="CPF" value={selected.ownerCpf} />
                  <InfoRow
                    icon={Cake}
                    label="Data de nascimento"
                    value={selected.ownerBirthDate}
                  />
                  <InfoRow
                    icon={Phone}
                    label="WhatsApp"
                    value={selected.whatsapp}
                  />
                </section>

                <Separator />

                <section className="flex flex-col gap-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Negócio
                  </h3>
                  <InfoRow
                    icon={Building2}
                    label="Cliente"
                    value={selected.name}
                  />
                  <InfoRow
                    icon={Briefcase}
                    label="Tipo de negócio"
                    value={selected.businessType}
                  />
                  <div className="flex items-start gap-3">
                    <Package
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm text-muted-foreground">
                        Produtos oferecidos
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selected.products.map((product) => (
                          <Badge key={product} variant="secondary">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <Separator />

                <section className="flex flex-col gap-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Funcionamento
                  </h3>
                  <InfoRow
                    icon={CalendarDays}
                    label="Dias de funcionamento"
                    value={selected.operatingDays}
                  />
                  <InfoRow
                    icon={Clock}
                    label="Horário"
                    value={selected.operatingHours}
                  />
                </section>

                <Separator />

                <section className="flex flex-col gap-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Assinatura
                  </h3>
                  <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-4">
                    <CreditCard
                      className="size-5 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-foreground">
                        {formatCurrency(selected.subscriptionValue)}
                        <span className="text-sm font-normal text-muted-foreground">
                          {" "}
                          / mês
                        </span>
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Vencimento todo dia {selected.subscriptionDay}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`ml-auto ${statusClass(selected.subscriptionStatus)}`}
                    >
                      {selected.subscriptionStatus}
                    </Badge>
                  </div>
                </section>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon
        className="size-4 shrink-0 text-muted-foreground"
        aria-hidden={true}
      />
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="ml-auto text-sm font-medium text-foreground">
        {value}
      </span>
    </div>
  )
}