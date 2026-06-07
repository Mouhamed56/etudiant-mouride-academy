import type { Metadata } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ subsets:['latin'], variable:'--font-playfair', display:'swap' })
const poppins = Poppins({ subsets:['latin'], weight:['300','400','500','600','700'], variable:'--font-poppins', display:'swap' })

export const metadata: Metadata = {
  title: 'Étudiant Mouride Academy',
  description: 'Plateforme éducative dédiée à la pensée de Cheikh Ahmadou Bamba',
  icons: {
    icon: '/icon-512.png',
    apple: '/icon-512.png',
    shortcut: '/icon-512.png',
  },
  manifest: '/manifest.json',
  themeColor: '#0f3324',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mouride Academy',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}