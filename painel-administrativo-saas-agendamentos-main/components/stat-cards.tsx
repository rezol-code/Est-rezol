import { Building2, CalendarCheck, Users } from "lucide-react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { stats } from "@/lib/appointments"

const icons = {
  companies: Building2,
  clients: Users,
  today: CalendarCheck,
} as const

export function StatCards({ companiesCount }: { companiesCount: number }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = icons[stat.key]
        return (
          <Card key={stat.key}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl font-semibold tracking-tight">
                {stat.key === "companies" ? companiesCount : stat.value}
              </CardTitle>
              <div className="col-start-2 row-span-2 row-start-1 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <p className="text-xs text-muted-foreground">{stat.hint}</p>
            </CardHeader>
          </Card>
        )
      })}
    </section>
  )
}
