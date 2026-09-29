import { NextRequest, NextResponse } from 'next/server'
import { readEndClientsData, writeEndClientsData } from '@/lib/data-storage'
import type { EndClient, NewEndClient } from '@/lib/clients'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const saasClientId = searchParams.get('saasClientId')
    
    const endClients = await readEndClientsData()
    
    if (saasClientId) {
      const filteredEndClients = endClients.filter(c => c.saasClientId === saasClientId)
      return NextResponse.json(filteredEndClients)
    }
    
    return NextResponse.json(endClients)
  } catch (error) {
    console.error('Erro ao buscar clientes finais:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar clientes finais' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const endClients = await readEndClientsData()
    
    const initials = body.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase() ?? '')
      .join('')
    
    const newEndClient: EndClient = {
      ...body,
      id: crypto.randomUUID(),
      initials,
    }
    
    endClients.push(newEndClient)
    await writeEndClientsData(endClients)
    
    return NextResponse.json(newEndClient, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar cliente final:', error)
    return NextResponse.json(
      { error: 'Erro ao criar cliente final' },
      { status: 500 }
    )
  }
}