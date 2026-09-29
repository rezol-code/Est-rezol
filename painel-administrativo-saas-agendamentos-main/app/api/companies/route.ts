import { NextRequest, NextResponse } from 'next/server'
import { readSaaSClientsData, writeSaaSClientsData } from '@/lib/data-storage'
import type { SaaSClient, NewSaaSClient } from '@/lib/companies'

export async function GET() {
  try {
    const saasClients = await readSaaSClientsData()
    return NextResponse.json(saasClients)
  } catch (error) {
    console.error('Erro ao buscar clientes do SaaS:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar clientes do SaaS' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const saasClients = await readSaaSClientsData()
    
    const initials = body.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase() ?? '')
      .join('')
    
    const newSaaSClient: SaaSClient = {
      ...body,
      id: crypto.randomUUID(),
      initials,
    }
    
    saasClients.push(newSaaSClient)
    await writeSaaSClientsData(saasClients)
    
    return NextResponse.json(newSaaSClient, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar cliente do SaaS:', error)
    return NextResponse.json(
      { error: 'Erro ao criar cliente do SaaS' },
      { status: 500 }
    )
  }
}