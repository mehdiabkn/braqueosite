import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Braqueo.fr - Développement d\'applications & sites web',
  description: 'Nous développons vos applications mobiles et sites web sur mesure',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}