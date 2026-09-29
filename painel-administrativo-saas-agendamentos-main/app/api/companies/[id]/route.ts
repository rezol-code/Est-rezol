import { NextRequest, NextResponse } from 'next/server'
import { readSaaSClientsData, writeSaaSClientsData } from '@/lib/data-storage'
import type { SaaSClient } from '@/lib/companies'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const saasClients = await readSaaSClientsData()
    const saasClient = saasClients.find(c => c.id === params.id)
    
    if (!saasClient) {
      return NextResponse.json(
        { error: 'Cliente do SaaS não encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(saasClient)
  } catch (error) {
    console.error('Erro ao buscar cliente do SaaS:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar cliente do SaaS' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const saasClients = await readSaaSClientsData()
    const index = saasClients.findIndex(c => c.id === params.id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Cliente do SaaS não encontrado' },
        { status: 404 }
      )
    }
    
    const initials = body.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase() ?? '')
      .join('')
    
    saasClients[index] = {
      ...saasClients[index],
      ...body,
      id: params.id,
      initials,
    }
    
    await writeSaaSClientsData(saasClients)
    
    return NextResponse.json(saasClients[index])
  } catch (error) {
    console.error('Erro ao atualizar cliente do SaaS:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar cliente do SaaS' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const saasClients = await readSaaSClientsData()
    const index = saasClients.findIndex(c => c.id === params.id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Cliente do SaaS não encontrado' },
        { status: 404 }
      )
    }
    
    saasClients.splice(index, 1)
    await writeSaaSClientsData(saasClients)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar cliente do SaaS:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar cliente do SaaS' },
      { status: 500 }
    )
  }
}