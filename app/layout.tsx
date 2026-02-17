import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Elektros kainų palyginimas Lietuvoje – pigiausi tiekėjai',
  description: 'Paprastas įrankis palyginti elektros tiekėjų kainas Lietuvoje. Spausk ir pereik į tiekėjo puslapį.',
  openGraph: {
    title: 'Elektros kainų palyginimas Lietuvoje – pigiausi tiekėjai',
    description: 'Paprastas įrankis palyginti elektros tiekėjų kainas Lietuvoje. Spausk ir pereik į tiekėjo puslapį.',
    locale: 'lt_LT',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1570EF',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="lt">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
