import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { CartProvider } from '../context/CartContext'
import { CheckoutProvider } from '../context/CheckoutContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Malerato Butchery - Premium Quality Meats',
  description: 'Fresh, high-quality meats delivered to your doorstep',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <CheckoutProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </CheckoutProvider>
        </CartProvider>
      </body>
    </html>
  )
}