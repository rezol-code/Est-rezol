import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const SAAS_CLIENTS_FILE = path.join(DATA_DIR, 'saas-clients.json')
const END_CLIENTS_FILE = path.join(DATA_DIR, 'end-clients.json')
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json')

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

async function ensureFile(filePath: string, defaultData: any) {
  try {
    await fs.access(filePath)
  } catch {
    await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2))
  }
}

async function readFile<T>(filePath: string, defaultData: T): Promise<T> {
  try {
    await ensureDataDir()
    await ensureFile(filePath, defaultData)
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.error(`Erro ao ler arquivo ${filePath}:`, error)
    return defaultData
  }
}

async function writeFile<T>(filePath: string, data: T): Promise<void> {
  try {
    await ensureDataDir()
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error(`Erro ao escrever arquivo ${filePath}:`, error)
    throw error
  }
}

export async function readSaaSClientsData() {
  return readFile(SAAS_CLIENTS_FILE, [])
}

export async function writeSaaSClientsData(data: any[]) {
  return writeFile(SAAS_CLIENTS_FILE, data)
}

export async function readEndClientsData() {
  return readFile(END_CLIENTS_FILE, [])
}

export async function writeEndClientsData(data: any[]) {
  return writeFile(END_CLIENTS_FILE, data)
}

export async function readAppointmentsData() {
  return readFile(APPOINTMENTS_FILE, [])
}

export async function writeAppointmentsData(data: any[]) {
  return writeFile(APPOINTMENTS_FILE, data)
}