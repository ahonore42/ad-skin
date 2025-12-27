import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ad Skin - Digital Consumerism',
  description: 'An artistic exploration of consumerism and digital identity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
