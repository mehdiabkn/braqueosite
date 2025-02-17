'use client'

import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import './globals.css'
import Navigation from '../components/Navigation'
import 'leaflet/dist/leaflet.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  
  useEffect(() => {
    if (pathname === '/') {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')

      if (user && token) {
        try {
          const userData = JSON.parse(user)
          if (userData.role === 'SEEKER') {
            router.replace('/search')
          } else if (userData.role === 'FINDER') {
            router.replace('/my-items')
          }
        } catch (error) {
          localStorage.removeItem('user')
          localStorage.removeItem('token')
        }
      }
    }
  }, [pathname, router])

  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 to-gray-700 text-white`}>
        <Navigation />
        <main className="pt-24">
          {children}
        </main>
      </body>
    </html>
  )
}