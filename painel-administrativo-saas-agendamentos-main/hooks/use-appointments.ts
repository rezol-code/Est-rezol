import { useState, useEffect } from 'react'
import type { Appointment, NewAppointment } from '@/lib/appointments'

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/appointments')
      if (!response.ok) throw new Error('Erro ao buscar agendamentos')
      const data = await response.json()
      setAppointments(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  const createAppointment = async (appointment: NewAppointment) => {
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment),
      })
      if (!response.ok) throw new Error('Erro ao criar agendamento')
      const newAppointment = await response.json()
      setAppointments(prev => [...prev, newAppointment])
      return newAppointment
    } catch (err) {
      throw err
    }
  }

  const updateAppointment = async (id: string, appointment: Partial<Appointment>) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment),
      })
      if (!response.ok) throw new Error('Erro ao atualizar agendamento')
      const updatedAppointment = await response.json()
      setAppointments(prev => prev.map(a => a.id === id ? updatedAppointment : a))
      return updatedAppointment
    } catch (err) {
      throw err
    }
  }

  const deleteAppointment = async (id: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Erro ao deletar agendamento')
      setAppointments(prev => prev.filter(a => a.id !== id))
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  }
}