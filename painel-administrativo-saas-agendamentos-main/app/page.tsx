"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, CalendarClock, ArrowRight, Menu, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatDatePtBr } from "@/lib/date-utils"
import { TODAY } from "@/lib/appointments"
import { APP_CONFIG } from "@/lib/config"

export default function Page() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const quickActions = [
    {
      title: "Meus Clientes",
      description: "Gerenciar empresas que usam o sistema",
      icon: Building2,
      action: () => router.push("/dashboard?tab=companies"),
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Agendamentos",
      description: "Ver e gerenciar agenda de atendimentos",
      icon: CalendarClock,
      action: () => router.push("/dashboard?tab=appointments"),
      color: "bg-chart-2/10 text-chart-2",
    },
  ]

  const menuItems = [
    {
      title: "Meus Clientes",
      icon: Building2,
      action: () => {
        router.push("/dashboard?tab=companies")
        setMenuOpen(false)
      },
    },
    {
      title: "Agendamentos",
      icon: CalendarClock,
      action: () => {
        router.push("/dashboard?tab=appointments")
        setMenuOpen(false)
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header Minimalista */}
      <header className="border-b border-border/70 bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="size-5" />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                {APP_CONFIG.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {APP_CONFIG.description}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{APP_CONFIG.currentUser.name}</p>
              <p className="text-xs text-muted-foreground">{formatDatePtBr(TODAY)}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg bg-primary/10 text-primary hover:bg-primary/15"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </Button>
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
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.title}
                    variant="ghost"
                    className="w-full justify-start h-12 hover:bg-primary/10"
                    onClick={item.action}
                  >
                    <Icon className="size-5 mr-3" />
                    {item.title}
                    <ArrowRight className="ml-auto size-4" />
                  </Button>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content Simplificado */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Bem-vindo Simples */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Bem-vindo
          </h1>
          <p className="text-muted-foreground">
            Escolha uma opção para começar
          </p>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Card 
                key={action.title} 
                className="hover:shadow-lg transition-all cursor-pointer group border-2 border-transparent hover:border-primary/20"
                onClick={action.action}
              >
                <CardContent className="p-6 text-center">
                  <div className={`flex size-16 items-center justify-center rounded-2xl ${action.color} mb-4 mx-auto group-hover:scale-110 transition-transform group-hover:shadow-lg`}>
                    <Icon className="size-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {action.description}
                  </p>
                  <Button 
                    variant="default" 
                    size="lg" 
                    className="w-full group-hover:scale-105 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation()
                      action.action()
                    }}
                  >
                    <ArrowRight className="mr-2 size-5" />
                    Acessar
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Informações Básicas Simplificadas */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>{APP_CONFIG.description}</p>
            <p className="text-xs mt-1">Versão {APP_CONFIG.version}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
