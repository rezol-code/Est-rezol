import { useState, useEffect } from 'react'
import type { SaaSClient, NewSaaSClient } from '@/lib/companies'

export function useCompanies() {
  const [companies, setCompanies] = useState<SaaSClient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCompanies = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/companies')
      if (!response.ok) throw new Error('Erro ao buscar clientes')
      const data = await response.json()
      setCompanies(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  const createCompany = async (company: NewSaaSClient) => {
    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(company),
      })
      if (!response.ok) throw new Error('Erro ao criar cliente')
      const newCompany = await response.json()
      setCompanies(prev => [newCompany, ...prev])
      return newCompany
    } catch (err) {
      throw err
    }
  }

  const updateCompany = async (id: string, company: Partial<SaaSClient>) => {
    try {
      const response = await fetch(`/api/companies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(company),
      })
      if (!response.ok) throw new Error('Erro ao atualizar cliente')
      const updatedCompany = await response.json()
      setCompanies(prev => prev.map(c => c.id === id ? updatedCompany : c))
      return updatedCompany
    } catch (err) {
      throw err
    }
  }

  const deleteCompany = async (id: string) => {
    try {
      const response = await fetch(`/api/companies/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Erro ao deletar cliente')
      setCompanies(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  return {
    companies,
    loading,
    error,
    refetch: fetchCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
  }
}