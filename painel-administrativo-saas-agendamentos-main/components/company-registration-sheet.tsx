"use client"

import type { FormEvent } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { formatDatePtBr } from "@/lib/date-utils"
import type { Company } from "@/lib/companies"

export type NewCompany = Omit<Company, "id" | "initials">

export function CompanyRegistrationSheet({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (company: NewCompany) => void
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const status =
      formData.get("subscriptionStatus") === "Pendente" ? "Pendente" : "Em dia"

    onSubmit({
      name: String(formData.get("name")).trim(),
      ownerName: String(formData.get("ownerName")).trim(),
      ownerCpf: String(formData.get("ownerCpf")).trim(),
      ownerBirthDate: formatDatePtBr(String(formData.get("ownerBirthDate"))),
      businessType: String(formData.get("businessType")).trim(),
      whatsapp: String(formData.get("whatsapp")).trim(),
      products: String(formData.get("products"))
        .split(",")
        .map((product) => product.trim())
        .filter(Boolean),
      operatingDays: String(formData.get("operatingDays")).trim(),
      operatingHours: `${formData.get("openingTime")} - ${formData.get("closingTime")}`,
      subscriptionDay: Number(formData.get("subscriptionDay")),
      subscriptionValue: Number(formData.get("subscriptionValue")),
      subscriptionStatus: status,
    })

    form.reset()
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Cadastrar empresa</SheetTitle>
          <SheetDescription>
            Os dados ficam disponíveis nesta sessão de demonstração.
          </SheetDescription>
        </SheetHeader>
        <form className="flex flex-col gap-5 px-4 pb-6" onSubmit={handleSubmit}>
          <section className="grid gap-3 sm:grid-cols-2">
            <h3 className="text-sm font-semibold sm:col-span-2">Empresa</h3>
            <Field label="Nome da empresa" name="name" required />
            <Field label="Tipo de negócio" name="businessType" required />
            <Field label="Serviços, separados por vírgula" name="products" required />
            <Field label="WhatsApp" name="whatsapp" type="tel" required />
            <Field label="Dias de funcionamento" name="operatingDays" required />
            <Field label="Abre às" name="openingTime" type="time" required />
            <Field label="Fecha às" name="closingTime" type="time" required />
          </section>

          <section className="grid gap-3 sm:grid-cols-2">
            <h3 className="text-sm font-semibold sm:col-span-2">Responsável</h3>
            <Field label="Nome completo" name="ownerName" required />
            <Field label="CPF" name="ownerCpf" required />
            <Field
              label="Data de nascimento"
              name="ownerBirthDate"
              type="date"
              required
            />
          </section>

          <section className="grid gap-3 sm:grid-cols-2">
            <h3 className="text-sm font-semibold sm:col-span-2">Assinatura</h3>
            <Field
              label="Vencimento (dia do mês)"
              name="subscriptionDay"
              type="number"
              min="1"
              max="31"
              required
            />
            <Field
              label="Mensalidade (R$)"
              name="subscriptionValue"
              type="number"
              min="0.01"
              step="0.01"
              required
            />
            <label className="flex flex-col gap-1 text-sm font-medium sm:col-span-2">
              Status da assinatura
              <select
                name="subscriptionStatus"
                defaultValue="Em dia"
                className="h-9 rounded-lg border border-input bg-background px-3 font-normal outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option>Em dia</option>
                <option>Pendente</option>
              </select>
            </label>
          </section>

          <Button type="submit">Salvar empresa</Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

function Field({
  label,
  name,
  type = "text",
  ...props
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  min?: string
  max?: string
  step?: string
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        className="h-9 min-w-0 rounded-lg border border-input bg-background px-3 font-normal outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        {...props}
      />
    </label>
  )
}