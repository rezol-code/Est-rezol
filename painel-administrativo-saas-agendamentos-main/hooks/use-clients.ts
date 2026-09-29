import { useState, useEffect } from 'react'
import type { Client, NewClient } from '@/lib/clients'

export function useClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClients = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/clients')
      if (!response.ok) throw new Error('Erro ao buscar clientes')
      const data = await response.json()
      setClients(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  const createClient = async (client: NewClient) => {
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
      })
      if (!response.ok) throw new Error('Erro ao criar cliente')
      const newClient = await response.json()
      setClients(prev => [...prev, newClient])
      return newClient
    } catch (err) {
      throw err
    }
  }

  const updateClient = async (id: string, client: Partial<Client>) => {
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
      })
      if (!response.ok) throw new Error('Erro ao atualizar cliente')
      const updatedClient = await response.json()
      setClients(prev => prev.map(c => c.id === id ? updatedClient : c))
      return updatedClient
    } catch (err) {
      throw err
    }
  }

  const deleteClient = async (id: string) => {
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Erro ao deletar cliente')
      setClients(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return {
    clients,
    loading,
    error,
    refetch: fetchClients,
    createClient,
    updateClient,
    deleteClient,
  }
}