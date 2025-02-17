// src/app/components/Navigation.tsx
'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { logout } from '../../lib/api'
import type { User } from '../../../types/user'

export default function Navigation() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem('user')
      console.log("🔄 Mise à jour user depuis localStorage:", storedUser)
      setUser(storedUser ? JSON.parse(storedUser) : null)
    }

    updateUser()
    window.addEventListener('auth-login', updateUser)
    window.addEventListener('auth-logout', updateUser)
    window.addEventListener('storage', updateUser)

    return () => {
      window.removeEventListener('auth-login', updateUser)
      window.removeEventListener('auth-logout', updateUser)
      window.removeEventListener('storage', updateUser)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    router.push('/')
  }

  // Fonction qui retourne les liens de navigation selon le rôle
  const getNavigationLinks = () => {
    if (!user) return []

    if (user.role === 'SEEKER') {
      return [
        { href: '/search', text: 'Chercher un objet' },
        { href: '/messages', text: 'Mes conversations' }
      ]
    } else {
      return [
        { href: '/post-item', text: 'Publier un vol' },
        { href: '/messages', text: 'Mes conversations' },
        { href: '/my-items', text: 'Mes vols' },

      ]
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-black bg-opacity-40 backdrop-blur-md shadow-lg border-b border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo Braqueo */}
          <div className="flex items-center space-x-3">
            <Link href={user ? (user.role === 'SEEKER' ? '/search' : '/post-item') : '/'} 
                  className="text-white font-extrabold text-xl tracking-wide hover:text-blue-500 transition">
              <img src="/braqueo.png" alt="Braqueo Logo" className="w-10 h-10 object-contain" />
            </Link>
          </div>

          {/* Navigation Links */}
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              {getNavigationLinks().map((link, index) => (
                <NavItem key={index} href={link.href} text={link.text} />
              ))}
            </div>
          )}

          {/* Auth & Profile */}
          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Avatar avec le rôle */}
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-blue-800 text-white flex items-center justify-center rounded-full font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-300">
                    {user.role === 'SEEKER' ? 'Victime' : 'Voleur'}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  href="/signin"
                  className="text-gray-300 hover:text-white transition"
                >
                  Connexion
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavItem = ({ href, text }: { href: string; text: string }) => (
  <Link
    href={href}
    className="text-gray-300 hover:text-blue-500 transition text-sm font-medium"
  >
    {text}
  </Link>
)