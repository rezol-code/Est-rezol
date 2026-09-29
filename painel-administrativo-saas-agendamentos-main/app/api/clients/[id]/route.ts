import { NextRequest, NextResponse } from 'next/server'
import { readEndClientsData, writeEndClientsData } from '@/lib/data-storage'
import type { EndClient } from '@/lib/clients'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const endClients = await readEndClientsData()
    const endClient = endClients.find(c => c.id === params.id)
    
    if (!endClient) {
      return NextResponse.json(
        { error: 'Cliente final não encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(endClient)
  } catch (error) {
    console.error('Erro ao buscar cliente final:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar cliente final' },
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
    const endClients = await readEndClientsData()
    const index = endClients.findIndex(c => c.id === params.id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Cliente final não encontrado' },
        { status: 404 }
      )
    }
    
    const initials = body.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase() ?? '')
      .join('')
    
    endClients[index] = {
      ...endClients[index],
      ...body,
      id: params.id,
      initials,
    }
    
    await writeEndClientsData(endClients)
    
    return NextResponse.json(endClients[index])
  } catch (error) {
    console.error('Erro ao atualizar cliente final:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar cliente final' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const endClients = await readEndClientsData()
    const index = endClients.findIndex(c => c.id === params.id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Cliente final não encontrado' },
        { status: 404 }
      )
    }
    
    endClients.splice(index, 1)
    await writeEndClientsData(endClients)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar cliente final:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar cliente final' },
      { status: 500 }
    )
  }
}