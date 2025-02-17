// src/lib/api.ts
import type { User } from '../../types/user'

export interface AuthResponse {
  token: string;
  user: User;
}

const API_URL = 'http://localhost:5000/api'

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  
  if (!response.ok) {
    throw new Error('Login failed')
  }
  
  const data = await response.json()
  // Stocker les données
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))
  // Émettre l'événement
  window.dispatchEvent(new Event('auth-login'))
  return data
}

export const register = async (username: string, password: string, role: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, role }),
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.error || 'Registration failed')
  }

  const data = await response.json()
  // Stocker les données
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))
  // Émettre l'événement
  window.dispatchEvent(new Event('auth-login'))
  return data
}

export const logout = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.dispatchEvent(new Event('auth-logout'))
}

export const authFetch = async (url: string, options = {}): Promise<any> => {
  const token = localStorage.getItem('token')
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options as any).headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Request failed')
  }

  return response.json()
}