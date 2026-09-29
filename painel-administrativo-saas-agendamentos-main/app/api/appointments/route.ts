import { NextRequest, NextResponse } from 'next/server'
import { readAppointmentsData, writeAppointmentsData } from '@/lib/data-storage'
import type { Appointment, NewAppointment } from '@/lib/appointments'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get('companyId')
    const clientId = searchParams.get('clientId')
    
    const appointments = await readAppointmentsData()
    
    if (companyId || clientId) {
      const filteredAppointments = appointments.filter(a => {
        if (companyId && a.companyId !== companyId) return false
        if (clientId && a.clientId !== clientId) return false
        return true
      })
      return NextResponse.json(filteredAppointments)
    }
    
    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar agendamentos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const appointments = await readAppointmentsData()
    
    const newAppointment: Appointment = {
      ...body,
      id: crypto.randomUUID(),
    }
    
    appointments.push(newAppointment)
    await writeAppointmentsData(appointments)
    
    return NextResponse.json(newAppointment, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar agendamento:', error)
    return NextResponse.json(
      { error: 'Erro ao criar agendamento' },
      { status: 500 }
    )
  }
}