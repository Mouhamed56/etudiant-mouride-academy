import type { Metadata } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ subsets:['latin'], variable:'--font-playfair', display:'swap' })
const poppins = Poppins({ subsets:['latin'], weight:['300','400','500','600','700'], variable:'--font-poppins', display:'swap' })

export const metadata: Metadata = {
  title: 'Étudiant Mouride Academy',
  description: 'Plateforme éducative dédiée à la pensée de Cheikh Ahmadou Bamba',
  icons: {
    icon: '/images/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}