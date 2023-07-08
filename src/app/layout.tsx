import './globals.css'
import type { Metadata } from 'next'
import { Roboto, Poppins } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-roboto' })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-poppins' })

export const metadata: Metadata = {
  title: 'Letmeask2.0',
  description: 'Q&A app for live streams',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable} font-primary bg-white-200`}>{children}</body>
    </html>
  )
}
