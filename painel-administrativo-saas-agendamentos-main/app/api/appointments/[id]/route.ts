import { NextRequest, NextResponse } from 'next/server'
import { readAppointmentsData, writeAppointmentsData } from '@/lib/data-storage'
import type { Appointment } from '@/lib/appointments'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointments = await readAppointmentsData()
    const appointment = appointments.find(a => a.id === params.id)
    
    if (!appointment) {
      return NextResponse.json(
        { error: 'Agendamento não encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(appointment)
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar agendamento' },
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
    const appointments = await readAppointmentsData()
    const index = appointments.findIndex(a => a.id === params.id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Agendamento não encontrado' },
        { status: 404 }
      )
    }
    
    appointments[index] = {
      ...appointments[index],
      ...body,
      id: params.id,
    }
    
    await writeAppointmentsData(appointments)
    
    return NextResponse.json(appointments[index])
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar agendamento' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointments = await readAppointmentsData()
    const index = appointments.findIndex(a => a.id === params.id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Agendamento não encontrado' },
        { status: 404 }
      )
    }
    
    appointments.splice(index, 1)
    await writeAppointmentsData(appointments)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar agendamento' },
      { status: 500 }
    )
  }
}